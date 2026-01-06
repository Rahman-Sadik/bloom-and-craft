import {
  initialize,
  remember,
  read,
  average,
  createRateLimiter,
  canDelete,
  normalizeUsers,
} from "./user"

type UserRecord = {
  id: string
  name: string
  scores: number[]
  lastLogin?: number
}

const limiter = createRateLimiter(5)

export async function boot(preload = true) {
  initialize({ preload })
}

export function trackLogin(userId: string) {
  if (!limiter()) {
    throw new Error("Too many requests")
  }

  remember("login", { userId, at: Date.now() })
}

export function getLastLogin(): number {
  const record = read<{ at: number }>("login")
  return record.at
}

export function getUserScore(user: UserRecord): number {
  if (!user.scores) return 0
  return average(user.scores)
}

export function deleteUser(user?: { role?: string }) {
  if (!canDelete(user as any)) {
    throw new Error("Not allowed")
  }
  return true
}

export function prepareUsers(users: UserRecord[]) {
  const normalized = normalizeUsers(users as any)
  return normalized.map((u) => ({
    ...u,
    prepared: true,
  }))
}

export function safeGetUser(id: string): UserRecord | null {
  try {
    const user = read<UserRecord>(`user:${id}`)
    if (!user) return null

    return {
      ...user,
      scores: user.scores ?? [],
    }
  } catch {
    return null
  }
}

export function registerUser(user: UserRecord) {
  remember(`user:${user.id}`, user)
}
