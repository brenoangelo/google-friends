import { ButtonHTMLAttributes } from 'react'

import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> | any

export function Button({backgroundColor, color, ...props}: ButtonProps) {
    const customStyle = {
        backgroundColor: backgroundColor,
        color: color
    }

    return (
        <button className="button" 
            {...props}
            style={customStyle}
        />
    )
}