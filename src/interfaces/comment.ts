export interface Comment {
  id: number;
  body?: string;
  body_html: string;
  author: string;
  email: string;
  status: string;
  article_id: number;
  blog_id: number;
  created_at: string;
  updated_at: string;
  ip: string | null;
  user_agent: string | null;
  published_at: string | null;
};
