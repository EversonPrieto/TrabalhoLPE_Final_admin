'use client'
import { Dispatch, SetStateAction } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import { FaRegStar } from "react-icons/fa";
import Cookies from "js-cookie";
import { LancheI } from "@/utils/types/lanches";

interface listaLancheProps {
  lanche: LancheI;
  lanches: LancheI[];
  setLanches: Dispatch<SetStateAction<LancheI[]>>;
}

function ItemLanche({ lanche, lanches, setLanches }: listaLancheProps) {
  async function excluirLanche() {
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL_API}/lanches/${lanche.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: "Bearer " + Cookies.get("admin_logado_token"),
          },
        }
      );

      if (response.status == 200) {
        const lanches2 = lanches.filter((x) => x.id != lanche.id);
        setLanches(lanches2);
        alert("Lanche excluído com sucesso");
      } else {
        alert("Erro... Lanche não foi excluído");
      }
    }
  }

  async function alterarDestaque() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/lanches/destacar/${lanche.id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          Authorization: "Bearer " + Cookies.get("admin_logado_token"),
        },
      }
    );

    if (response.status == 200) {
      const lanches2 = lanches.map((x) => {
        if (x.id == lanche.id) {
          return { ...x, destaque: !x.destaque };
        }
        return x;
      });
      setLanches(lanches2);
    }
  }

  return (
    <tr
      key={lanche.id}
      className="odd:bg-blue-50 even:bg-blue-100 border-b border-gray-300"
    >
      <th scope="row" className="px-6 py-4 font-medium text-gray-900">
        <img
          src={lanche.imagem}
          alt="Capa do Lanche"
          className="rounded-md border border-gray-200 shadow-md"
          style={{ width: 200 }}
        />
      </th>
      <td
        className={`px-6 py-4 ${
          lanche.destaque ? "text-blue-700 font-bold" : ""
        }`}
      >
        {lanche.nome}
      </td>
      <td
        className={`px-6 py-4 ${
          lanche.destaque ? "text-orange-600 font-bold" : ""
        }`}
      >
        {lanche.tipo.nome}
      </td>
      <td
        className={`px-6 py-4 ${
          lanche.destaque ? "text-blue-700 font-bold" : ""
        }`}
      >
        {Number(lanche.preco).toLocaleString("pt-br", {
          minimumFractionDigits: 2,
        })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline
          className="text-3xl text-red-500 inline-block cursor-pointer hover:scale-110 transition-transform"
          title="Excluir"
          onClick={excluirLanche}
        />
        <FaRegStar
          className={`text-3xl cursor-pointer ${
            lanche.destaque ? "text-yellow-600" : "text-gray-500"
          } hover:text-yellow-500 transition-all`}
          title="Destacar"
          onClick={alterarDestaque}
        />
      </td>
    </tr>
  );
}

export default ItemLanche;
