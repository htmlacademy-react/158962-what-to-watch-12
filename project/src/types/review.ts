export interface IUser {
  id: number;
  name: string;
}

export interface IReview {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: IUser;
}
