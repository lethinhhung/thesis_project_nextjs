export interface TagWithTotalCourse {
  _id: string;
  title: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  totalCourses: number;
}

export interface CreateTag {
  title: string;
}
