'use client'
import Cookies from "js-cookie";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiUsers } from "react-icons/fi";

export function Titulo() {
  const [adminNome, setAdminNome] = useState<string>("");

  useEffect(() => {
    if (Cookies.get("admin_logado_nome")) {
      setAdminNome(Cookies.get("admin_logado_nome") as string);
    }
  }, []);

  return (
    <nav className="bg-orange-600 fixed top-0 left-0 w-full z-50 shadow-md">
      <div className="flex justify-between items-center max-w-screen-3xl mx-auto p-6">
        <Link href="/principal" className="flex items-center space-x-6">
          <img
            src="/logo.png"
            className="h-12 rounded"
            alt="Logo Lanchonete"
          />
          <span className="text-white text-3xl font-bold">
            Lanchonete Senac: Admin
          </span>
        </Link>
        <div className="flex items-center text-white">
          <FiUsers className="mr-2 text-lg" />
          <span className="font-medium text-1xl">
            {adminNome || "Admin não logado"}
          </span>
        </div>
      </div>
    </nav>
  );
}


