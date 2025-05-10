/*
  # Add more companies to interviews table

  1. Changes
    - Insert additional company interviews for:
      - Microsoft
      - Amazon
      - Flipkart
      - Swiggy
      - Ola
      - PhonePe
*/

INSERT INTO interviews (title, description, company, avatar_url, duration_minutes)
VALUES
  (
    'Microsoft PM Interview',
    'Practice product management interview questions specific to Microsoft''s focus on enterprise and cloud solutions.',
    'Microsoft',
    'https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg',
    30
  ),
  (
    'Amazon Leadership Interview',
    'Focus on Amazon''s leadership principles and customer obsession in product management.',
    'Amazon',
    'https://images.pexels.com/photos/2312369/pexels-photo-2312369.jpeg',
    45
  ),
  (
    'Flipkart Product Strategy',
    'Tackle e-commerce specific product challenges and growth strategies.',
    'Flipkart',
    'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg',
    25
  ),
  (
    'Swiggy Product Innovation',
    'Focus on food delivery marketplace dynamics and local commerce.',
    'Swiggy',
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
    20
  ),
  (
    'Ola Product Experience',
    'Explore mobility solutions and transportation network challenges.',
    'Ola',
    'https://images.pexels.com/photos/3136673/pexels-photo-3136673.jpeg',
    35
  ),
  (
    'PhonePe FinTech PM',
    'Deep dive into digital payments and financial technology product management.',
    'PhonePe',
    'https://images.pexels.com/photos/4386366/pexels-photo-4386366.jpeg',
    40
  );