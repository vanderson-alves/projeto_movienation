import React from 'react'
import { Link } from "react-router-dom"

export default function Erro(){
    return (
        <div>
            <h1>Hum, parece que essa página não existe</h1>

            <span>Você pode estar buscando por:</span> <br/><br/>
            <div>
                <li><Link to="/">Home</Link></li><br/>
                <li><Link to="/favoritos">Salvos</Link></li><br/>
            </div>
        </div>
    )
}