import { useEffect, useState } from "react";

import { SignBox } from "../../components/SignBox";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Modal } from "../../components/Modal";
import { database } from "../../services/firebase";
import { useAuth } from "../../hooks/useAuth";
import { useRoom } from "../../hooks/useRoom";

type Book = {
    type: string;
    title: string;
    link: string;
    description: string;
}

type Books = {
    id: string;
    book: Book;
    author: {
        id: string;
        avatar: string;
        name: string;
    };
}

type FirebaseBooks = Record<string, {
    id: string;
    user: {
        id: string;
        avatar: string;
        name: string;
    };
    book: Book;
}>

export  function Book(){
    const [modal, setModal] = useState(false)
    const [books, setBooks] = useState<Books[]>([])
    const { user } = useAuth()
    const { roomId } = useRoom();

    function handleModalBook(){
        modal ? setModal(false) : setModal(true)
    }

    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}/books`)
        
        roomRef.on('value', room => {
            const databaseRoom = room.val()

            const firebaseBooks: FirebaseBooks = databaseRoom ?? {}
            
            const parsedBooks = Object.entries(firebaseBooks).map(([key, value])=>{
                return {
                    id: key,
                    author: value.user,
                    book : {
                        title: value.book?.title,
                        link: value.book?.link,
                        type: value.book?.type,
                        description: value.book?.description
                    }
                }
            })
            setBooks(parsedBooks)
            
        })
        
    }, [])

    async function handleNewBook(book: Book) {
        await database.ref(`rooms/${ roomId }/books`).push({user, book})
    }

    return (
        <>
            {
                modal && <Modal handleModal={handleModalBook}
                            handleNewItem={handleNewBook}
                            
                        />
            }
            <div id="book-content">
                {books.map((current) => {
                    return <SignBox 
                                key={current.id}
                                book={current.book}
                            />
                })}
                
            </div>

            <ButtonAdd 
                handleModal={handleModalBook}
                
                />
        </>
    )
}