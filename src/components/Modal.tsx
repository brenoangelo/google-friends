import { useState, FormEvent } from "react"

import "../styles/modal.scss"
import { Button } from "./Button"

type Props = {
    handleModal: () => void;
    handleNewItem: Function;
}

export function Modal({handleModal, handleNewItem}: Props){
    const [ type, setType ] = useState('')
    const [ title, setTitle ] = useState('')
    const [ link, setLink ] = useState('')
    const [ description, setDescription ] = useState('')

    function handlePushNewItem(event: FormEvent){
        event.preventDefault()
    }

    return (
        <div className="modal">
            <form onSubmit={handlePushNewItem}>
                <h2>Livro</h2>
                <input type="text" placeholder="Genero"
                    onChange={event => setType(event.target.value)}
                    value={type}
                />
                <input type="text" placeholder="Nome"
                    onChange={event => setTitle(event.target.value)}
                    value={title}
                />
                <input type="text" placeholder="Link"
                    onChange={event => setLink(event.target.value)}
                    value={link}
                />
                <textarea placeholder="Descrição"
                    onChange={event => setDescription(event.target.value)}
                    value={description}
                />

                <div>
                    <Button 
                        backgroundColor="#1a73e8" color="#fff"
                        
                        >Confirmar</Button>
                    <Button onClick={handleModal}>Cancelar</Button>
                </div>

            </form>
        </div>
    )
}