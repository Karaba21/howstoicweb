-- 1. Updates to users_profile
ALTER TABLE public.users_profile 
ADD COLUMN IF NOT EXISTS oro integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS equipped_frame text,
ADD COLUMN IF NOT EXISTS streak integer NOT NULL DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_active_date timestamp with time zone;

-- 2. Create User Inventory Table
CREATE TABLE IF NOT EXISTS public.user_inventory (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    item_id text NOT NULL,
    item_type text NOT NULL, -- 'frame', 'reward', 'powerup'
    acquired_at timestamp with time zone DEFAULT now(),
    PRIMARY KEY (id)
);

-- 3. Create Achievements Table (Definitions)
CREATE TABLE IF NOT EXISTS public.achievements (
    id text NOT NULL,
    title text NOT NULL,
    description text,
    icon text,
    target integer NOT NULL DEFAULT 1,
    reward_oro integer NOT NULL DEFAULT 0,
    reward_xp integer NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

-- 4. Create User Achievements Table (Progress)
CREATE TABLE IF NOT EXISTS public.user_achievements (
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    achievement_id text NOT NULL REFERENCES public.achievements(id) ON DELETE CASCADE,
    progress integer NOT NULL DEFAULT 0,
    completed boolean NOT NULL DEFAULT false,
    completed_at timestamp with time zone,
    updated_at timestamp with time zone DEFAULT now(),
    PRIMARY KEY (id),
    UNIQUE(user_id, achievement_id)
);

-- 5. Helper RPC for atomic XP increment (optional but recommended)
CREATE OR REPLACE FUNCTION increment_xp(x int, user_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  UPDATE public.users_profile
  SET xp = xp + x
  WHERE id = user_id;
END;
$$;

-- 6. Enable RLS (Row Level Security)
ALTER TABLE public.user_inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_achievements ENABLE ROW LEVEL SECURITY;

-- 7. Policies
-- User Inventory: Users can view and insert their own items
CREATE POLICY "Users can view own inventory" ON public.user_inventory FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own inventory" ON public.user_inventory FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own inventory" ON public.user_inventory FOR DELETE USING (auth.uid() = user_id);

-- Achievements: Everyone can read definitions
CREATE POLICY "Anyone can view achievements" ON public.achievements FOR SELECT USING (true);

-- User Achievements: Users can view/update their own progress
CREATE POLICY "Users can view own progress" ON public.user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON public.user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON public.user_achievements FOR UPDATE USING (auth.uid() = user_id);

-- 8. Seed Initial Achievements
INSERT INTO public.achievements (id, title, description, icon, target, reward_oro, reward_xp) VALUES
('a_novice', 'Stoic Novice', 'Complete your first daily challenge.', 'Star', 1, 50, 100),
('a_streak_3', 'Consistency is Key', 'Reach a 3-day streak.', 'Flame', 3, 100, 200),
('a_streak_7', 'Dedicated Disciple', 'Reach a 7-day streak.', 'Flame', 7, 250, 500),
('a_streak_10', 'Iron Will', 'Reach a 10-day streak.', 'Flame', 10, 500, 1000),
('a_challenges_10', 'Practice Makes Perfect', 'Complete 10 Daily Challenges total.', 'CheckCircle2', 10, 200, 400),
('a_challenges_50', 'Master of Discipline', 'Complete 50 Daily Challenges total.', 'Trophy', 50, 1000, 2000),
('a_oro_1000', 'Wealthy Philosopher', 'Hold 1,000 Oro at once.', 'Coins', 1000, 100, 500),
('a_collector_3', 'Collector', 'Own 3 distinct frames.', 'Images', 3, 300, 600)
ON CONFLICT (id) DO NOTHING;
