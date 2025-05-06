export interface CreateCourse {
  title: string;
  description: string;
  aiGenerated?: boolean;
  emoji: string;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  customization: {
    emoji: string;
    color: string;
    cover: string;
  };
  tags: [
    {
      _id: string;
      title: string;
    }
  ];
  creator: string;
  aiGenerated?: boolean;
  lessons: string[];
  refDocuments: string[];
  createdAt: Date;
  updatedAt: Date;
  status: boolean;
}

export interface SearchParams {
  query?: string;
  tags?: string[];
  status?: boolean;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}
