import style from './Tags.module.css'

export default function Tags({ tags = [] }) {
    return (
        tags.length > 0 && ( // Mostro i tag solo se esistono
            <div className={style.tags_container}>
                {tags.map((tag, index) => ( // genero i tag dinamicamente e aggiornabili tramite l'indice
                    <span
                        key={index}
                        className={`${style.tag} ${style[`tag_${tag}`]}`} // con le [] leggo la propiretà dell'oggetto e costruisco con il `il nome del tag
                    >
                        {tag}
                    </span>
                ))}
            </div>
        )
    )
}