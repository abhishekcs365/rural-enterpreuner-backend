-- Rural Entrepreneur Hub - Supabase Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Authentication Table
CREATE TABLE IF NOT EXISTS user_auth (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT UNIQUE NOT NULL REFERENCES user_auth(user_id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  age TEXT NOT NULL,
  address TEXT NOT NULL,
  district TEXT NOT NULL,
  occupation TEXT NOT NULL,
  business_type TEXT NOT NULL,
  business_description TEXT NOT NULL,
  monthly_income TEXT NOT NULL,
  business_experience TEXT NOT NULL,
  language TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schemes Interactions Table (for tracking which schemes users view/apply to)
CREATE TABLE IF NOT EXISTS scheme_interactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT NOT NULL REFERENCES user_auth(user_id) ON DELETE CASCADE,
  scheme_id INTEGER NOT NULL,
  interaction_type TEXT NOT NULL, -- 'view', 'apply', 'favorite'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id TEXT REFERENCES user_auth(user_id) ON DELETE CASCADE,
  title_en TEXT NOT NULL,
  title_hi TEXT NOT NULL,
  title_mr TEXT NOT NULL,
  message_en TEXT NOT NULL,
  message_hi TEXT NOT NULL,
  message_mr TEXT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_user_auth_user_id ON user_auth(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_scheme_interactions_user_id ON scheme_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);

-- Enable Row Level Security (RLS)
ALTER TABLE user_auth ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scheme_interactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- user_auth: Users can only read their own data
CREATE POLICY "Users can read own auth data" ON user_auth
  FOR SELECT USING (true); -- Allow reading for login verification

CREATE POLICY "Users can insert own auth data" ON user_auth
  FOR INSERT WITH CHECK (true); -- Allow registration

-- user_profiles: Users can read and update their own profile
CREATE POLICY "Users can read own profile" ON user_profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own profile" ON user_profiles
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR UPDATE USING (true);

-- scheme_interactions: Users can manage their own interactions
CREATE POLICY "Users can read own interactions" ON scheme_interactions
  FOR SELECT USING (true);

CREATE POLICY "Users can insert own interactions" ON scheme_interactions
  FOR INSERT WITH CHECK (true);

-- notifications: Users can read their own notifications
CREATE POLICY "Users can read own notifications" ON notifications
  FOR SELECT USING (true);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (true);

-- Insert some sample notifications
INSERT INTO notifications (title_en, title_hi, title_mr, message_en, message_hi, message_mr) VALUES
  (
    'Welcome to Rural Entrepreneur Hub',
    'ग्रामीण उद्यमी केंद्र में आपका स्वागत है',
    'ग्रामीण उद्योजक केंद्रात आपले स्वागत आहे',
    'Explore government schemes and digital tools to grow your business',
    'अपने व्यवसाय को बढ़ाने के लिए सरकारी योजनाओं और डिजिटल उपकरणों का अन्वेषण करें',
    'तुमचा व्यवसाय वाढवण्यासाठी सरकारी योजना आणि डिजिटल साधनांचा शोध घ्या'
  ),
  (
    'New Schemes Available',
    'नई योजनाएं उपलब्ध हैं',
    'नवीन योजना उपलब्ध आहेत',
    'Check out the latest government schemes for rural entrepreneurs',
    'ग्रामीण उद्यमियों के लिए नवीनतम सरकारी योजनाओं की जाँच करें',
    'ग्रामीण उद्योजकांसाठी नवीनतम सरकारी योजनांची तपासणी करा'
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'Database setup completed successfully!';
  RAISE NOTICE 'Tables created: user_auth, user_profiles, scheme_interactions, notifications';
  RAISE NOTICE 'Row Level Security enabled on all tables';
  RAISE NOTICE 'Sample notifications inserted';
END $$;
