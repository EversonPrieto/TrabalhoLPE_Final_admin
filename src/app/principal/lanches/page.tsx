'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'

import ItemLanche from '@/components/ItemLanche'
import { LancheI } from "@/utils/types/lanches"

function CadLanches() {
  const [lanches, setLanches] = useState<LancheI[]>([])

  useEffect(() => {
    async function getLanches() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/lanches`)
      const dados = await response.json()
      setLanches(dados)
    }
    getLanches()
  }, [])

  const listaLanches = lanches.map(lanche => (
    <ItemLanche key={lanche.id} lanche={lanche} lanches={lanches} setLanches={setLanches} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between mb-6'>
        <h1 className="text-3xl font-bold text-blue-700">
          Controle de Lanches
        </h1>
        <Link href="lanches/novo" 
          className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 mb-2">
          Novo Lanche
        </Link>
      </div>

      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-white bg-gradient-to-r from-blue-500 to-orange-400">
            <tr>
              <th scope="col" className="px-6 py-3">Imagem</th>
              <th scope="col" className="px-6 py-3">Nome do Lanche</th>
              <th scope="col" className="px-6 py-3">Tipo</th>
              <th scope="col" className="px-6 py-3">Preço R$</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaLanches}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadLanches
