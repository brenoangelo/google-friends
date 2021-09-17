import { useHistory } from 'react-router-dom';

import '../styles/auth.scss'

import { useAuth } from '../hooks/useAuth';

import { Button } from '../components/Button';

import addIcon from '../assets/images/add-icon.png';
import logo from '../assets/images/logo-google-friends.png';



export function NewRoom() {
    
    const { user } = useAuth();
    
    return (
        <div id="auth-page">
            <main>
                <img src={logo} alt="Google Friends" />
                <h2>Crie uma nova Sala</h2>
                <form>
                    <input type="text" placeholder="Nome da sala" />
                    <Button><img src={addIcon} alt="google room"/>Criar Sala</Button>
                </form>
            </main>
        </div>
    )
}