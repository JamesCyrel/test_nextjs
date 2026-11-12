import { createClient } from '@/utils/supabase/server'
import { defineAbilityFor, AppUser, Role, AppAbility } from './ability'

export async function getCurrentAppUser(): Promise<AppUser | null> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  // In Supabase, role can come from user metadata or custom claims
  // Default to 'user' role
  const role: Role = (user.app_metadata?.role as Role) || (user.user_metadata?.role as Role) || 'user'

  return {
    id: user.id,
    email: user.email,
    role,
  }
}

export async function getServerAbility(): Promise<{ user: AppUser | null; ability: AppAbility }> {
  const user = await getCurrentAppUser()
  const ability = defineAbilityFor(user)
  return { user, ability }
}

