import { useState } from "react";

import { SignBox } from "../../components/SignBox";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Modal } from "../../components/Modal";

type newBook = {
    type: string;
    title: string;
    link: string;
    description: string;
}

export  function Book(){
    const [modal, setModal] = useState(false)
    const [newBook, setNewBook] = useState({} as newBook)

    function handleModalBook(){
        modal ? setModal(false) : setModal(true)
    }

    function handleNewBook(newBookObject: Object) {
        console.log(newBookObject)
    }

    return (
        <>
            {
                modal && <Modal handleModal={handleModalBook}
                            handleNewItem={handleNewBook}
                        ></Modal>
            }
            <div id="book-content">
                <SignBox />
                <SignBox />
                <SignBox />
                <SignBox />
                <SignBox />
                <SignBox />
                <SignBox />
                <SignBox />
                <SignBox />
            </div>

            <ButtonAdd 
                handleModal={handleModalBook}
                
                />
        </>
    )
}