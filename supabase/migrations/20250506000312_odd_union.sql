/*
  # Update interview policies

  1. Changes
    - Remove existing policies
    - Create new public read access policy

  2. Security
    - Enables public read access to interviews table
*/

DO $$ 
BEGIN
  -- Drop existing policies if they exist
  IF EXISTS (
    SELECT 1 
    FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'interviews' 
    AND policyname = 'Allow public reading interviews'
  ) THEN
    DROP POLICY "Allow public reading interviews" ON interviews;
  END IF;

  IF EXISTS (
    SELECT 1 
    FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'interviews' 
    AND policyname = 'Allow reading interviews'
  ) THEN
    DROP POLICY "Allow reading interviews" ON interviews;
  END IF;
END $$;

-- Create new public read policy
CREATE POLICY "Allow public reading interviews"
  ON interviews
  FOR SELECT
  TO public
  USING (true);