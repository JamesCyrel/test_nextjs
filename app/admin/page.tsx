import { redirect } from 'next/navigation'
import { connection } from 'next/server'
import Link from 'next/link'
import { getServerAbility } from '@/lib/casl/server'

export const instant = false

export default async function AdminPage() {
  await connection()
  const { user, ability } = await getServerAbility()

  // CASL Server-side check
  if (!user || ability.cannot('manage', 'AdminDashboard')) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-zinc-950 p-8 text-zinc-100">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between border-b border-zinc-800 pb-4">
          <div>
            <span className="rounded-md bg-purple-500/20 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-purple-300">
              Admin Only Route
            </span>
            <h1 className="mt-2 text-2xl font-bold text-white">System Administration</h1>
          </div>
          <Link
            href="/dashboard"
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs font-medium text-zinc-300 hover:bg-zinc-800"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-white">Admin Privileges Active</h2>
          <p className="mt-1 text-sm text-zinc-400">
            This route was protected on the server using <code className="text-purple-300">ability.cannot(&apos;manage&apos;, &apos;AdminDashboard&apos;)</code>.
            Standard users are automatically blocked and redirected to <code className="text-zinc-300">/dashboard</code>.
          </p>
        </div>
      </div>
    </div>
  )
}

