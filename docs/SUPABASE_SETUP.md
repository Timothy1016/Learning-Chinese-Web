# Supabase setup for Lóng

1. Create a Supabase project in the Singapore region.
2. In **SQL Editor**, run `supabase/schema.sql` once.
3. In **Authentication → Providers**, enable Anonymous and Email. Enable Google after adding its OAuth credentials.
4. Add these redirect URLs in **Authentication → URL Configuration**:
   - `http://localhost:3000`
   - `https://learning-chinese-web-tnl5.vercel.app`
   - `https://long-chinese-world.timothynathaniellaur.chatgpt.site`
5. Copy the Project URL and publishable key to the variables shown in `.env.example`.
6. Add the same variables to Vercel and Sites, then redeploy.

The browser never receives a service-role key. Row Level Security restricts every snapshot to its owner.
