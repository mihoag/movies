export interface AuthorDetail {
  name: string;
  username: string;
  avatar_path: string;
  rating: number | null;
}

export interface Review {
  author: string;
  author_details: AuthorDetail;
  content: string;
  created_at: string;
  updated_at: string;
  url: string;
}
