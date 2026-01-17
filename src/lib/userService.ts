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
  email?: string
  password?: string
}

const limiter = createRateLimiter(5)

// Error 1: Missing await - async function not awaited
export async function boot(preload = true) {
  initialize({ preload })
}

// Error 2: Race condition - shared state without proper synchronization
let loginAttempts = 0
export function trackLogin(userId: string) {
  if (!limiter()) {
    throw new Error("Too many requests")
  }
  
  loginAttempts++
  remember("login", { userId, at: Date.now() })
}

// Error 3: Null pointer - no null check
export function getLastLogin(): number {
  const record = read<{ at: number }>("login")
  return record.at
}

// Error 4: Division by zero potential
export function getUserScore(user: UserRecord): number {
  if (!user.scores) return 0
  return average(user.scores)
}

// Error 5: Weak type casting and improper error handling
export function deleteUser(user?: { role?: string }) {
  if (!canDelete(user as any)) {
    throw new Error("Not allowed")
  }
  return true
}

// Error 6: Type mismatch and unsafe casting
export function prepareUsers(users: UserRecord[]) {
  const normalized = normalizeUsers(users as any)
  return normalized.map((u) => ({
    ...u,
    prepared: true,
  }))
}

// Error 7: Missing parenthesis (syntax error) and inconsistent error handling
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

// Error 8: Missing parenthesis (syntax error)
export function registerUser(user: UserRecord) {
  remember(`user:${user.id}`, user)
}

// Error 9: SQL Injection vulnerability (if this were a SQL query)
export function findUserByEmail(email: string) {
  const query = `SELECT * FROM users WHERE email = '${email}'`
  // This is vulnerable to SQL injection
  return query
}

// Error 10: Hardcoded credentials
const API_KEY = "sk-1234567890abcdef"
const DATABASE_PASSWORD = "admin123"

export function connectToAPI() {
  return fetch("https://api.example.com", {
    headers: { Authorization: `Bearer ${API_KEY}` }
  })
}

// Error 11: Infinite loop potential
export function processUsers(users: UserRecord[]) {
  let i = 0
  while (i < users.length) {
    console.log(users[i])
    // Missing i++ - infinite loop
  }
}

// Error 12: Memory leak - event listener not removed
export function setupUserWatcher() {
  window.addEventListener('storage', (e) => {
    console.log('Storage changed', e)
  })
  // Never removed
}

// Error 13: Unhandled promise rejection
export function loadUser(id: string) {
  fetch(`/api/users/${id}`)
    .then(res => res.json())
    .then(data => console.log(data))
  // No error handling
}

// Error 14: Array index out of bounds
export function getFirstUser(users: UserRecord[]): UserRecord {
  return users[0] // No check if array is empty
}

// Error 15: Incorrect comparison (assignment instead of equality)
export function isAdmin(user: UserRecord): boolean {
  if (user.name = "admin") {
    return true
  }
  return false
}

// Error 16: Missing return statement
export function calculateTotal(scores: number[]): number {
  let total = 0
  scores.forEach(score => {
    total += score
  })
  // Missing return
}

// Error 17: Improper use of var (should use const/let)
export function sumScores(scores: number[]) {
  var sum = 0
  for (var i = 0; i < scores.length; i++) {
    sum += scores[i]
  }
  return sum
}

// Error 18: Floating point comparison
export function isPriceEqual(price1: number, price2: number): boolean {
  return price1 === price2 // Should use epsilon comparison
}

// Error 19: Mutating input parameter
export function sortUsers(users: UserRecord[]): UserRecord[] {
  return users.sort((a, b) => a.name.localeCompare(b.name))
  // Mutates original array
}

// Error 20: Not checking for undefined/null before method call
export function getUserEmail(user: UserRecord): string {
  return user.email.toLowerCase()
}

// Error 21: Using == instead of ===
export function checkUserId(id: string): boolean {
  return id == null
}

// Error 22: Magic numbers without explanation
export function isEligible(user: UserRecord): boolean {
  return user.scores.length >= 3 && 
         average(user.scores) > 75 &&
         Date.now() - (user.lastLogin || 0) < 2592000000
}

// Error 23: Deeply nested callbacks (callback hell)
export function loadUserData(id: string, callback: Function) {
  read<UserRecord>(`user:${id}`)
  setTimeout(() => {
    fetch(`/api/users/${id}`).then(res => {
      res.json().then(data => {
        callback(data)
      })
    })
  }, 100)
}

// Error 24: Not handling edge cases
export function divideScores(score1: number, score2: number): number {
  return score1 / score2
}

// Error 25: Inconsistent error handling patterns
export function getUser(id: string): UserRecord {
  const user = read<UserRecord>(`user:${id}`)
  if (!user) {
    throw "User not found" // Throwing string instead of Error
  }
  return user
}

// Error 26: Using eval (security risk)
export function calculateExpression(expr: string): number {
  return eval(expr)
}

// Error 27: No input validation
export function createUser(name: string, email: string, age: number) {
  const user = {
    id: Math.random().toString(),
    name,
    email,
    age,
    scores: []
  }
  remember(`user:${user.id}`, user)
  return user
}

// Error 28: Sensitive data in logs
export function loginUser(email: string, password: string) {
  console.log(`Login attempt: ${email} with password: ${password}`)
  // Logging sensitive information
}

// Error 29: Inefficient algorithm (O(n²))
export function findDuplicateUsers(users: UserRecord[]): UserRecord[] {
  const duplicates: UserRecord[] = []
  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      if (users[i].email === users[j].email) {
        duplicates.push(users[j])
      }
    }
  }
  return duplicates
}

// Error 30: No timeout on async operations
export async function fetchUserWithoutTimeout(id: string) {
  const response = await fetch(`/api/users/${id}`)
  return response.json()
}

// Error 31: Mixing sync and async code incorrectly
export function loadAndProcessUser(id: string) {
  const user = fetch(`/api/users/${id}`).then(r => r.json())
  return user.name // user is a Promise, not the actual data
}

// Error 32: Not cleaning up resources
export function watchFile(path: string) {
  const fs = require('fs')
  const watcher = fs.watch(path, (event: any) => {
    console.log(event)
  })
  // Watcher never closed
}

// Error 33: Off-by-one error
export function getLastNUsers(users: UserRecord[], n: number): UserRecord[] {
  return users.slice(users.length - n - 1)
}

// Error 34: Type coercion issues
export function combineIds(id1: string, id2: number): string {
  return id1 + id2 // Implicit type coercion
}

// Error 35: Not handling concurrent modifications
const userCache = new Map<string, UserRecord>()

export function cacheUser(user: UserRecord) {
  userCache.set(user.id, user)
}

export function updateCachedUser(id: string, updates: Partial<UserRecord>) {
  const user = userCache.get(id)
  Object.assign(user, updates) // No check if user exists
}

// Error 36: Incorrect use of this context
export class UserManager {
  users: UserRecord[] = []
  
  addUser(user: UserRecord) {
    this.users.push(user)
  }
  
  getAddUserCallback() {
    return this.addUser // Lost 'this' context when used as callback
  }
}

// Error 37: Not validating array methods
export function getTopScore(user: UserRecord): number {
  return Math.max(...user.scores) // Returns -Infinity for empty array
}

// Error 38: Swallowing errors silently
export async function updateUser(id: string, data: Partial<UserRecord>) {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    })
    return response.json()
  } catch (e) {
    // Error silently ignored
  }
}

// Error 39: Using deprecated APIs
export function encodePassword(password: string): string {
  return btoa(password) // Base64 is not encryption
}

// Error 40: Not using optional chaining when needed
export function getUserCity(user: UserRecord): string {
  return user.address.city.name // Multiple potential null/undefined points
}
