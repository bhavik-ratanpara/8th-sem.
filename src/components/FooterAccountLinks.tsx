'use client'
import Link from 'next/link'
import { useUser } from '@/firebase'

export function FooterAccountLinks() {
  const { user } = useUser()

  if (user) {
    return (
      <ul className="space-y-3 text-sm">
        <li>
          <Link
            href="/history"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            My Recipes
          </Link>
        </li>
        <li>
          <Link
            href="/history?filter=favourite"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Favourites
          </Link>
        </li>
      </ul>
    )
  }

  return (
    <ul className="space-y-3 text-sm">
      <li>
        <Link
          href="/login"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          href="/signup"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          Sign Up
        </Link>
      </li>
    </ul>
  )
}
