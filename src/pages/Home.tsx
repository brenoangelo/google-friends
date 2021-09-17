import { FormEvent } from 'react'

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

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault()
        
        if(!user) {
           await signInWithGoogle()
        }

        history.push('./rooms/new')
    }

    return (
        <div id="auth-page">
            <main>
                <img src={logo} alt="Google Friends" />
                <form onSubmit={handleCreateRoom}>
                    <input type="text" placeholder="Código da sala..." />
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