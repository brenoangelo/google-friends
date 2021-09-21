import { FormEvent, useState } from 'react'

import { database } from '../services/firebase'

import { useHistory } from 'react-router-dom';

import '../styles/auth.scss'

import { Button } from '../components/Button';

import { useAuth } from '../hooks/useAuth';

import googleIcon from '../assets/images/google-logo.svg'
import logo from '../assets/images/logo-google-friends.png';
import room from '../assets/images/google-classroom.svg';

export function Home() {
    const history = useHistory()
    const { user, signInWithGoogle } = useAuth()
    const [code, setCode] = useState('')

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()
        
        if(!user) {
           await signInWithGoogle()
        }

        history.push('./rooms/new')
    }

    async function handleJoinRoom(event: FormEvent){
        event.preventDefault()

        if(code.trim() === ''){
            return;
        }

        const roomRef = await database.ref(`rooms/${code}`).get()

        if(!roomRef.exists()){
            return new Error('Room no exists')
        }

        history.push(`/rooms/${code}`)

        setCode('')
    }


    return (
        <div id="auth-page">
            <main>
                <img src={logo} alt="Google Friends" />
                <form onSubmit={handleJoinRoom}>
                    <input type="text" placeholder="Código da sala..." 
                        onChange={event => setCode(event.target.value)}
                        value={code}
                    />
                    <Button><img src={room} alt="google room" />Entrar na Sala</Button>
                    <div className="separator">OU</div>
                    <button className="button-google"
                        onClick={handleCreateRoom}
                    >
                        <img src={googleIcon} alt="google icon" />Criar sala com o Google
                    </button>
                </form>
            </main>
        </div>
    )
}