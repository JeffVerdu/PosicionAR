export interface Categoria {
  id: string;
  name: string;
  image: string;
}

export interface Articulo_Tipo {
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

export interface Anunciante {
  id: string;
  name: string;
  email: string;
  tlf: string;
  anuncios: Articulo_Tipo[];
}
