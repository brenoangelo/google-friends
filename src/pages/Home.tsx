import '../styles/auth.scss'

import { Button } from '../components/Button';

import { firebase, auth } from '../services/firebase'

import googleIcon from '../assets/images/google-logo.svg'
import logo from '../assets/images/logo-google-friends.png';
import room from '../assets/images/google-classroom.svg';

export function Home() {
    
    function handleCreateRoom() {
        const provider = new firebase.auth.GoogleAuthProvider()
        auth.signInWithPopup(provider)
            .then((result) => {
                var user = result.user
                console.log(result)
            })

    }

    return (
        <div id="auth-page">
            <main>
                <img src={logo} alt="Google Friends" />
                <form>
                    <input type="text" placeholder="Código da sala..." />
                    <Button><img src={room} />Entrar na Sala</Button>
                    <div className="separator">OU</div>
                    <button className="button-google"
                        onClick={handleCreateRoom}
                    >
                        <img src={googleIcon} />Criar sala com o Google
                    </button>
                </form>
            </main>
        </div>
    )
}