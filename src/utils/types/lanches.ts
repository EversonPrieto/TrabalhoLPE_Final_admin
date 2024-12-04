import { TipoI } from "./tipos"

export interface LancheI {
  id: number
  nome: string;
  preco: number
  destaque: boolean
  imagem: string
  descricao: string
  createdAt: Date;
  updatedAt: Date;
  tipo: TipoI
  tipoId: number,
  adminId: number
}
