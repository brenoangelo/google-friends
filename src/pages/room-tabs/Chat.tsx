import { useParams } from 'react-router'

import { Button } from '../../components/Button'

import { FormEvent, useEffect, useState } from 'react'
import { database } from '../../services/firebase'
import { useAuth } from '../../hooks/useAuth'
import { MessageBox } from '../../components/MessageBox'


type ParamsType = {
    id: string;
}

type FirebaseChat = Record<string, {
    author: {
        id: string;
        avatar: string;
        name: string;
    },
    date: string;
    content: string;
}>

type ChatMessages = {
    id: string;
    author: {
        id: string;
        name: string;
        avatar: string;
    },
    date: string;
    content: string;
}

export function Chat(){ 
    const [newMessage, setNewMessage] = useState('')
    const [title, setTitle] = useState('')
    const [chatMessages, setChatMessages] = useState<ChatMessages[]>([])
    const { user } = useAuth()
    const date = new Date()


    const params = useParams<ParamsType>()
    const roomId = params.id

    useEffect(()=>{
        const roomRef = database.ref(`rooms/${roomId}/chat`)

        roomRef.on('value', room => {
            const databaseRoom = room.val()

            const firebaseChat: FirebaseChat = databaseRoom ?? {}
            
            const parsedChat = Object.entries(firebaseChat).map(([key, value])=>{
                return {
                    id: key,
                    author: value.author,
                    content: value.content,
                    date: value.date
                }
            })

            setTitle(databaseRoom.title)
            setChatMessages(parsedChat)
            
        })

        
    }, [roomId])

    

    async function handleSendMessage(event: FormEvent){
        event.preventDefault()

        const monName = new Array("jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez")

        let day = String(date.getDate()).padStart(2, '0')
        let month = monName[date.getMonth()]
        let year = date.getFullYear()
        let hours = String(date.getHours()).padStart(2, '0')
        let minutes = String(date.getMinutes()).padStart(2, '0')

        const dateNow = `${day} de ${month}, ${hours}:${minutes}`

        if(newMessage.trim() === ''){
            return;
        }

        if(!user){
            throw new Error('You must be logged in')
        }

        const message = {
            content: newMessage,
            date: dateNow,
            author: {
                id: user.id,
                name: user.name,
                avatar: user.avatar
            }

        }
        console.log(message)
        await database.ref(`rooms/${ roomId }/chat`).push(message)
        setNewMessage('')

    }

    return (
        <div id="chat-content">
            <form onSubmit={handleSendMessage}>
                <textarea placeholder="Digite aqui..."
                    onChange={event => setNewMessage(event.target.value)}
                    value={newMessage}
                />

                <div className="form-footer">
                    { 
                        user ? (
                            <div className="user-info">
                                <img src={user?.avatar} />
                                <span>{user?.name}</span>
                            </div>
                        ):(
                            <span>Para interagir, 
                                <button>faça seu login</button></span>
                        )
                    }

                    <Button disabled={!user}>Enviar</Button>
                </div>
            </form>

            <main className="chat-messages">
                {chatMessages.map((message) => {
                    return (
                        <MessageBox userId={user?.id} message={message}/>
                    )
                })}

            </main>
        </div>

        
    )
}