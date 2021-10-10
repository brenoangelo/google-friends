import { createContext, ReactNode, useEffect, useState } from "react"
import { database } from "../services/firebase"

type FirebaseRoom = {
    title: string;
    chat: Object;
    authorId: string;
}

type RoomContextType = {
    roomInfo: RoomInfoType | undefined;
}

type RoomInfoType = {
    title: string;
    chat: Object;
    authorId: string;
}

type Props = {
    roomId: string;
    children: ReactNode;
}

export const RoomContext = createContext({} as RoomContextType)

export function RoomContextProvider({children, ...props}: Props){
    const [roomInfo, setRoomInfo] = useState<RoomInfoType>()
    const roomId = props.roomId;
    let roomTitle = ''

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)
        roomRef.once('value', room => {
            const databaseRoom = room.val()

            const firebaseRoom: FirebaseRoom = databaseRoom ?? {}
            const roomDetails = {
                title: firebaseRoom.title,
                chat: firebaseRoom.chat,
                authorId: firebaseRoom.authorId,
            }

            setRoomInfo(roomDetails)
            
            roomTitle = roomDetails.title
        })

    },[roomId])

    return (
        <RoomContext.Provider value={{roomInfo}}>
            {children}
        </RoomContext.Provider>
    )
}