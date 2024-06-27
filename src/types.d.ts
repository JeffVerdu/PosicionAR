export interface Categoria {
  id: string;
  name: string;
  image: string;
}

export interface Articulo_Tipo {
  id: string;
  title: string;
  description: string;
  price: number | string;
  tlf: string;
  email: string;
  category: Category;
  details: string;
  poster: string;
  date: Date;
  images?: string[];
}

export interface Admin {
  id: string;
  username: string;
  password: string;
}

export interface Anunciante {
  id: string;
  name: string;
  email: string;
  tlf: string;
  anuncios: Articulo_Tipo[];
}
