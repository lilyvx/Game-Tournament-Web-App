'use server'

import { createServerSideClient } from '@/lib/supabase-server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// LOGIN ACTION
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

// SIGNUP ACTION
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



//CREATE TOURNAMENT
export async function createTournament(formData: FormData): Promise<void> {
  const supabase = await createServerSideClient()

  const { data: { user }, error: authError } = await supabase.auth.getUser()
  if (authError || !user) {
    throw new Error('Unauthorized: You must be signed in to create an arena.')
  }

  const title = formData.get('title') as string
  const game = formData.get('game') as string
  const date = formData.get('date') as string
  const prizePoolInput = formData.get('prize_pool') as string
  const prize_pool = parseInt(prizePoolInput, 10) || 0

  const { error: insertError } = await supabase
    .from('tournaments')
    .insert([
      { title, game, date, prize_pool, status: 'active' }
    ])

  if (insertError) {
    // Instead of returning the error object, log it or throw it 
    // so the function type returns void
    console.error(`Failed to create tournament: ${insertError.message}`)
    return 
  }

  // Clear cache and refresh the current route view
  revalidatePath('/arena') 
  // Send the admin back to the dedicated display dashboard
  redirect('/arena')
  
  // Explicitly return nothing to satisfy Promise<void>
  return
}


//DELETE TOURNAMENT
export async function deleteTournament(formData: FormData): Promise<void> {
  const supabase = await createServerSideClient()

  
  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = user?.email === 'admin@example.com' 
  
  if (!user || !isAdmin) {
    throw new Error('Unauthorized: Only administrators can delete tournament arenas.')
  }

  const id = formData.get('id') as string

  const { error } = await supabase
    .from('tournament')
    .delete()
    .eq('id', id)

  if (error) {
    console.error(`Failed to delete tournament: ${error.message}`)
    return
  }

  revalidatePath('/')
  return
}