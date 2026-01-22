-- Add Streak Support to Users Profile
ALTER TABLE public.users_profile 
ADD COLUMN IF NOT EXISTS streak integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_active_date timestamp with time zone;
