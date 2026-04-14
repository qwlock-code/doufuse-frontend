import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Pattern = {
  id: number
  wp_post_id: number | null
  user_id: number
  user_name: string | null
  name: string
  description: string | null
  grid_data: Record<string, string>
  thumbnail_base64: string | null
  grid_width: number
  grid_height: number
  color_palette: string
  status: 'pending' | 'approved' | 'rejected'
  likes_count: number
  comments_count: number
  tips_count: number
  tips_total_cents: number
  created_at: string
  updated_at: string
}

export type Comment = {
  id: number
  pattern_id: number
  user_id: number
  user_name: string | null
  user_avatar_url: string | null
  parent_id: number | null
  content: string
  created_at: string
}

export type Like = {
  id: number
  pattern_id: number
  user_id: number
  created_at: string
}

export type Tip = {
  id: number
  pattern_id: number | null
  recipient_id: number
  tipper_name: string | null
  tipper_email: string | null
  amount_cents: number
  currency: string
  status: 'pending' | 'completed' | 'refunded' | 'cancelled'
  created_at: string
}

export type LeaderboardEntry = {
  id: number
  period: 'daily' | 'weekly' | 'monthly' | 'alltime'
  user_id: number
  user_name: string | null
  user_avatar_url: string | null
  total_likes: number
  total_patterns: number
  total_tips_cents: number
  rank: number
}

export async function getPatterns(limit = 20, offset = 0) {
  const { data, error } = await supabase
    .from('patterns')
    .select('*')
    .eq('status', 'approved')
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (error) throw error
  return data as Pattern[]
}

export async function getPatternById(id: number) {
  const { data, error } = await supabase
    .from('patterns')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data as Pattern
}

export async function createPattern(pattern: Partial<Pattern>) {
  const { data, error } = await supabase
    .from('patterns')
    .insert(pattern)
    .select()
    .single()

  if (error) throw error
  return data as Pattern
}

export async function updatePattern(id: number, updates: Partial<Pattern>) {
  const { data, error } = await supabase
    .from('patterns')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data as Pattern
}

export async function deletePattern(id: number) {
  const { error } = await supabase
    .from('patterns')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export async function toggleLike(patternId: number, userId: number) {
  const { data: existing } = await supabase
    .from('likes')
    .select('id')
    .eq('pattern_id', patternId)
    .eq('user_id', userId)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('likes')
      .delete()
      .eq('id', existing.id)

    if (error) throw error
    return { liked: false }
  } else {
    const { error } = await supabase
      .from('likes')
      .insert({ pattern_id: patternId, user_id: userId })

    if (error) throw error
    return { liked: true }
  }
}

export async function getComments(patternId: number) {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('pattern_id', patternId)
    .is('parent_id', null)
    .order('created_at', { ascending: true })

  if (error) throw error
  return data as Comment[]
}

export async function createComment(comment: Partial<Comment>) {
  const { data, error } = await supabase
    .from('comments')
    .insert(comment)
    .select()
    .single()

  if (error) throw error
  return data as Comment
}

export async function getLeaderboard(period: 'daily' | 'weekly' | 'monthly' | 'alltime' = 'alltime', limit = 10) {
  const { data, error } = await supabase
    .from('leaderboard_cache')
    .select('*')
    .eq('period', period)
    .order('rank', { ascending: true })
    .limit(limit)

  if (error) throw error
  return data as LeaderboardEntry[]
}
