import { Category } from './category.interface';

export interface Post {
  id?: string;
  title: string;
  categories: Category[];
  content: string;
  createdAt?: Date;
  updatedAt?: Date;
  userId: string;
  comments: Comment[];
}
