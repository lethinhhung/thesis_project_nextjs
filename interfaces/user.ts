export interface User {
  _id: string;
  username: string;
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
  createdAt: Date;
  updatedAt: Date;
}
