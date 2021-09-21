import { useParams } from 'react-router'

import { Button } from '../../components/Button'

import imgTest from '../../assets/images/add-icon.png'

import { FormEvent, useState } from 'react'
import { database } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'


type ParamsType = {
    id: string;
}

export function Chat(){ 
    const [newMessage, setNewMessage] = useState('')
    const { user } = useAuth()

    const params = useParams<ParamsType>()
    const roomId = params.id


    async function handleSendMessage(event: FormEvent){
        event.preventDefault()

        if(newMessage.trim() === ''){
            return;
        }

        if(!user){
            throw new Error('You must be logged in')
        }

        const message = {
            content: newMessage,
            author: {
                name: user.name,
                avatar: user.avatar
            }

        }

        await database.ref(`rooms/${ roomId }/chat`).push(message)

    }

    return (
        <form id="chat-content" onSubmit={handleSendMessage}>
            <textarea placeholder="Digite aqui..."
                onChange={event => setNewMessage(event.target.value)}
                value={newMessage}
            />

            <div className="form-footer">
                <div className="user-info">
                    <img src={user?.avatar} />
                    <span>{user?.name}</span>
                </div>

                <Button disabled={!user}>Enviar</Button>
            </div>
        </form>
    )
}