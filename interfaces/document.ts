export interface Document {
  _id: string;
  userId: string;
  title: string;
  fileUrl: string;
  tags: [
    {
      _id: string;
      title: string;
    }
  ];
  createdAt: Date;
  updatedAt: Date;
}
