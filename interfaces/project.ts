export interface CreateProject {
  title: string;
  description: string;
  status: boolean;
}

export interface Project {
  _id: string;
  title: string;
  description: string;
  course: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
}
