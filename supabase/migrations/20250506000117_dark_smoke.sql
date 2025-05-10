CREATE TABLE IF NOT EXISTS interviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  avatar_url text,
  company text NOT NULL,
  duration_minutes integer NOT NULL DEFAULT 10,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;

-- Create policy to allow reading interviews
CREATE POLICY "Allow reading interviews"
  ON interviews
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample interviews
INSERT INTO interviews (title, description, company, avatar_url, duration_minutes) VALUES
  ('Google Product Manager Interview', 'Practice your product management skills with Google-style interview questions', 'Google', 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg', 10),
  ('CRED Product Manager Interview', 'Experience CRED''s unique approach to product management interviews', 'CRED', 'https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg', 10),
  ('Groww Product Manager Interview', 'Learn how Groww evaluates product managers through their interview process', 'Groww', 'https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg', 10);