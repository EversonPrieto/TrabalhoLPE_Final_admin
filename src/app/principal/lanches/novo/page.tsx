// 'use client'
// import { useForm } from "react-hook-form"
// import Cookies from "js-cookie"
// import { toast } from "sonner"
// import { useState, useEffect } from "react"
// import { TipoI } from "@/utils/types/tipos"

// type Inputs = {
//   nome: string
//   tipoId: number
//   // ano: number
//   // km: number
//   preco: number
//   imagem: string
//   descricao: string
//   // combustivel: string
// }

// function NovoLanche() {
//   const [tipos, setTipos] = useState<TipoI[]>([])
//   const {
//     register,
//     handleSubmit,
//     reset,
//     setFocus
//   } = useForm<Inputs>()

//   useEffect(() => {
//     async function getTipos() {
//       const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tipos`)
//       const dados = await response.json()
//       setTipos(dados)
//     }
//     getTipos()
//     setFocus("nome")
//   }, [])

//   const optionsTipo = tipos.map(tipo => (
//     <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
//   ))

//   async function incluirLanche(data: Inputs) {

//     const novoLanche: Inputs = {
//       nome: data.nome,
//       tipoId: Number(data.tipoId),
//       // ano: Number(data.ano),
//       // km: Number(data.km),
//       descricao: data.descricao,
//       imagem: data.imagem,
//       preco: Number(data.preco)
//       // combustivel: data.combustivel
//     }

//     const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/lanches`,
//       {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//           Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
//         },
//         body: JSON.stringify(novoLanche)
//       },
//     )

//     if (response.status == 201) {
//       toast.success("Ok! Lanche cadastrado com sucesso")
//       reset()
//     } else {
//       toast.error("Erro no cadastro do Lanche...")
//     }
//   }

//   return (
//     <>
//       <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
//         Inclusão de Lanches
//       </h1>

//       <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirLanche)}>
//         <div className="mb-3">
//           <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//             Nome do Lanche</label>
//           <input type="text" id="nome"
//             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//             {...register("nome")}
//           />
//         </div>
//         <div className="grid gap-6 mb-3 md:grid-cols-2">
//           <div className="mb-3">
//             <label htmlFor="tipoId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Tipo</label>
//             <select id="tipoId"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("tipoId")}
//             >
//               {optionsTipo}
//             </select>
//           </div>
//           {/* <div className="mb-3">
//             <label htmlFor="ano" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Ano</label>
//             <input type="number" id="ano"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("ano")}
//             />
//           </div> */}
//         </div>
//         <div className="grid gap-6 mb-3 md:grid-cols-2">
//           <div className="mb-3">
//             <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Preço R$</label>
//             <input type="number" id="preco"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("preco")}
//             />
//           </div>
//           {/* <div className="mb-3">
//             <label htmlFor="km" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Km</label>
//             <input type="number" id="km"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("km")}
//             />
//           </div> */}
//         </div>
//         <div className="grid gap-6 mb-3 md:grid-cols-2">
//           <div className="mb-3">
//             <label htmlFor="imagem" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               URL da Foto</label>
//             <input type="text" id="imagem"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("imagem")}
//             />
//           </div>
//           {/* <div className="mb-3">
//             <label htmlFor="combustivel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//               Combustível</label>
//             <select id="combustivel"
//               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
//               {...register("combustivel")}
//             >
//               <option>FLEX</option>
//               <option>GASOLINA</option>
//               <option>ALCOOL</option>
//               <option>DIESEL</option>
//               <option>ELETRICIDADE</option>
//             </select>
//           </div> */}
//         </div>
//         <div className="mb-3">
//           <label htmlFor="sinopse" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
//             Descrição</label>
//           <textarea id="descricao" rows={4}
//             className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//             {...register("descricao")}></textarea>
//         </div>

//         <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//           Incluir</button>
//       </form>
//     </>
//   )
// }

// export default NovoLanche

'use client'
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import { TipoI } from "@/utils/types/tipos"

type Inputs = {
  nome: string
  tipoId: number
  preco: string | number;
  imagem: string
  descricao: string
}

function NovoLanche() {
  const [tipos, setTipos] = useState<TipoI[]>([])
  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getTipos() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/tipos`)
      const dados = await response.json()
      setTipos(dados)
    }
    getTipos()
    setFocus("nome")
  }, [])

  const optionsTipo = tipos.map(tipo => (
    <option key={tipo.id} value={tipo.id}>{tipo.nome}</option>
  ))

  async function incluirLanche(data: Inputs) {
    let precoFormatado: number;
  
    // Verifica se o preco é string ou número
    if (typeof data.preco === "string") {
      // Se for string, substitui a vírgula por ponto e converte para número
      precoFormatado = Number(data.preco.replace(',', '.'));
    } else if (typeof data.preco === "number") {
      // Se for número, usa diretamente
      precoFormatado = data.preco;
    } else {
      precoFormatado = 0; // Valor padrão se não for nem string nem número
    }
  
    const novoLanche: Inputs = {
      nome: data.nome,
      tipoId: Number(data.tipoId),
      descricao: data.descricao,
      imagem: data.imagem,
      preco: precoFormatado // Atribui o preço tratado
    };
  
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/lanches`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + Cookies.get("admin_logado_token") as string
      },
      body: JSON.stringify(novoLanche)
    });
  
    if (response.status === 201) {
      toast.success("Ok! Lanche cadastrado com sucesso");
      reset();
    } else {
      toast.error("Erro no cadastro do Lanche...");
    }
  }
  

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl">
        Inclusão de Lanches
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirLanche)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900">
            Nome do Lanche
          </label>
          <input type="text" id="nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            {...register("nome")}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="tipoId" className="block mb-2 text-sm font-medium text-gray-900">
              Tipo
            </label>
            <select id="tipoId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              {...register("tipoId")}
            >
              {optionsTipo}
            </select>
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900">
              Preço R$
            </label>
            <input type="number | string" id="preco"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              {...register("preco")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="imagem" className="block mb-2 text-sm font-medium text-gray-900">
              URL da Foto
            </label>
            <input type="text" id="imagem"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              {...register("imagem")}
            />
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="descricao" className="block mb-2 text-sm font-medium text-gray-900">
            Descrição
          </label>
          <textarea id="descricao" rows={4}
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            {...register("descricao")}
          ></textarea>
        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">
          Incluir
        </button>
      </form>
    </>
  )
}

export default NovoLanche
