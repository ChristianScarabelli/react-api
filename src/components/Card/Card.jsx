import style from './Card.module.css'
import placeHolderImage from '../../assets/Img/600x400_placeholder.jpg'
import Button from '../ui/Button/Button.jsx'
import Tags from '../Tags/Tags.jsx'
import DeleteButton from '../ui/Button/DeleteButton/DeleteButton.jsx'
import { API_BASE_URI } from '../Main.jsx'  // importo la rotta base da usare come path per le immagini


export default function Card({ title = '', image, content = '', tags = [], onDelete = () => { }, author = '', category = '' }) {

    return (
        <>
            <div className="container">
                <div className={style.card}>
                    <figure className={style.image}>     {/* se c'è l'immagine, path base + immagine, altrimenti il placeholder  */}
                        <img className={style.thumb} src={image ? API_BASE_URI + image : placeHolderImage} alt={title} />
                    </figure>
                    <div className={style.body}>
                        <h3 className={style.title}>{title}</h3>
                        <h4 className={style.author}>{`Autore: ${author}`}</h4>
                        <h5 className={style.category}>{`Categoria: ${category}`}</h5>
                        < Tags tags={tags} />
                        <p className={style.description}>{content}</p>
                        <div className={style.buttons}>
                            <Button />
                            <DeleteButton onClick={onDelete} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}