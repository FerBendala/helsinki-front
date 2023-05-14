import { useState } from 'react'
import Togglable from './togglable'

const Blog = ( { blog, updateBlog, removeBlog } ) => {
    const [disabled, setDisabled] = useState( false )

    const handleLikes = () => {
        const newLike = blog.likes + 1
        setDisabled( true )
        updateBlog( {
            ...blog, likes: newLike
        } )
    }

    const handleRemoveBlog = () => {
        removeBlog( blog )
    }

    return (
        <li>
            <h3>{blog.title}</h3>
            <Togglable buttonLabel='view'>
                <p>
                    <a
                        href={blog.url}
                        target='_blank'
                        rel="noreferrer"
                    >{blog.author}</a>
                </p>
                <button
                    onClick={handleLikes}
                    disabled={disabled}
                >
                    Likes: {blog.likes}
                </button>
                <button
                    onClick={handleRemoveBlog}
                >
                    Remove
                </button>
            </Togglable>
        </li>
    )
}

export default Blog