import { supabase } from './supabase'

// Simple hash function for password (in production, use bcrypt on server)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hash = await crypto.subtle.digest('SHA-256', data)
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
}

export interface RegisterData {
  userId: string
  password: string
  name: string
  age: string
  address: string
  district: string
  occupation: string
  businessType: string
  businessDescription: string
  monthlyIncome: string
  businessExperience: string
  language: string
}

export interface LoginData {
  userId: string
  password: string
}

export interface ProfileData {
  name: string
  age: string
  address: string
  district: string
  occupation: string
  businessType: string
  businessDescription: string
  monthlyIncome: string
  businessExperience: string
}

export async function registerUser(data: RegisterData) {
  try {
    const passwordHash = await hashPassword(data.password)
    
    // Insert user auth
    const { data: authData, error: authError } = await supabase
      .from('user_auth')
      .insert({
        user_id: data.userId,
        password_hash: passwordHash,
      })
      .select()
      .single()

    if (authError) {
      if (authError.code === '23505') { // Duplicate key
        throw new Error('User ID already exists')
      }
      throw authError
    }

    // Insert user profile
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .insert({
        user_id: data.userId,
        name: data.name,
        age: data.age,
        address: data.address,
        district: data.district,
        occupation: data.occupation,
        business_type: data.businessType,
        business_description: data.businessDescription,
        monthly_income: data.monthlyIncome,
        business_experience: data.businessExperience,
        language: data.language,
      })
      .select()
      .single()

    if (profileError) throw profileError

    return { success: true, data: { auth: authData, profile: profileData } }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function loginUser(data: LoginData) {
  try {
    const passwordHash = await hashPassword(data.password)
    
    const { data: authData, error: authError } = await supabase
      .from('user_auth')
      .select('*')
      .eq('user_id', data.userId)
      .eq('password_hash', passwordHash)
      .single()

    if (authError || !authData) {
      throw new Error('Invalid user ID or password')
    }

    // Get profile data
    const { data: profileData, error: profileError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', data.userId)
      .single()

    if (profileError) throw profileError

    // Store session in localStorage
    localStorage.setItem('currentUser', data.userId)
    localStorage.setItem('userLanguage', profileData.language)

    return { success: true, data: { auth: authData, profile: profileData } }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function updateProfile(userId: string, profileData: ProfileData) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({
        name: profileData.name,
        age: profileData.age,
        address: profileData.address,
        district: profileData.district,
        occupation: profileData.occupation,
        business_type: profileData.businessType,
        business_description: profileData.businessDescription,
        monthly_income: profileData.monthlyIncome,
        business_experience: profileData.businessExperience,
        updated_at: new Date().toISOString(),
      })
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()

    if (error) throw error

    return { success: true, data }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export function getCurrentUser() {
  return localStorage.getItem('currentUser')
}

export function logoutUser() {
  localStorage.removeItem('currentUser')
  localStorage.removeItem('userLanguage')
  localStorage.removeItem('userData')
  localStorage.removeItem('profileData')
}
