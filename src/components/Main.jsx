// esempio immagine https://store-images.s-microsoft.com/image/apps.50670.13727851868390641.c9cc5f66-aff8-406c-af6b-440838730be0.d205e025-5444-4eb1-ae46-571ae6895928?h=862&format=jpg

import Card from './Card/Card.jsx'
import Tags from './Tags/Tags.jsx'
import { useState, useEffect } from 'react'
import axios from 'axios'

// mi creo l'oggetto con i dati iniziali del form
// che poi diventerà variabile di stato, per essere aggiornata con i dati ricevuti dal form

const InitialFormData = {
    title: '',
    author: '',
    content: '',
    category: '',
    image: undefined,
    tags: '',
    published: false,
}

// variabile con la rotta base, che esporto per fare facilmente il path giusto delle immagini
export const API_BASE_URI = 'http://localhost:3000/'


export default function Main() {

    // variabile di stato per il form, con valore di partenza i campi vuoti
    const [formData, setFormData] = useState(InitialFormData)

    // variabile di stato per aggiungere un nuovo post all'array originale
    const [posts, setPosts] = useState([])  // array vuoto di default, che verrà riempito con il fetch dal server

    // variabile di stato per i post pubblicati 
    // const [publishedPosts, setPublishedPosts] = useState([])  // array vuoto di default, che verrà riempito con il fetch dal server

    // variabile di stato per i tags
    const [uniqueTags, setUniquetags] = useState([])

    // reagisco allo spuntare la checkbox del pubblicare un nuovo articolo su un oggetto di stato
    useEffect(() => {
        if (formData.published) {
            alert('l\'articolo verrà pubblicato')
        }
    }, [formData.published])

    // funzione per il fetch degli elementi dal server
    function fetchPosts() {
        axios.get(`${API_BASE_URI}posts`, {
            params:
                { limit: 10 },
        })
            .then(res => {
                setPosts(res.data.filter((post) => post.published))  // prendo tutti i dati e li metto nel setter dei post, filtrando i post per la proprietà published

                // setPublishedPosts(res.data.filter((post) => post.published))   // assegno al setter dei post pubblici i dati filtrati

                // all'arrivo dei dati controllo i tags dei post pubblicati
                const tags = []
                posts.forEach(post => {
                    post.tags.forEach(tag => {
                        if (!tags.includes(tag)) {
                            tags.push(tag)
                        }
                    })
                })
                // aggiorno la variabile di stato dei tags con i tags presi dalla res
                setUniquetags(tags)
            })
            .catch(err => {
                console.error(err)
            })
    }

    // faccio il Fetch con useEffect "a vuoto", così viene fatto solo una volta all'apertura della pagina
    useEffect(() => {
        fetchPosts()
    }, [])


    // funzione per gestire i campi del form
    function handleFormData(event) {
        const key = event.target.name  // elemento (dinamico) che genera l'input 
        // const value = event.target.value // valore (dinamico) inserito nel form

        // se l'elemento che da l'imput è di tipo checkbox, la imposto su checkata, altrimenti prendo il valore di testo inserito nel form
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value

        // nuovo oggetto che contiene i campi del form di partenza 
        // più gli imput dinamici del form
        const newFormData = {
            ...formData,
            [key]: value,   // key va nelle graffe altrimenti verrebbe interpretato come una propiretà di nome key
        }

        // cambio la variabile di stato che contiene i dati di default del form
        // con i nuovi dati presi in imput
        setFormData(newFormData)
    }

    // funzione di fetch per aggiungere il nuovo post (con le variabili di stato)
    function addNewPost(event) {        // disattivo la pagina che si aggiorna da sola
        event.preventDefault()

        if (formData.title.trim() === '' || formData.author.trim() === '' || formData.content.trim() === '') return

        const newPost = {       // nuovo oggetto post con i dati del form
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()) // splitto le stringhe  e trasformo i tags in array trimmato
        }

        console.log('Nuovo post:', newPost) // il nuovo post viene creato

        // faccio la chiamata per aggiungere e renderizzare il nuovo post
        axios.post(`${API_BASE_URI}posts`, newPost)
            .then(res => {
                console.log('Risposta API POST:', res.data) // i dati arrivano
                // metto il nuovo post arrivato con i dati nell'array principale (con solo i post pubblici)
                setPosts([...posts, res.data])

                console.log('Array con i nuovi post:', posts) // c'è il nuovo post 
                setFormData(InitialFormData)  // riavvio il form
            })
            .catch(err => {
                console.error(err)
            })
    }

    // funzione per cancellare i post
    function deletePost(id) {
        console.log(id)
        const confirmDelete = confirm('Sei sicuro di eliminare il post?')
        // if (confirmDelete === true) {...}
        confirmDelete && axios.delete(`${API_BASE_URI}posts/${id}`)
            .then((res) => {
                console.log('Post eliminato:', res.data)
                // setPost(prevPosts => prevPosts.filter(post => post.id !== id))
                fetchPosts()
            })
            .catch((err) => {
                console.error(err)
                alert('Non è stato possibile eliminare la risorsa selezionata.')
            })
    }

    return (
        <>
            <main>
                <section className='posts_section'>
                    <div className='container'>
                        <h3 className='form-title'>Crea un nuovo post</h3>
                        <form onSubmit={addNewPost} className='form'>
                            <div>
                                <label htmlFor="title">Titolo</label>
                                <input
                                    className='input'
                                    id='title'
                                    type="text"
                                    onChange={handleFormData}
                                    placeholder='Nuovo titolo'
                                    value={formData.title}
                                    name='title' />
                            </div>
                            <div>
                                <label htmlFor="author">Autore</label>
                                <input
                                    className='input'
                                    id='author'
                                    type="text"
                                    onChange={handleFormData}
                                    placeholder='Nome autore'
                                    value={formData.author}
                                    name='author' />
                            </div>
                            <div>
                                <label htmlFor="content">Contenuto</label>
                                <textarea
                                    className='input'
                                    id='content'
                                    onChange={handleFormData}
                                    placeholder='Inserisci il contenuto'
                                    value={formData.content}
                                    name='content' />
                            </div>
                            <div>
                                <label htmlFor="image">Path immagine</label>
                                <input
                                    id='image'
                                    className='input'
                                    type='text'
                                    onChange={handleFormData}
                                    placeholder='Inserisci il path immagine'
                                    value={formData.image}
                                    name='image' />
                            </div>
                            <div>
                                <label htmlFor="category">Categoria</label>
                                <select
                                    id='category'
                                    className='input select'
                                    value={formData.category}
                                    name='category'
                                    onChange={handleFormData}>
                                    <option value="">Seleziona una categoria</option>
                                    <option value='ricetta vegetariana'>Ricetta vegetariana</option>
                                    <option value='ricetta al forno'>Ricetta al forno</option>
                                    <option value='primo piatto'>Primo piatto</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="tags">Tags</label>
                                <input
                                    className='input'
                                    id='tags'
                                    type='text'
                                    name='tags'
                                    onChange={handleFormData}
                                    placeholder='Inserisci i tag separati da virgola'
                                    value={formData.tags} // Trasforma l'array di tag in una stringa
                                />
                            </div>
                            <div>
                                <label htmlFor="publish">Da pubblicare</label>
                                <input
                                    className='input checkbox'
                                    type="checkbox"
                                    name="published"
                                    id="publish"
                                    onChange={handleFormData}
                                    // per le checkbox si usa checked e non value
                                    checked={formData.published} />
                            </div>
                            <input className='input submit' type="submit" value='Aggiungi' />
                        </form>
                        <h1 className='page-title'>Il mio blog</h1>
                        <div className='tags_stripe'>
                            < Tags tags={uniqueTags} />
                        </div>
                    </div>
                    <div className='container'>
                        {posts.length ? ( // Se ci sono post
                            <div className="row">
                                {posts
                                    .map((post) =>
                                        <div key={post.id} className="col-6">
                                            <Card
                                                image={post.image}
                                                title={post.title}
                                                tags={post.tags}
                                                author={post.author}
                                                category={post.category}
                                                content={post.content}
                                                onDelete={() => deletePost(post.id)}
                                            />
                                        </div>
                                    )}
                            </div>
                        ) : (
                            <p>No posts available</p> // Se l'array `posts` è vuoto
                        )}
                    </div>
                </section>
            </main>
        </>
    )
}