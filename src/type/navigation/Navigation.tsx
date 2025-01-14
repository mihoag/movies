export interface NavigationDto {
  route: string;
  params: { movie_ids: string[] } | { genres_id: string[] } | { keyword: string } | null;
  is_success: boolean;
}
