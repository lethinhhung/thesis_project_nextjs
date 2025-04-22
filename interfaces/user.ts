export interface User {
  username: string;
  password: string;
  email: string;
  role: string;
  profile?: {
    settings: {
      theme: string;
      language: string;
    };
    name: string;
    avatar: string;
    bio: string;
  };
}
