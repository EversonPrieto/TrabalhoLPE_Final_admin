'use client'
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegEdit } from "react-icons/fa";
import Cookies from "js-cookie";
import { PedidoI } from "@/utils/types/pedidos";

interface listaPedidoProps {
  pedido: PedidoI;
  pedidos: PedidoI[];
  setPedidos: Dispatch<SetStateAction<PedidoI[]>>;
}

function ItemPedido({ pedido, pedidos, setPedidos }: listaPedidoProps) {
  async function excluirPedido() {
    if (confirm(`Confirma Exclusão do Pedido "${pedido.descricao}"?`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/pedidos/${pedido.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + (Cookies.get("admin_logado_token") as string),
          },
        }
      );

      if (response.status == 200) {
        const pedidos2 = pedidos.filter((x) => x.id != pedido.id);
        setPedidos(pedidos2);
        alert("Pedido excluído com sucesso");
      } else {
        alert("Erro... Pedido não foi excluído");
      }
    }
  }

  async function entregarPedido() {
    const entregaLanchonete = prompt(
      `Entrega da Lanchonete para "${pedido.descricao}"`
    );

    if (entregaLanchonete == null || entregaLanchonete.trim() == "") {
      return;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/pedidos/${pedido.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + (Cookies.get("admin_logado_token") as string),
        },
        body: JSON.stringify({ entrega: entregaLanchonete }),
      }
    );

    if (response.status == 200) {
      const pedidos2 = pedidos.map((x) => {
        if (x.id == pedido.id) {
          return { ...x, entrega: entregaLanchonete };
        }
        return x;
      });
      setPedidos(pedidos2);
    }
  }

  return (
    <tr className="odd:bg-blue-50 even:bg-blue-200 border-b border-blue-300">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900">
        <img
          src={pedido.lanche.imagem}
          alt="Imagem do Lanche"
          style={{ width: 200, borderRadius: "8px", border: "2px solid #FFA500" }}
        />
      </th>
      <td className="px-6 py-4 text-gray-700">{pedido.lanche.nome}</td>
      <td className="px-6 py-4 text-gray-700">
        {Number(pedido.lanche.preco).toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })}
      </td>
      <td className="px-6 py-4 text-gray-700">{pedido.cliente.nome}</td>
      <td className="px-6 py-4 text-gray-700">{pedido.descricao}</td>
      <td className="px-6 py-4 text-gray-700">
        {pedido.entrega || <span className="text-red-500">Pendente</span>}
      </td>
      <td className="px-6 py-4">
        {pedido.entrega ? (
          <img
            src="/ok.png"
            alt="Ok"
            style={{ width: 40, margin: "0 auto" }}
          />
        ) : (
          <>
            <TiDeleteOutline
              className="text-3xl text-red-500 inline-block cursor-pointer hover:scale-110 transition-transform"
              title="Excluir"
              onClick={excluirPedido}
            />
            &nbsp;
            <FaRegEdit
              className="text-3xl text-orange-500 inline-block cursor-pointer hover:scale-110 transition-transform"
              title="Destacar"
              onClick={entregarPedido}
            />
          </>
        )}
      </td>
    </tr>
  );
}

export default ItemPedido;
