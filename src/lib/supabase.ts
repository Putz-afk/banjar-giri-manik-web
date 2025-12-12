import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase'; // Import the generated types

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Add <Database> here to inject the types
export const supabase = createClient<Database>(supabaseUrl, supabaseKey);