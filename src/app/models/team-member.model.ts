export interface TeamMember {
  id: number;
  name: string;
  profile_image: string;
  bio: string;
  social_media_links: { platform: string; url: string }[];
  role: string; // Added role property
}
