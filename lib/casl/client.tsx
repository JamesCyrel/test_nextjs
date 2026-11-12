'use client'

import { ReactNode } from 'react'
import {
  AbilityProvider as CASLAbilityProvider,
  Can as CASLCan,
  useAbility as useCASLAbility,
} from '@casl/react'
import { defineAbilityFor, AppUser, AppAbility } from './ability'

export function AbilityProvider({
  user,
  children,
}: {
  user: AppUser | null
  children: ReactNode
}) {
  const ability = defineAbilityFor(user)

  return (
    <CASLAbilityProvider value={ability}>
      {children}
    </CASLAbilityProvider>
  )
}

export const Can = CASLCan
export const useAbility = useCASLAbility<AppAbility>
