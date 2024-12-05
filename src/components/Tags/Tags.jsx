import style from './Tags.module.css';

export default function Tags({ tags = [] }) {
    return (
        tags.length > 0 && ( // Mostro i tag solo se esistono
            <div className={style.tags_container}>
                {tags.map((tag, index) => {
                    const formattedTag = tag.toLowerCase().replaceAll(' ', '_')      // Formattazione del tag
                    return (
                        <span
                            key={index}
                            className={`${style.tag} ${style[`tag_${formattedTag}`]}`}    // Classe dinamica basata sul tag formattato
                        >
                            {tag}
                        </span>
                    )
                })}
            </div>
        ))
}
