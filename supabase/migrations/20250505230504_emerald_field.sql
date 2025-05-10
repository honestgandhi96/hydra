/*
  # Update interviews table access policy
  
  1. Changes
    - Allow public access to interviews table for SELECT operations
    - Remove authentication requirement for reading interviews
  
  2. Security
    - Interviews data is public information, safe to expose
    - Maintains RLS but allows anonymous access
*/

DROP POLICY IF EXISTS "Allow reading interviews" ON interviews;

CREATE POLICY "Allow public reading interviews"
  ON interviews
  FOR SELECT
  TO public
  USING (true);