import { useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react';

import { database } from '../services/firebase';

import '../styles/auth.scss'

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';

import addIcon from '../assets/images/add-icon.png';
import logo from '../assets/images/logo-google-friends.png';



export function NewRoom() {
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('')
    const { user } = useAuth();

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()

        if(newRoom.trim() === ''){
            return;
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id
        })
        const salaId = firebaseRoom.ref.key

        history.push(`/rooms/${salaId}`)

    }
    
    return (
        <div id="auth-page">
            <main>
                <img src={logo} alt="Google Friends" />
                <h2>Crie uma nova Sala</h2>
                <form onSubmit={handleCreateRoom}>
                    <input type="text" placeholder="Nome da sala" 
                        onChange={event => setNewRoom(event.target.value)} 
                        value={newRoom}   
                    />
                    <Button><img src={addIcon} alt="google room"/>Criar Sala</Button>
                </form>
            </main>
        </div>
    )
}