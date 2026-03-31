import React, { useState } from 'react';


function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');


const fazerLogin = async () => {
  const resposta = await fetch('http://localhost:3000/auth/Login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email, senha})
  })

  const dados = await resposta.json()
  
  if (dados.token) {
    localStorage.setItem('token', dados.token)
    alert('Login realizado com sucesso!')
  }
  else{
    alert(dados.mensagem)
  }
}

  return (

<div className="min-h-screen bg-amber-50 flex items-center justify-center">

  {/* CARD BRANCO - o quadrado central com sombra */}
  <div className="bg-white rounded-2xl shadow-lg w-full max-w-3xl flex">

    {/* COLUNA ESQUERDA - decorativa com fundo amarelo */}
    <div className="w-1/2 bg-amber-100 rounded-l-2xl flex items-center justify-center p-12">
      <p className="text-6xl">🌸</p>
    </div>

    {/* COLUNA DIREITA - formulário de login */}
    <div className="w-1/2 p-10">

      {/* TÍTULO */}
      <h1 className="text-2xl font-bold text-amber-800 mb-2">
        Bem-Vindo!
      </h1>

      {/* SUBTÍTULO */}
      <p className="text-gray-400 text-sm mb-8">
        Acesse sua conta
      </p>

      {/* CAMPO EMAIL - value liga ao estado, onChange atualiza o estado */}
      <input
        type="email"
        placeholder="Seu email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:border-amber-400"
      />

      {/* CAMPO SENHA - type="password" esconde os caracteres */}
      <input
        type="password"
        placeholder="Sua senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full border border-gray-200 rounded-lg px-4 py-3 mb-6 focus:outline-none focus:border-amber-400"
      />

      {/* BOTÃO */}

      <button
        
        type="button"
        onClick={fazerLogin}
        className="bg-amber-500 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out">Entrar
      
      </button>


    </div>

  </div>

</div>


  );
}

export default Login;
