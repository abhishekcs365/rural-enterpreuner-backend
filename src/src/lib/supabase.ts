import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
  return !!(supabaseUrl && supabaseAnonKey)
}

// Database types
export interface UserProfile {
  id?: string
  user_id: string
  name: string
  age: string
  address: string
  district: string
  occupation: string
  business_type: string
  business_description: string
  monthly_income: string
  business_experience: string
  language: string
  created_at?: string
  updated_at?: string
}

// Database operations
export const db = {
  // Get user profile by user_id
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    if (error) {
      console.error('Error fetching profile:', error)
      return null
    }
    return data
  },

  // Create or update user profile
  async upsertUserProfile(profile: UserProfile): Promise<boolean> {
    const { error } = await supabase
      .from('user_profiles')
      .upsert({
        ...profile,
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'user_id'
      })
    
    if (error) {
      console.error('Error upserting profile:', error)
      return false
    }
    return true
  },

  // Save user language preference
  async saveLanguagePreference(userId: string, language: string): Promise<boolean> {
    const { error } = await supabase
      .from('user_profiles')
      .update({ language, updated_at: new Date().toISOString() })
      .eq('user_id', userId)
    
    if (error) {
      console.error('Error saving language:', error)
      return false
    }
    return true
  }
}
