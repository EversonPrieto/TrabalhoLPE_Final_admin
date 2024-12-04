'use client'
import { useEffect, useState } from "react"
import Link from 'next/link'

import ItemCliente from '@/components/ItemCliente'
import { ClienteI } from "@/utils/types/clientes"

function CadClientes() {
  const [clientes, setClientes] = useState<ClienteI[]>([])

  useEffect(() => {
    async function getClientes() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes`)
      const dados = await response.json()
      setClientes(dados)
    }
    getClientes()
  }, [])

  const listaClientes = clientes.map(cliente => (
    <ItemCliente key={cliente.id} cliente={cliente} clientes={clientes} setClientes={setClientes} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between mb-6'>
        <h1 className="text-3xl font-bold text-blue-700">
          Controle de Clientes
        </h1>
      </div>

      <div className="relative overflow-x-auto shadow-lg sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-white bg-gradient-to-r from-blue-500 to-orange-400">
            <tr>
              <th scope="col" className="px-6 py-3">Nome</th>
              <th scope="col" className="px-6 py-3">E-mail</th>
              <th scope="col" className="px-6 py-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaClientes}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CadClientes
