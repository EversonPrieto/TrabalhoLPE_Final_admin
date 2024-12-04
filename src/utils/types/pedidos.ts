import { LancheI } from "./lanches"
import { ClienteI } from "./clientes"

export interface PedidoI {
  id: number
  clienteId: string
  cliente: ClienteI
  lancheId: number
  lanche: LancheI
  descricao: string
  entrega: string | null
  createdAt: string
  updatedAt: string | null
}