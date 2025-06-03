import { Document } from "./document";

export interface Message {
  role: string;
  content: string;
  documents?: [Document];
}
