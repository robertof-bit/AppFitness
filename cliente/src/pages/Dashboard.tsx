
import { useState } from "react";


//MOLDE CARDS *

type CardProps = {
    titulo: string;
    valor: string;
    unidade?: string;
    cor: string;
    children?: React.ReactNode;
}

function Componente({ titulo, valor, unidade, cor, children }: CardProps) {
    return (
        <div className={`$ {cor} text-white rounded-3xl p-5 w-72 h-40 flex flex-col justify-between shadow-sm`}>

        <div>
        <p className="text.sm opacity-90">{titulo}</p>
        <div className="flex items-end gap-1 mt-3">
        <h2 className="text-5xl font-semibold leading-none">{valor}</h2>
        {unidade && <span className="text-lg opacity-90 mb-1">{unidade}</span>}
        </div>       
    </div>

        <div>{children}</div>
    </div>
    )
}



// PAGINA PRINCIPAL DASHBOARDS *

function Dashboard() {
    
    
            /* Página */ 

            return (
        
            <div className="flex min-h-screen bg-gray-100">

                {/* SideBar Esquerda */}

                <aside className="w-20 bg-white border-r flex-col items-center py-6">
                    <div className="mb-10">🏋️</div>
                    <div className="space-y-6 text-gray-500">
                    <div>🏠</div>
                    <div>📊</div>
                    <div>👤</div>
                    <div>⚙️</div>
                </div>
                </aside>

               {/*  Conteúdo Principal */}

               <main className="flex-1 p-6">

                <h1 className="text-3xl font-light mb-6">
                    Weight Loss Program
                </h1>

               {/*  Cards Dashboard */}


               <div className="flex gap-4 mb-8">
                    <Componente cor="bg-orange-500" titulo="Weight" valor="82kg" />
                    <Componente cor="bg-purple-600" titulo="Goal" valor="51kg" />
                    <Componente cor="bg-yellow-500" titulo="Daily Loss" valor="1.4kg" />
                    <Componente cor="bg-blue-500" titulo="Workout" valor="50min" />
               </div>


               {/* Grid Inferior */}

               <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl">Statistics</div>
                <div className="bg-white p-6 rounded-xl">Graphs</div>
                </div>

            </main>


            {/* Sidebar Direita */}

            <aside className="w-64 bg-white border-l p-6">
                <h3 className="font-semibold mb-4">Perfil</h3>
                <p>AR Shakir</p>

                <div className="mt-6">
                    <h4 className="font-semibold mb-2">Meta</h4>
                    <p>30lb</p>
                </div>
            </aside>


            </div>
      

      

    )
}

export default Dashboard 










