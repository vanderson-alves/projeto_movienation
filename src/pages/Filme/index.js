import { useEffect, useState } from 'react'
import './filme-info.css'
import { useParams, useHistory } from 'react-router-dom'
import api from '../../services/api'
import { toast } from 'react-toastify'

export default function Filme(){
    const {id} = useParams()
    const history = useHistory()

    const [filme, setFilme] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function loadFilme(){
            const response = await api.get(`r-api/?api=filmes/${id}`)

            if(response.data.length === 0){
                // Tentou acessar com um ID que não existe, navego ele para HOME
                history.replace('/')
                return
            }

            //console.log(response.data)
            setFilme(response.data)
            setLoading(false)
        }

        loadFilme()

        return () => {
            console.log('Componente desmontado')
        }


    }, [history, id])


    function salvaFilme(){
        
        const minhaLista = localStorage.getItem('filmes')

        let filmesSalvos = JSON.parse(minhaLista) || []

        // Se tiver algum filmes salvo com esse mesmo ID, precisa ignorar

        const hasFilme = filmesSalvos.some( (filmeSalvo) => filmeSalvo.id === filme.id)

        if(hasFilme) {
            toast.error('Você já possui esse filme salvo')
            return
            // Para execução do código aqui...
        }

        filmesSalvos.push(filme)
        localStorage.setItem('filmes', JSON.stringify(filmesSalvos))
        toast.success('Filme salvo com sucesso')

    }


    if(loading) {
        return(
            <div className='filme-info'>
                <h1>Carregando seu filme...</h1>
            </div>    
        )
    }
    return (
        <div className='filme-info'>
            <h1>{filme.nome}</h1>
            <img src={filme.foto} alt={filme.nome}/>

            <h3>Sinopse</h3>
            {filme.sinopse}

            <div className="botoes">
                <button onClick={salvaFilme}>Salvar</button>
                <button>
                    <a target="blank" href={`https://youtube.com/results?search_query=${filme.nome} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}