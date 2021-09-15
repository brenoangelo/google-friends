import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type Button = ButtonHTMLAttributes<HTMLButtonElement>

export function Button(props: Button){
    return(
        <button className="button" { ...props }/>
    )
}