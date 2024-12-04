"use client";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { IoExitOutline } from "react-icons/io5";
import { BiSolidDashboard } from "react-icons/bi";
import { FaCarSide, FaUsers } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import Link from "next/link";

export function MenuLateral() {
  const router = useRouter();

  function adminSair() {
    if (confirm("Confirma Saída?")) {
      Cookies.remove("admin_logado_id");
      Cookies.remove("admin_logado_nome");
      Cookies.remove("admin_logado_token");
      router.replace("/");
    }
  }

  return (
    <aside
      id="default-sidebar"
      className="fixed mt-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
      aria-label="Sidebar"
    >
      <div className="h-full px-4 py-6 overflow-y-auto bg-blue-50 shadow-lg border-r-2 border-blue-200">
        <ul className="space-y-4 font-medium">
          <li>
            <Link
              href="/principal"
              className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <BiSolidDashboard className="text-blue-500 text-2xl" />
              <span className="ml-3 text-blue-700">Visão Geral</span>
            </Link>
          </li>
          <li>
            <Link
              href="/principal/lanches"
              className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <FaCarSide className="text-blue-500 text-2xl" />
              <span className="ml-3 text-blue-700">Controle de Lanches</span>
            </Link>
          </li>
          <li>
            <Link
              href="/principal/clientes"
              className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <FaUsers className="text-blue-500 text-2xl" />
              <span className="ml-3 text-blue-700">Controle de Clientes</span>
            </Link>
          </li>
          <li>
            <Link
              href="/principal/pedidos"
              className="flex items-center p-3 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <BsCashCoin className="text-blue-500 text-2xl" />
              <span className="ml-3 text-blue-700">Controle de Pedidos</span>
            </Link>
          </li>
          <li>
            <span
              onClick={adminSair}
              className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-orange-100 transition-colors"
            >
              <IoExitOutline className="text-orange-500 text-2xl" />
              <span className="ml-3 text-orange-700">Sair do Sistema</span>
            </span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
