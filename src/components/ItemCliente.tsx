'use client'
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import Cookies from "js-cookie";
import { ClienteI } from "@/utils/types/clientes";

interface ListaClienteProps {
  cliente: ClienteI;
  clientes: ClienteI[];
  setClientes: Dispatch<SetStateAction<ClienteI[]>>;
}

function ItemCliente({ cliente, clientes, setClientes }: ListaClienteProps) {
  async function excluirCliente() {
    if (confirm(`Confirma a exclusão do cliente ${cliente.nome}?`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/clientes/${cliente.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token"),
          },
        }
      );

      if (response.status == 200) {
        const clientesAtualizados = clientes.filter(
          (c) => c.id !== cliente.id
        );
        setClientes(clientesAtualizados);
        alert("Cliente excluído com sucesso");
      } else {
        alert("Erro... Cliente não foi excluído");
      }
    }
  }

  return (
    <tr
      key={cliente.id}
      className="odd:bg-blue-50 even:bg-blue-100 border-b border-gray-300"
    >
      <td className="px-6 py-4 font-medium text-gray-900">
        {cliente.nome}
      </td>
      <td className="px-6 py-4 text-gray-700">
        {cliente.email}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-600 cursor-pointer hover:text-red-800 transition-all"
          title="Excluir"
          onClick={excluirCliente}
        />
      </td>
    </tr>
  );
}

export default ItemCliente;
