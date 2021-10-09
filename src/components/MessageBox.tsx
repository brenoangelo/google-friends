
type MessaBoxProps = {
    message: {
        id: string;
        author: {
            id: string;
            name: string;
            avatar: string;
        }
        content: string;
        date: string;
    },
    userId: string | undefined;
}

export function MessageBox({message, userId}: MessaBoxProps){
    return (
        <div className={`message-single ${userId == message.author.id ? "your-message" : ""}`} key={message.id}>               
            <span>
                <img src={message.author.avatar}/>
                <h3>{message.author.name}</h3>
                <small>{message.date}</small>
            </span>

            <p>{message.content}</p>
        </div>
    )
}