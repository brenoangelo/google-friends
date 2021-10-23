import { createContext, ReactNode, useEffect, useState } from "react"
import { database } from "../services/firebase"

type FirebaseRoom = {
    title: string;
    chat: Object;
    authorId: string;
}

type RoomContextType = {
    roomInfo: RoomInfoType | undefined;
    roomId: string;
}

type RoomInfoType = {
    title: string;
    chat: Object;
    authorId: string;
    
}

type Props = {
    roomId: string;
    setRoomTitle: any;
    children: ReactNode;
}

export const RoomContext = createContext({} as RoomContextType)

export function RoomContextProvider({children, ...props}: Props){
    const [roomInfo, setRoomInfo] = useState<RoomInfoType>()
    const { setRoomTitle, roomId } = props

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`)
        
        roomRef.on('value', room => {
            const databaseRoom = room.val()

            const firebaseRoom: FirebaseRoom = databaseRoom ?? {}
            const roomDetails = {
                title: firebaseRoom.title,
                chat: firebaseRoom.chat,
                authorId: firebaseRoom.authorId,
            }

            setRoomInfo(roomDetails)
            const roomTitle = roomDetails.title
            setRoomTitle(roomTitle)
        })

    },[roomId])

    return (
        <RoomContext.Provider value={{roomInfo, roomId}}>
            {children}
        </RoomContext.Provider>
    )
}