import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ozgvczufhxhctexfexpr.supabase.co';
const supabaseKey = 'sb_publishable_-_MQ2n4LyUr8-VCkzke1BQ_d0FAWrKE';

export const supabase = createClient(supabaseUrl, supabaseKey);