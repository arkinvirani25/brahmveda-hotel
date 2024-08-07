export interface ILogin {
  email: string;
  password: string;
}

export interface ISignUp {
  email: string;
  password: string;
}
export interface HotelList {
  id: number;
  user_id: string;
  title: string;
  description: string;
  imageUrl?: string;
  created_at: string;
}

export interface IHotelMedia {
  hotel_id: string;
  link: string;
  name: string
}
