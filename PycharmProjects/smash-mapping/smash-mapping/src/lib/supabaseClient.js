import {createClient} from '@supabase/supabase-js'

export const supabase = createClient('https://mifvquxknwmbszdrqwio.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1pZnZxdXhrbndtYnN6ZHJxd2lvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODcyMjMxNTQsImV4cCI6MjAwMjc5OTE1NH0.mukAyCyXroPUWSkPx8lAiLwDBHvtMBoW334LPwsbCsg')