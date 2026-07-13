'use server'

import { createServerSideClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// 1. LOGIN ACTION
export async function login(formData: FormData) {
  const supabase = await createServerSideClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'Email and password are required.' }
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) {
    return { error: error.message }
  }

  return { success: true } // Return status instead of redirecting on server
}

// 2. SIGNUP ACTION
export async function signup(formData: FormData) {
  const supabase = await createServerSideClient()

  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!username || !email || !password) {
    return { error: 'All fields are required.' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { username: username },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true } 
}

export async function logout() {
    const supabase = await createServerSideClient();
    await supabase.auth.signOut();
    redirect('/auth/login');
}




export async function createTournament(formData: FormData) {
  const supabase = await createServerSideClient()

  // Strict server-side security double-check
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = user !== null && user?.app_metadata?.role === 'admin'

  if (!isAdmin) {
    throw new Error("Unauthorized. Only admin can perform this action.")
  }

  const title = formData.get('title') as string
  const game = formData.get('game') as string
  const dateInput = formData.get('date') as string // Gets "YYYY-MM-DD"
  const prize_pool = Number(formData.get('prize_pool'))

  // Convert empty strings or basic dates to a safe format for postgres
  const formattedDate = dateInput ? new Date(dateInput).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]

  const { error } = await supabase
    .from('tournament')
    .insert([
      { 
        title, 
        game, 
        date: formattedDate, 
        prize_pool, 
        status: 'active' 
      }
    ])

  if (error) {
    console.error("Database Insert Error:", error.message)
    return { error: error.message, success: false }
  }

  // Clear cache for home page and layout pathing
  revalidatePath('/')
  
  return { success: true }
}