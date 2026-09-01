# Production integrations

The application is code-ready for Supabase account sync and Azure AI Speech. Secrets belong in the hosting provider, never in the repository.

## Supabase + Google

Required production variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

Supabase dashboard setup:

1. Run [`supabase/schema.sql`](../supabase/schema.sql) in the SQL editor.
2. Enable Anonymous Sign-Ins so progress can be saved before a user creates an account.
3. Enable the Google provider and add its Google OAuth client ID and secret.
4. Add the production site URL to the Supabase redirect allowlist.
5. In Google Cloud, add the Supabase callback URL shown by the Google provider page as an authorized redirect URI.

The browser receives only the Supabase publishable key. Row-level security limits each snapshot to its authenticated owner.

## Azure AI Speech

Required production variables:

- `AZURE_SPEECH_KEY` (secret, server only)
- `AZURE_SPEECH_REGION`
- `NEXT_PUBLIC_NEURAL_TTS_ENABLED=true`

The app sends text to its own `/api/tts` endpoint. The endpoint creates SSML server-side and requests MP3 audio from Azure; the Azure key is never shipped to the browser. If Azure is unavailable or not configured, playback falls back to the best matching voice installed on the device.

After changing production variables, publish a new deployment so the new environment revision is applied.
