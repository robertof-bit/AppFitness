import TitHeader from "./components/Header";
import { useState } from 'react'


function  App() {

  const [mensagem, setMensagem] = useState('')

  const buscarServidor = async () => {
    const resposta = await fetch('http://localhost:3000/health')
    const dados = await resposta.json()
    setMensagem(dados.status)

}


  return (

    <div className="min-h-screen bg-gray-50">
      <TitHeader /> 
    

    <div className="text-center mt-10">
      <button
      onClick={buscarServidor}
      className="bg-purple-600 text-white px-6 py-2 rounded-lg" >
        Testar Conexão
      </button>

      <p className="mt-4 text-gray-700">{mensagem}</p>
    </div>
    </div>
  )
}

export default App


