export interface IRespostaApi {
  products: IProduto[];
  total: number;
  skip: number;
  limit: number;
}

export interface IProduto {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ICategoria {
  slug: string;
  name: string;
}

export interface ICep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  erro?: boolean; 
}
