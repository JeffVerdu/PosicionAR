export interface Category {
  id: string;
  name: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  price: number;
  tlf: string;
  email: string;
  category: Category;
  details: string;
  image: string;
  date: Date;
}

export interface Admin {
  id: string;
  username: string;
  password: string;
}
