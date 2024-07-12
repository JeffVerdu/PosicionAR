import { Loading } from "./components/common/Loading";

export interface Categoria {
  id: string;
  key: string;
  name: string;
  image: string;
}

export interface Anuncio_Tipo {
  id: string;
  title: string;
  description: string;
  price: number | string;
  category: string;
  details: string;
  poster: string;
  date: Date;
  images?: string[];
  anunciante: {
    name: string;
    email: string;
    tlf: string;
  };
  destacado: boolean | string;
}

export interface Admin {
  username: string;
  password: string;
}

export interface SearchContextType {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}
