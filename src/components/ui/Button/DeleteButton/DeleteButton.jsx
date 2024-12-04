import style from './DeleteButton.module.css'

export default function DeleteButton({ onClick }) {
    return (
        <button onClick={onClick} className={style.button}>x</button>
    )
}