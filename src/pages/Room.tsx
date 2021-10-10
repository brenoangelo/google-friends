import { useParams, Switch, Route, BrowserRouter, NavLink } from 'react-router-dom'

import logo from '../assets/images/logo-google-friends.png'

import { RoomCode } from '../components/RoomCode'

import '../styles/room.scss'
import { Book } from './room-tabs/Book'
import { Chat } from './room-tabs/Chat'
import { Job } from './room-tabs/Job'
import { Movie } from './room-tabs/Movie'

import * as ROUTES from '../routes/Routes'
import { RoomContextProvider } from '../contexts/RoomContext'

type RoomParams = {
    id: string;
}

export function Room(){
    const params = useParams<RoomParams>()
    const roomId = params.id;
    return(
        <BrowserRouter>
            <RoomContextProvider roomId={roomId}>
            <div id="room-page">
                <header>
                    <div className="header-content">
                        <img src={logo} alt="Friends Logo" />
                        <RoomCode roomcode={roomId}/>
                    </div>
                </header>
                <main>
                <h2>Sala </h2>
                    <nav className="tab-menu">
                        <ul>
                            <li><NavLink exact to={`/rooms/${roomId}/`}>Chat</NavLink></li>
                            <li><NavLink to={`/rooms/${roomId}/books`}>Livros</NavLink></li>
                            <li><NavLink to={`/rooms/${roomId}/movies`}>Filmes/Series</NavLink></li>
                            <li><NavLink to={`/rooms/${roomId}/jobs`}>Empregos</NavLink></li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route path={ROUTES.CHAT} exact component={Chat}/>
                        <Route path={ROUTES.BOOKS} component={Book}/>
                        <Route path={ROUTES.MOVIES} component={Movie}/>
                        <Route path={ROUTES.JOBS} component={Job}/>
                    </Switch>
                </main>
            </div>
            </RoomContextProvider>
        </BrowserRouter>
    )
}