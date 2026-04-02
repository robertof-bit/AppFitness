
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

/* GRAFICOS RECHARTS */

const mockRegistroDiario = {
    data: '2026-04-01',
    calorias_consumidas: 1800,
    agua_ml: 700,
    agua_meta_ml: 2000,
    peso_do_dia: 82
}

const mockAlimentacao = {
    macrosMeta: { pro: 82 * 2, car: 200, gor: 60 },
    macrosConsumo: { pro: 95, car: 150, gor: 45 }
}


const mockRegistrosAgua = [
    { id: 1, quantidade_ml: 300 },
    { id: 2, quantidade_ml: 200 },
    { id: 3, quantidade_ml: 400 },
]

const mockGraficoCalorias = [
    { data: '26/03', calorias_consumidas: 1750 },
    { data: '27/03', calorias_consumidas: 2100 },
    { data: '28/03', calorias_consumidas: 1650 },
    { data: '29/03', calorias_consumidas: 2300 },
    { data: '30/03', calorias_consumidas: 1900 },
    { data: '31/03', calorias_consumidas: 2050 },
    { data: '01/04', calorias_consumidas: 1800 },
]

const mockAtividades = [
    { id: 1, tipo: 'Caminhada', duracao_minutos: 30, calorias_gastas: 150, data: '01/04' },
    { id: 2, tipo: 'Academia', duracao_minutos: 60, calorias_gastas: 400, data: '31/03' },
]




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
        <div className={`relative rounded-[24px] w-full h-28 overflow-hidden shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 group ${cor}`}>
            
            {/* Camada do Fundo (Gradiente translúcido Glassmorphism) */}
            <div className={`absolute inset-0 bg-white/20 dark:bg-black/20 backdrop-blur-md`}></div>

            {/* Borda Iluminada */}
            <div className="absolute inset-0 border border-white/40 rounded-[24px] pointer-events-none z-20"></div>

            {/* Watermark abstrata decorativa */}
            <div className="absolute right-[-10%] bottom-[-20%] w-24 h-24 bg-white opacity-20 rounded-full blur-xl group-hover:scale-110 transition-transform duration-500 z-0"></div>

            <div className="relative z-10 flex flex-col justify-between h-full p-5 text-white">
                <div className="flex justify-between items-start">
                    <p className="text-[13px] font-semibold tracking-wide opacity-90 uppercase drop-shadow-md">{titulo}</p>
                </div>
                
                <div className="flex flex-col justify-end h-full">
                    <div className="flex items-end gap-1">
                        <h2 className="text-3xl font-extrabold leading-none tracking-tight drop-shadow-md">{valor}</h2>
                        {unidade && <span className="text-sm font-bold opacity-90 mb-1 drop-shadow-md">{unidade}</span>}
                    </div>
                </div>
                <div className="absolute z-10 bottom-0 left-0 w-full">{children}</div>
            </div>
        </div>
    )
}

interface Usuario {
    id: number
    nome: string
    email: string
    peso: number
    altura: number
    idade: number
    meta: number
    atividade: string
}


// PAGINA PRINCIPAL DASHBOARDS *

function Dashboard() {

    const [usuario, setUsuario] = useState<Usuario | null>(null)
    const [carregando, setCarregando] = useState(true)
    const [aguaAtual, setAguaAtual] = useState(mockRegistroDiario.agua_ml)
    const [treinoHoje, setTreinoHoje] = useState<'treino_cardio' | 'cardio' | 'nada' | null>(null)
    const [temaEscuro, setTemaEscuro] = useState(false)

    // Lógica do Treinador IA
    const gerarDicaIA = () => {
        if (aguaAtual < mockRegistroDiario.agua_meta_ml / 2) return "💡 Dica: Sua hidratação está super baixa. Beba água antes da fadiga!";
        if (treinoHoje === 'cardio') return "🏃 Bela corrida! Esse cardio queima calorias. Lembre-se da hidratação.";
        if (treinoHoje === 'treino_cardio') return "🏋️ Treinão duro! Não se esqueça de recuperar os músculos com Proteína.";
        return "🔥 Seu progresso visual está excelente. Mantenha o ritmo da semana!";
    }

    // Constantes de Tema Global (Tailwind dinâmico)
    const bgApp = temaEscuro ? 'bg-slate-900' : 'bg-gray-50'
    const bgCard = temaEscuro ? 'bg-slate-800 border border-slate-700 shadow-md text-white' : 'bg-white shadow-sm'
    const textPrincipal = temaEscuro ? 'text-white' : 'text-gray-800'
    const textSecundario = temaEscuro ? 'text-slate-400' : 'text-gray-500'
    const textSubLabel = temaEscuro ? 'text-slate-500' : 'text-gray-400'
    const bgAvatarBody = temaEscuro ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-100'


    useEffect(() => {
        const buscarDadosUsuario = async () => {
            const token = localStorage.getItem('token')

            if (!token) {
                alert('Você precisa estar logado!')
                return
            }

            const decodificado = jwtDecode<{ id: number, email: string }>(token)
            const idUsuario = decodificado.id


            const resposta = await fetch(`http://localhost:3000/usuarios/${idUsuario}`)
            const dados = await resposta.json()

            setUsuario(dados)
            setCarregando(false)
        }

        buscarDadosUsuario()
    }, [])


    /* Adicionar e Remover Água */

    const adicionarAgua = () => {
        setAguaAtual(aguaAtual + 200)
    }

    const removerAgua = () => {
        if (aguaAtual > 0) {
            setAguaAtual(aguaAtual - 200)
        }
    }



    if (carregando) {
        return <div className="flex items-center justify-center min-h-screen">Carregando. . .</div>
    }



    /* Página */

    return (

        <div className={`flex h-screen overflow-hidden font-sans transition-colors duration-300 ${bgApp}`}>

            {/* SideBar Esquerda */}

            <aside className={`w-24 border-r flex flex-col items-center py-8 justify-between transition-colors duration-300 ${temaEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
                <div>
                    {/* Logo/Icon */}
                    <div className="w-14 h-14 bg-gradient-to-tr from-purple-600 to-blue-500 rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg mb-12">
                        📊
                    </div>

                    {/* Navegação */}
                    <nav className="flex flex-col gap-6 w-full items-center">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl cursor-pointer hover:opacity-80 transition-opacity ${temaEscuro ? 'bg-slate-800 text-blue-400' : 'bg-blue-50 text-blue-600'}`}>
                            🏠
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl cursor-pointer transition-colors hover:opacity-80 ${temaEscuro ? 'text-slate-500 hover:text-slate-300' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}>
                            🏋️
                        </div>
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl cursor-pointer transition-colors hover:opacity-80 ${temaEscuro ? 'text-slate-500 hover:text-slate-300' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}>
                            👤
                        </div>
                    </nav>
                </div>

                {/* Settings e Toggle Theme no rodapé */}
                <div className="flex flex-col gap-4 mt-auto">
                    <div onClick={() => setTemaEscuro(!temaEscuro)} className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl cursor-pointer transition-all duration-300 hover:scale-105 ${temaEscuro ? 'bg-slate-800 text-yellow-400' : 'bg-gray-100 text-gray-600'}`}>
                        {temaEscuro ? '🌙' : '☀️'}
                    </div>
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl cursor-pointer transition-colors hover:opacity-80 ${temaEscuro ? 'text-slate-500 hover:text-slate-300' : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'}`}>
                        ⚙️
                    </div>
                </div>
            </aside>

            {/*  Conteúdo Principal */}

            <main className="flex-1 p-6 overflow-hidden flex flex-col">

                <header className="mb-4 flex flex-row items-end justify-between">
                    <div>
                        <h1 className={`text-2xl font-bold tracking-tight transition-colors duration-300 ${textPrincipal}`}>
                            Bom dia, {usuario?.nome ? usuario.nome.split(' ')[0] : 'Roberto'} 👋
                        </h1>
                        <p className={`text-sm mt-1 transition-colors duration-300 ${textSecundario}`}>Aqui está o seu resumo de progresso diário.</p>
                    </div>

                    {/* RÉGUA DA SEMANA (SLIDER) */}
                    <div className="flex items-center gap-2 mb-1 mx-6 opacity-90 hidden md:flex">
                        {['D', 'S', 'T', 'Q', 'Q', 'S'].map((dia, idx) => (
                            <div key={idx} className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors duration-300 shadow-inner ${temaEscuro ? 'bg-slate-800/80 text-slate-500' : 'bg-white text-gray-400 border border-gray-100'}`}>
                                {dia}
                            </div>
                        ))}
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center text-sm font-extrabold shadow-lg shadow-indigo-500/40 border-[3px] border-white relative scale-110 z-10">
                            S
                            <div className="absolute -top-1.5 -right-1 w-3 h-3 bg-green-400 border-2 border-white rounded-full"></div>
                        </div>
                    </div>

                    {/* OFENSIVA WIDGET */}
                    <div className="bg-gradient-to-r from-orange-100 to-orange-50 border border-orange-200 px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm shrink-0">
                        <span className="text-xl">🔥</span>
                        <div>
                            <p className="text-[10px] text-orange-600 font-extrabold uppercase tracking-widest leading-tight">Ofensiva</p>
                            <p className="text-sm text-orange-800 font-black leading-tight">12 Dias</p>
                        </div>
                    </div>
                </header>

                {/*  Cards Dashboard */}

                <div className="grid grid-cols-4 gap-4 mb-4">
                    <Componente cor="bg-gradient-to-br from-orange-400 to-orange-600" titulo="Peso Atual" valor={mockRegistroDiario.peso_do_dia.toString()} unidade="kg" />
                    <Componente cor="bg-gradient-to-br from-purple-500 to-purple-700" titulo="Sua Meta" valor="70" unidade="kg" />
                    <Componente cor="bg-gradient-to-br from-amber-400 to-amber-500" titulo="Calorias" valor={mockRegistroDiario.calorias_consumidas.toString()} unidade="kcal" />
                    <Componente cor="bg-gradient-to-br from-blue-500 to-blue-700" titulo="Treinos" valor={mockAtividades.length.toString()} unidade="treino(s)" />
                </div>

                {/* TREINADOR IA - MENSAGEM DINÂMICA */}
                <div className={`w-full ${temaEscuro ? 'bg-gradient-to-r from-indigo-900 to-slate-800 border-indigo-800 text-indigo-100' : 'bg-gradient-to-r from-indigo-50 to-white border-indigo-100 text-indigo-700'} border mb-4 p-3 rounded-2xl flex items-center shadow-sm transition-colors duration-300`}>
                    <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm shadow-md shrink-0 mr-3">🤖</div>
                    <p className="text-sm font-medium">{gerarDicaIA()}</p>
                </div>

                {/* SESSÃO DO GRÁFICO TELA INTEIRA */}
                <div className={`${bgCard} px-6 py-4 rounded-2xl w-full mb-4 transition-colors duration-300`}>
                    <h3 className={`font-semibold mb-2 text-sm ${textPrincipal}`}>Calorias na Semana</h3>
                    <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={mockGraficoCalorias}>
                            <XAxis dataKey="data" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                            <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: temaEscuro ? '#1e293b' : '#f3f4f6' }} contentStyle={{ backgroundColor: temaEscuro ? '#0f172a' : '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                            <Bar dataKey="calorias_consumidas" fill="#8b5cf6" radius={[6, 6, 6, 6]} barSize={30} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* GRID DOS MEDIDORES (3 COLUNAS) */}
                <div className="grid grid-cols-3 gap-6 flex-1">

                    {/* 1. MEDIDOR DE ÁGUA */}
                    <div className={`${bgCard} p-6 rounded-2xl flex flex-col items-center transition-colors duration-300`}>
                        <h3 className={`font-semibold w-full text-left mb-6 ${textPrincipal}`}>Hidratação</h3>

                        <svg width="160" height="160" viewBox="0 0 160 160">
                            {/* Definição de Cores do Arco */}
                            <defs>
                                <linearGradient id="aguaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#22d3ee" />
                                    <stop offset="100%" stopColor="#2563eb" />
                                </linearGradient>
                            </defs>
                            {/* Círculo de fundo */}
                            <circle cx="80" cy="80" r="60" fill="none" stroke={temaEscuro ? '#334155' : '#e5e7eb'} strokeWidth="12" className="transition-colors duration-300" />

                            {/* Círculo de progresso */}
                            <circle cx="80" cy="80" r="60" fill="none" stroke="url(#aguaGradient)" strokeWidth="12"
                                strokeDasharray="377"
                                strokeDashoffset={377 - (377 * (aguaAtual / mockRegistroDiario.agua_meta_ml))}
                                strokeLinecap="round"
                                transform="rotate(-90 80 80)" className="transition-all duration-500" />

                            {/* Texto Central */}
                            <text x="80" y="75" textAnchor="middle" fontSize="24" fontWeight="bold" fill={temaEscuro ? '#f8fafc' : '#1f2937'} className="transition-colors duration-300">{aguaAtual}ml</text>
                            <text x="80" y="95" textAnchor="middle" fontSize="12" fill={temaEscuro ? '#94a3b8' : '#9ca3af'} className="transition-colors duration-300">/{mockRegistroDiario.agua_meta_ml}ml</text>
                        </svg>

                        {/* Botões Água */}
                        <div className="flex gap-2 mt-6 w-full px-2">
                            <button onClick={removerAgua} className={`flex items-center justify-center w-12 h-10 rounded-xl transition-all font-medium ${temaEscuro ? 'bg-slate-700 hover:bg-slate-600 text-slate-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-500'}`} title="Desfazer">
                                ⏪
                            </button>
                            <button onClick={adicionarAgua} className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white h-10 flex items-center justify-center gap-1 rounded-xl shadow-md shadow-blue-500/30 transition-all font-bold">
                                💧 + 200ml
                            </button>
                        </div>
                    </div>

                    {/* 2. MEDIDOR DE COMIDA (Macros) */}
                    <div className={`${bgCard} p-6 rounded-2xl flex flex-col justify-between w-full h-full relative transition-colors duration-300`}>
                        <h3 className={`font-semibold w-full text-left ${textPrincipal}`}>Alimentação</h3>

                        <div className="flex flex-col justify-around w-full mt-2 h-full gap-2">
                            {/* Proteína */}
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-red-500">Proteína</span>
                                    <span className={textSecundario}>{mockAlimentacao.macrosConsumo.pro}g / {mockAlimentacao.macrosMeta.pro}g</span>
                                </div>
                                <div className={`w-full ${temaEscuro ? 'bg-slate-700' : 'bg-gray-100'} h-2.5 rounded-full overflow-hidden transition-colors duration-300`}>
                                    <div className="bg-red-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((mockAlimentacao.macrosConsumo.pro / mockAlimentacao.macrosMeta.pro) * 100, 100)}%` }}></div>
                                </div>
                            </div>
                            {/* Carboidrato */}
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-yellow-500">Carboidrato</span>
                                    <span className={textSecundario}>{mockAlimentacao.macrosConsumo.car}g / {mockAlimentacao.macrosMeta.car}g</span>
                                </div>
                                <div className={`w-full ${temaEscuro ? 'bg-slate-700' : 'bg-gray-100'} h-2.5 rounded-full overflow-hidden transition-colors duration-300`}>
                                    <div className="bg-yellow-400 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((mockAlimentacao.macrosConsumo.car / mockAlimentacao.macrosMeta.car) * 100, 100)}%` }}></div>
                                </div>
                            </div>
                            {/* Gordura */}
                            <div>
                                <div className="flex justify-between text-xs font-semibold mb-1">
                                    <span className="text-purple-500">Gordura</span>
                                    <span className={textSecundario}>{mockAlimentacao.macrosConsumo.gor}g / {mockAlimentacao.macrosMeta.gor}g</span>
                                </div>
                                <div className={`w-full ${temaEscuro ? 'bg-slate-700' : 'bg-gray-100'} h-2.5 rounded-full overflow-hidden transition-colors duration-300`}>
                                    <div className="bg-purple-500 h-full rounded-full transition-all duration-500" style={{ width: `${Math.min((mockAlimentacao.macrosConsumo.gor / mockAlimentacao.macrosMeta.gor) * 100, 100)}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. MEDIDOR DE TREINO (Gamificação) */}
                    <div className={`${bgCard} p-6 rounded-2xl flex flex-col items-center justify-between w-full h-full relative transition-colors duration-300`}>
                        <h3 className={`font-semibold w-full text-left mb-2 z-10 ${textPrincipal}`}>Físico</h3>

                        {/* Avatar com Glow Pulsante se Ativo */}
                        <div className={`relative flex items-center justify-center w-24 h-24 mt-2`}>
                            {/* Aura de Efeito Traseiro */}
                            {treinoHoje && treinoHoje !== 'nada' && <div className={`absolute inset-0 rounded-full blur-xl opacity-60 animate-pulse ${
                                treinoHoje === 'treino_cardio' ? 'bg-indigo-500' :
                                treinoHoje === 'cardio' ? 'bg-orange-500' : ''
                            }`}></div>}
                            
                            <div className={`relative w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-inner z-10 transition-all duration-500 ${
                                treinoHoje === 'treino_cardio' ? 'bg-white border-4 border-indigo-500 scale-110' :
                                treinoHoje === 'cardio' ? 'bg-white border-4 border-orange-400 scale-105' :
                                treinoHoje === 'nada' ? 'bg-slate-100 border-4 border-slate-400 opacity-80' :
                                `${bgAvatarBody} border-2 border-dashed`
                            }`}>
                                {treinoHoje === 'treino_cardio' ? '🏋️‍♂️' :
                                    treinoHoje === 'cardio' ? '🏃‍♂️' :
                                        treinoHoje === 'nada' ? '😴' : '❓'}
                            </div>
                        </div>

                        {/* Segmented Controls Wrapper */}
                        <div className={`flex w-full mt-4 p-1 rounded-xl ${temaEscuro ? 'bg-slate-700 border border-slate-600' : 'bg-gray-100 border border-gray-200'}`}>
                            <button onClick={() => setTreinoHoje('treino_cardio')} className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all duration-300 ${treinoHoje === 'treino_cardio' ? 'bg-indigo-600 text-white shadow-sm scale-105' : `text-gray-500 dark:text-slate-400 hover:opacity-80`}`}>Treino</button>
                            <button onClick={() => setTreinoHoje('cardio')} className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all duration-300 ${treinoHoje === 'cardio' ? 'bg-orange-500 text-white shadow-sm scale-105' : `text-gray-500 dark:text-slate-400 hover:opacity-80`}`}>Cardio</button>
                            <button onClick={() => setTreinoHoje('nada')} className={`flex-1 py-1.5 text-[10px] sm:text-xs font-bold rounded-lg transition-all duration-300 ${treinoHoje === 'nada' ? 'bg-slate-500 text-white shadow-sm scale-105' : `text-gray-500 dark:text-slate-400 hover:opacity-80`}`}>Pausa</button>
                        </div>
                    </div>

                </div>

            </main>


            {/* Sidebar Direita */}

            {/* Sidebar Direita */}

            <aside className={`w-80 border-l p-8 flex flex-col gap-8 overflow-y-auto hidden lg:flex transition-colors duration-300 ${temaEscuro ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>

                {/* Cabeçalho de Perfil */}
                <div className="flex flex-col items-center text-center mt-4">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-100 to-blue-100 flex items-center justify-center text-4xl border-4 border-white shadow-md mb-4">
                        🧑‍💻
                    </div>
                    <h3 className={`font-bold text-xl ${textPrincipal}`}>{usuario?.nome || 'Dev Roberto'}</h3>
                    <p className={`text-sm ${textSecundario}`}>{usuario?.email || 'roberto@dev.com'}</p>
                </div>

                {/* Card de Peso e Meta */}
                <div className={`rounded-2xl p-5 border relative overflow-hidden transition-colors duration-300 ${temaEscuro ? 'bg-slate-800 border-slate-700' : 'bg-purple-50 border-purple-100'}`}>
                    <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-50 blur-xl ${temaEscuro ? 'bg-indigo-500' : 'bg-purple-200'}`}></div>
                    <div className="flex justify-between items-end relative z-10">
                        <div>
                            <p className={`text-sm font-medium mb-1 ${temaEscuro ? 'text-indigo-400' : 'text-purple-600'}`}>Seu Objetivo</p>
                            <h4 className={`text-3xl font-bold ${temaEscuro ? 'text-white' : 'text-purple-900'}`}>{usuario?.meta || '70'} <span className="text-base font-medium">kg</span></h4>
                        </div>
                        <div className="text-right">
                            <p className={`text-xs mb-1 ${temaEscuro ? 'text-indigo-500' : 'text-purple-400'}`}>Atual</p>
                            <p className={`font-semibold ${temaEscuro ? 'text-indigo-300' : 'text-purple-700'}`}>{mockRegistroDiario.peso_do_dia} kg</p>
                        </div>
                    </div>
                </div>

                {/* Resumo Rápido Diário */}
                <div>
                    <h4 className={`font-semibold mb-4 flex items-center justify-between ${textPrincipal}`}>
                        Progresso de Hoje
                        <span className={`text-xs font-normal px-2 py-1 rounded-md ${temaEscuro ? 'bg-indigo-900/50 text-indigo-300' : 'bg-blue-50 text-blue-500'}`}>Ao vivo</span>
                    </h4>

                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-orange-500 text-lg ${temaEscuro ? 'bg-slate-800' : 'bg-orange-50'}`}>🔥</div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <p className={`text-sm font-medium ${textPrincipal}`}>Calorias</p>
                                    <p className={`text-sm font-bold ${textPrincipal}`}>{mockRegistroDiario.calorias_consumidas}</p>
                                </div>
                                <div className={`w-full h-2 rounded-full overflow-hidden ${temaEscuro ? 'bg-slate-700' : 'bg-gray-100'}`}>
                                    <div className="bg-orange-500 h-full rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-blue-500 text-lg ${temaEscuro ? 'bg-slate-800' : 'bg-blue-50'}`}>💧</div>
                            <div className="flex-1">
                                <div className="flex justify-between mb-1">
                                    <p className={`text-sm font-medium ${textPrincipal}`}>Água (ml)</p>
                                    <p className={`text-sm font-bold ${textPrincipal}`}>{aguaAtual}</p>
                                </div>
                                <div className={`w-full h-2 rounded-full overflow-hidden ${temaEscuro ? 'bg-slate-700' : 'bg-gray-100'}`}>
                                    <div className="bg-blue-500 h-full rounded-full transition-all duration-300" style={{ width: `${Math.min((aguaAtual / mockRegistroDiario.agua_meta_ml) * 100, 100)}%` }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cálculo do IMC */}
                <div className={`mt-auto rounded-2xl p-5 border flex items-center justify-between transition-colors duration-300 ${temaEscuro ? 'bg-slate-800 border-slate-700' : 'bg-gray-50 border-gray-100'}`}>
                    <div>
                        <p className={`text-xs font-medium tracking-wider uppercase mb-1 ${textSubLabel}`}>Seu IMC</p>
                        <h4 className={`text-2xl font-bold ${textPrincipal}`}>24.5</h4>
                    </div>
                    <div className={`text-xs font-bold px-3 py-1 rounded-full border ${temaEscuro ? 'bg-emerald-900/30 text-emerald-400 border-emerald-800/50' : 'bg-green-100 text-green-700 border-transparent'}`}>
                        Normal
                    </div>
                </div>

            </aside>


        </div>




    )

}


export default Dashboard 