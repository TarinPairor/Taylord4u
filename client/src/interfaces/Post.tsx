export interface Post {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string; // Depending on your use case
  Email: string;
  Title: string;
  Body: string;
}
