
import '../styles/sign-box.scss'

export function SignBox(){
    return (
        <div className="sign-box">
            <i>
                <svg xmlns="http://www.w3.org/2000/svg" id="Outline" 
                    viewBox="0 0 24 24" width="512" height="512">
                    <path d="M17,0H7A5.006,5.006,0,0,0,2,5V20a4,4,0,0,
                    0,4,4H17a5.006,5.006,0,0,0,5-5V5A5.006,5.006,0,0,0,17,
                    0Zm3,5V16H8V2h9A3,3,0,0,1,20,5ZM6,2.172V16a3.98,3.98,
                    0,0,0-2,.537V5A3,3,0,0,1,6,2.172ZM17,22H6a2,2,0,0,1,
                    0-4H20v1A3,3,0,0,1,17,22Z"/>
                </svg>
            </i>
            
            <h3>Tipo</h3>
            <h1>Titulo</h1>
            <p>descrição</p>
            
        </div>
    )
}