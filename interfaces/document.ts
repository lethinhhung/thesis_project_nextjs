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
  status: "processing" | "completed" | "failed";
  size: number;
  createdAt: Date;
  updatedAt: Date;
}
