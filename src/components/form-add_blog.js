import { useState } from 'react'

const FormAddBlog = ( { addBlog, newBlog } ) => {
    const [value, setValue] = useState( {} )
    const formData = [
        { id: 'title', type: 'text', name: 'Title' },
        { id: 'author', type: 'text', name: 'Author' },
        { id: 'url', type: 'url', name: 'Url' },
        { id: 'likes', type: 'number', name: 'Likes' },
    ]

    const handleInputChange = ( { target } ) => {
        setValue( {
            ...newBlog,
            [target.id]: target.value
        } )
    }

    const handleSetBlog = async ( event ) => {
        event.preventDefault()
        addBlog( newBlog )
        setValue( {} )
    }
    console.log( newBlog )
    return (
        <form onSubmit={handleSetBlog}>
            <fieldset>
                <legend>Add new blog</legend>
                {
                    formData.map( ( { id, type, name } ) =>
                        <label
                            key={id}
                            htmlFor={id}
                        >
                            <span>{name}</span>
                            <input
                                id={id}
                                type={type}
                                value={value[id]}
                                onChange={handleInputChange}
                            />
                        </label>
                    )
                }
                <button type='submit'>save</button>
            </fieldset>
        </form>
    )
}

export default FormAddBlog