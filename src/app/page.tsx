"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Cookies from "js-cookie";

type Inputs = {
  email: string;
  senha: string;
};

export default function Home() {
  const { register, handleSubmit, setFocus } = useForm<Inputs>();
  const router = useRouter();

  useEffect(() => {
    setFocus("email");
  }, []);

  async function verificaLogin(data: Inputs) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/admins/login`,
      {
        method: "POST",
        headers: { "Content-type": "Application/json" },
        body: JSON.stringify({ email: data.email, senha: data.senha }),
      }
    );

    if (response.status == 200) {
      const admin = await response.json();

      Cookies.set("admin_logado_id", admin.id);
      Cookies.set("admin_logado_nome", admin.nome);
      Cookies.set("admin_logado_token", admin.token);

      router.push("/principal");
    } else if (response.status == 400) {
      toast.error("Erro... Login ou senha incorretos");
    }
  }

  return (
    <main className="max-w-screen-xl flex flex-col items-center mx-auto p-6">
      <img
        src="./logo.png"
        alt="Revenda"
        style={{ width: 240 }}
        className="mb-6"
      />
      <div className="max-w-sm">
        <h1 className="text-3xl font-bold text-blue-700 mb-8 text-center">
          Admin: Lanchonete Senac
        </h1>
        <form
          className="bg-white border border-gray-300 rounded-lg shadow-md p-6"
          onSubmit={handleSubmit(verificaLogin)}
        >
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-blue-700"
            >
              E-mail:
            </label>
            <input
              type="email"
              id="email"
              className="bg-orange-50 border border-orange-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("email")}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-blue-700"
            >
              Senha:
            </label>
            <input
              type="password"
              id="password"
              className="bg-orange-50 border border-orange-300 text-blue-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              {...register("senha")}
              required
            />
          </div>
          <button
            type="submit"
            className="text-white bg-orange-700 hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 transition-all"
          >
            Entrar
          </button>
        </form>
      </div>
    </main>
  );
}
