-- Create milk_requests table
CREATE TABLE IF NOT EXISTS public.milk_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    program_id INT REFERENCES public.programs(program_id) ON DELETE SET NULL,
    queue_position INT,
    estimated_wait_days INT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    infant_name TEXT,
    infant_age_months INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.milk_requests ENABLE ROW LEVEL SECURITY;

-- Create RLS Policies
CREATE POLICY "Users can view their own milk requests" 
ON public.milk_requests FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own milk requests" 
ON public.milk_requests FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own milk requests" 
ON public.milk_requests FOR UPDATE 
USING (auth.uid() = user_id);