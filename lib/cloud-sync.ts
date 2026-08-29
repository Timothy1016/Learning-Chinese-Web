import { createClient, type SupabaseClient, type User } from '@supabase/supabase-js';

export const CLOUD_SCHEMA_VERSION = 1;

export type CloudSnapshot<TProfile = unknown, TLearning = unknown, TVoice = unknown> = {
  schemaVersion: number;
  savedAt: string;
  profile: TProfile;
  learning: TLearning;
  voice: TVoice;
};

export type CloudAccount = {
  id: string;
  email: string | null;
  anonymous: boolean;
};

export type CloudSyncResult<T> = { account: CloudAccount; remote: T | null };
export type LeaderboardEntry = { display_name:string; xp:number; hsk:number; streak:number; updated_at:string };

let browserClient: SupabaseClient | null | undefined;
const configuredSupabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const configuredSupabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

export function cloudSyncConfigured(env?: Record<string, string | undefined>): boolean {
  return env
    ? Boolean(env.NEXT_PUBLIC_SUPABASE_URL && env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)
    : Boolean(configuredSupabaseUrl && configuredSupabaseKey);
}

export function getSupabaseBrowserClient(): SupabaseClient | null {
  if (browserClient !== undefined) return browserClient;
  const url = configuredSupabaseUrl;
  const key = configuredSupabaseKey;
  browserClient = url && key
    ? createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } })
    : null;
  return browserClient;
}

function accountFromUser(user: User): CloudAccount {
  return { id: user.id, email: user.email ?? null, anonymous: Boolean(user.is_anonymous) };
}

export async function initializeCloudSync<T>(): Promise<CloudSyncResult<T> | null> {
  const client = getSupabaseBrowserClient();
  if (!client) return null;
  const current = await client.auth.getSession();
  if (current.error) throw current.error;
  let session = current.data.session;
  if (!session) {
    const anonymous = await client.auth.signInAnonymously();
    if (anonymous.error) throw anonymous.error;
    session = anonymous.data.session;
  }
  if (!session?.user) throw new Error('Supabase did not return a user session.');
  const response = await client.from('learning_snapshots').select('payload').eq('user_id', session.user.id).maybeSingle();
  if (response.error) throw response.error;
  return { account: accountFromUser(session.user), remote: (response.data?.payload as T | undefined) ?? null };
}

export async function saveCloudSnapshot<T>(userId: string, payload: T): Promise<void> {
  const client = getSupabaseBrowserClient();
  if (!client) return;
  const response = await client.from('learning_snapshots').upsert({ user_id: userId, payload, updated_at: new Date().toISOString() }, { onConflict: 'user_id' });
  if (response.error) throw response.error;
}

export async function connectEmail(email: string): Promise<'verification' | 'magic-link'> {
  const client = getSupabaseBrowserClient();
  if (!client) throw new Error('Cloud sync is not configured yet.');
  const { data: { user } } = await client.auth.getUser();
  if (user?.is_anonymous) {
    const linked = await client.auth.updateUser({ email });
    if (!linked.error) return 'verification';
    if (!/already|registered|exists/i.test(linked.error.message)) throw linked.error;
    await client.auth.signOut();
  }
  const result = await client.auth.signInWithOtp({ email, options: { emailRedirectTo: window.location.origin, shouldCreateUser: false } });
  if (result.error) throw result.error;
  return 'magic-link';
}

export async function connectGoogle(): Promise<void> {
  const client = getSupabaseBrowserClient();
  if (!client) throw new Error('Cloud sync is not configured yet.');
  const { data: { user } } = await client.auth.getUser();
  const options = { redirectTo: window.location.origin };
  const result = user?.is_anonymous
    ? await client.auth.linkIdentity({ provider: 'google', options })
    : await client.auth.signInWithOAuth({ provider: 'google', options });
  if (result.error) throw result.error;
}

export async function publishLeaderboardProfile(displayName:string,xp:number,hsk:number,streak:number):Promise<void>{
  const client=getSupabaseBrowserClient();if(!client)throw new Error('Cloud sync is not configured yet.');
  const {data:{user},error}=await client.auth.getUser();if(error||!user)throw error??new Error('Sign in before joining the leaderboard.');
  const result=await client.from('learning_leaderboard').upsert({user_id:user.id,display_name:displayName.slice(0,32),xp,hsk,streak,updated_at:new Date().toISOString()},{onConflict:'user_id'});if(result.error)throw result.error;
}

export async function fetchLeaderboard():Promise<LeaderboardEntry[]>{
  const client=getSupabaseBrowserClient();if(!client)return[];const result=await client.from('learning_leaderboard').select('display_name,xp,hsk,streak,updated_at').order('xp',{ascending:false}).limit(20);if(result.error)throw result.error;return(result.data??[]) as LeaderboardEntry[];
}

export function validCloudSnapshot(value: unknown): value is CloudSnapshot {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const candidate = value as Partial<CloudSnapshot>;
  return candidate.schemaVersion === CLOUD_SCHEMA_VERSION && typeof candidate.savedAt === 'string' && 'profile' in candidate && 'learning' in candidate && 'voice' in candidate;
}

export function newestSnapshot<T extends CloudSnapshot>(local: T, remote: T | null): 'local' | 'remote' {
  if (!remote) return 'local';
  const localTime = Date.parse(local.savedAt);
  const remoteTime = Date.parse(remote.savedAt);
  if (!Number.isFinite(remoteTime)) return 'local';
  if (!Number.isFinite(localTime)) return 'remote';
  return remoteTime > localTime ? 'remote' : 'local';
}
