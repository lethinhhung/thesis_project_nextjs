export interface CreateTest {
  title: string;
  description: string;
  date: Date;
  score: number;
}

export interface Test {
  _id: string;
  title: string;
  description: string;
  date: Date;
  score: number;
  course: string;
  createdAt: Date;
  updatedAt: Date;
}
