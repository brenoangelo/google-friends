
import '../styles/button-add.scss'

type Props = {
    handleModal: ()=>void;
}

export function ButtonAdd({ handleModal }: Props){

    return(
        <span className="button-add"
            onClick={() => handleModal()}
        >
            +
        </span>
    )
}