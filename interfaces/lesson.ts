export interface Lesson {
  _id: string;
  courseId: string;
  title: string;
  // description: string;
  createdAt: Date;
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

export interface LessonContent {
  _id: string;
  courseId: string;
  title: string;
  content: string;
  // description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonCard {
  _id: string;
  courseId: {
    _id: string;
    title: string;
  };
  title: string;
  // description: string;
  createdAt: Date;
  updatedAt: Date;
}
