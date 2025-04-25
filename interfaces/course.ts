export interface CreateCourse {
  title: string;
  description: string;
  aiGenerated?: boolean;
}

export interface Course {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  creator: string;
  aiGenerated?: boolean;
  lessons: string[];
  refDocuments: string[];
  createdAt: Date;
  updatedAt: Date;
}
