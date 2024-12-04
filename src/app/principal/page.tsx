"use client";
import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";

interface lanchesTipoI {
  tipo: string;
  num: number;
}

interface geralDadosI {
  clientes: number;
  lanches: number;
  pedidos: number;
}

type DataRow = [string, number, string];

export default function Principal() {
  const [lanchesTipo, setLanchesTipo] = useState<lanchesTipoI[]>([]);
  const [dados, setDados] = useState<geralDadosI>({} as geralDadosI);

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/gerais`);
      const dados = await response.json();
      setDados(dados);
    }
    getDadosGerais();

    async function getDadosGrafico() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/dashboard/lanchesTipo`);
      const dados = await response.json();
      setLanchesTipo(dados);
    }
    getDadosGrafico();
  }, []);

  const data: (["Tipo", "NºLanches", { role: string }] | DataRow)[] = [
    ["Tipo", "NºLanches", { role: "style" }],
  ];

  const cores = [
    "blue",
    "orange",
    "red",
    "violet",
    "green",
    "cyan",
    "chocolate",
    "purple",
    "brown",
    "gold",
  ];

  lanchesTipo.forEach((lanche, index) => {
    data.push([lanche.tipo, lanche.num, cores[index % 10]]);
  });

  return (
    <div className="container mt-24 px-6">
      <h2 className="text-3xl mb-4 font-bold text-blue-700">Visão Geral do Sistema</h2>

      <div className="flex justify-between mx-auto mb-6">
        <div className="border-2 border-blue-500 rounded-lg p-6 w-1/3 mx-2">
          <span className="bg-blue-100 text-blue-800 text-xl font-bold mx-auto block px-4 py-5 rounded">
            {dados.clientes}
          </span>
          <p className="font-bold mt-2 text-center">Nº Clientes</p>
        </div>
        <div className="border-2 border-orange-500 rounded-lg p-6 w-1/3 mx-2">
          <span className="bg-orange-100 text-orange-800 text-xl font-bold mx-auto block px-4 py-5 rounded">
            {dados.lanches}
          </span>
          <p className="font-bold mt-2 text-center">Nº Lanches</p>
        </div>
        <div className="border-2 border-green-500 rounded-lg p-6 w-1/3 mx-2">
          <span className="bg-green-100 text-green-800 text-xl font-bold mx-auto block px-4 py-5 rounded">
            {dados.pedidos}
          </span>
          <p className="font-bold mt-2 text-center">Nº Pedidos</p>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-blue-700 mt-6 mb-4">Gráfico: Nº de Lanches por Tipo</h2>
      <Chart chartType="ColumnChart" width="95%" height="380px" data={data} />
    </div>
  );
}
