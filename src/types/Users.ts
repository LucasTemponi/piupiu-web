export type User = {
  handle: string;
  name: string;
  image_url: string;
  verified?: boolean;
  description?: string;
  posts?: number;
  followed?: boolean;
};
