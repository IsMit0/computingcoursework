import { createBrowserClient } from '@supabase/ssr'
import { useSession } from '@clerk/nextjs'

export function createClient() {
  const { session } = useSession()
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      // Session accessed from Clerk SDK, either as Clerk.session (vanilla
      // JavaScript) or useSession (React)
      accessToken: async () => session?.getToken() ?? null,
    }
  )
}