
import iconCopy from '../assets/images/icon-copy.png'

type RoomCodeProps = {
    roomcode: string;
}

export function RoomCode(props: RoomCodeProps) {

    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.roomcode)
    }

    return(
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div className="iconCopy">
                <img src={iconCopy} alt="Copiar Link"/>
            </div>
            <span>Sala #{props.roomcode}</span>
        </button>
    )
}