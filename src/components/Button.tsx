import {FC, ButtonHTMLAttributes} from 'react'

type ButtonProps = {
    color?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button:FC<ButtonProps> = ({children, color, ...props}) => {
    return (
        <button {...props} style={{background: color}}>
            {children}!!!!
        </button>
    )
}