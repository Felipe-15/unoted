export interface ITask {
  id: string;
  creator_id: string;
  category_id: string;
  checked: boolean;
  text: string;
  expires_at: any;
}
