export type BeadColor = {
  name: string
  hex: string
  rgb: [number, number, number]
  category: 'fuse' | 'spark' | 'dream' | 'base'
}

export type GridData = Record<string, string>

export type Pattern = {
  id: number
  wp_post_id: number | null
  user_id: number
  user_name: string | null
  user_email: string | null
  name: string
  description: string | null
  grid_data: GridData
  thumbnail_base64: string | null
  grid_width: number
  grid_height: number
  color_palette: string
  status: 'pending' | 'approved' | 'rejected'
  likes_count: number
  comments_count: number
  tips_count: number
  tips_total_cents: number
  view_count: number
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
  paypal_order_id: string | null
  paypal_capture_id: string | null
  amount_cents: number
  currency: string
  status: 'pending' | 'completed' | 'refunded' | 'cancelled'
  created_at: string
  updated_at: string
}

export type LeaderboardEntry = {
  id: number
  period: 'daily' | 'weekly' | 'monthly' | 'alltime'
  user_id: number
  user_name: string | null
  user_email: string | null
  user_avatar_url: string | null
  total_likes: number
  total_patterns: number
  total_tips_cents: number
  rank: number
}

export type User = {
  id: number
  username: string
  email: string
  display_name: string
  avatar_url: string | null
}

export type EditorTool = 'brush' | 'fill' | 'eraser' | 'select'

export type EditorState = {
  tool: EditorTool
  selectedColor: string
  gridWidth: number
  gridHeight: number
  gridData: GridData
  zoom: number
  showGrid: boolean
  history: GridData[]
  historyIndex: number
  historyLength: number
}
