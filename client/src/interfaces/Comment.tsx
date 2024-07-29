export interface Comment {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string; // Depending on your use case
  Email: string;
  Body: string;
  PostID: number;
}
