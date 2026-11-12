import { AbilityBuilder, createMongoAbility, MongoAbility } from '@casl/ability'

export type Role = 'admin' | 'user'

export type AppUser = {
  id: string
  email?: string
  role: Role
}

// Define the actions and subjects for your app permissions
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'
export type Subjects = 'all' | 'User' | 'AdminDashboard' | 'Settings' | 'Product' | 'Order'

export type AppAbility = MongoAbility<[Actions, Subjects]>

export function defineAbilityFor(user?: AppUser | null): AppAbility {
  const { can, cannot, build } = new AbilityBuilder<AppAbility>(createMongoAbility)

  if (user?.role === 'admin') {
    // Admins can do anything
    can('manage', 'all')
  } else if (user?.role === 'user') {
    // Regular authenticated users
    can('read', 'Product')
    can('read', 'Order')
    can('create', 'Order')
    cannot('manage', 'AdminDashboard')
    cannot('manage', 'User')
  } else {
    // Unauthenticated visitors
    can('read', 'Product')
    cannot('manage', 'all')
  }

  return build()
}

