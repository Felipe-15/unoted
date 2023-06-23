export interface ICategory {
  id: string;
  name: string;
  color: string;
  creator_id: string;
  type: "note" | "task";
}
