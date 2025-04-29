export interface Lesson {
  _id: string;
  courseId: string;
  title: string;
  // description: string;
  updatedAt: Date;
}

export interface CreateLesson {
  courseId: string;
  title: string;
  aiGenerated?: boolean;
}

export interface LessonName {
  courseId: string;
  _id: string;
  title: string;
}
