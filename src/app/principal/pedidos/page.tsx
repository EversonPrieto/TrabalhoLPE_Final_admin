'use client'
import { useEffect, useState } from "react";
import Link from 'next/link';

import { PedidoI } from "@/utils/types/pedidos";
import ItemPedido from "@/components/ItemPedido";

function ControlePedidos() {
  const [pedidos, setPedidos] = useState<PedidoI[]>([]);

  useEffect(() => {
    async function getPedidos() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/pedidos`);
      const dados = await response.json();
      setPedidos(dados);
    }
    getPedidos();
  }, []);

  const listaPedidos = pedidos.map(pedido => (
    <ItemPedido key={pedido.id} pedido={pedido} pedidos={pedidos} setPedidos={setPedidos} />
  ));

  return (
    <div className="m-4 mt-24">
      <h1 className="mb-4 text-3xl font-bold text-blue-700">
        Controle de Pedidos
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-700">
          <thead className="text-xs text-white bg-gradient-to-r from-blue-500 to-orange-400">
            <tr>
              <th scope="col" className="px-6 py-3">Imagem do Lanche</th>
              <th scope="col" className="px-6 py-3">Nome</th>
              <th scope="col" className="px-6 py-3">Preço R$</th>
              <th scope="col" className="px-6 py-3">Cliente</th>
              <th scope="col" className="px-6 py-3">Pedido do Cliente</th>
              <th scope="col" className="px-6 py-3">Entrega da Lanchonete</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody className="text-gray-600">
            {listaPedidos}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ControlePedidos;
