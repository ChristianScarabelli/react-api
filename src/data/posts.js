/**
 * Alcuni post dovranno rimanere senza immagine, quindi avere la proprietà image = undefined
 */
import htmlSrc from '../assets/Img/html_post.png'
import cssSrc from '../assets/Img/css_post.png'
import jsSrc from '../assets/Img/js_post.png'
import phpSrc from '../assets/Img/php_post.jpg'


export const posts = [
	{
		id: 1,
		title: 'Titolo del Post',
		image: htmlSrc,
		author: 'Lorem',
		category: 'Videogame',
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
		tags: ['html', 'css'],
		published: true,
	},
	{
		id: 2,
		title: 'Titolo del Post',
		image: cssSrc,
		author: 'Lorem',
		category: 'Cinema',
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
		tags: ['js', 'css'],
		published: true,
	},
	{
		id: 3,
		title: 'Titolo del Post',
		author: 'Lorem',
		category: 'Informatica',
		image: undefined,
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
		tags: ['js', 'php'],
		published: true,
	},
	{
		id: 4,
		title: 'Titolo del Post',
		author: 'Lorem',
		category: 'Videogame',
		image: phpSrc,
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit animi unde quasi enim non esse ratione voluptas voluptate, officiis veritatis magni blanditiis possimus nobis cum id inventore corporis deserunt hic.',
		tags: ['html'],
		published: false,
	},
]
