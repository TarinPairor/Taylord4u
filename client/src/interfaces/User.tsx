export interface User {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: null | string; // Depending on your use case
  Email: string;
  Password: string;
}
