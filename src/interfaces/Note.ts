export interface INote {
  id: string;
  creator_id: string;
  title: string;
  content: string;
  category_id: string;
  created_at: number | string;
}
