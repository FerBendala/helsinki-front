const FormAddBlog = ( { setBlog, newBlog, setNewBlog, userId } ) => {
    const formData = [
        { id: 'title', type: 'text', name: 'Title' },
        { id: 'author', type: 'text', name: 'Author' },
        { id: 'url', type: 'url', name: 'Url' },
        { id: 'likes', type: 'number', name: 'Likes' },
    ]
    
    const handleInputChange = ( { target } ) => {
        setNewBlog( {
            ...newBlog,
            [target.id]: target.value
        } )
    }

    const handleSetBlog = async ( event ) => {
        event.preventDefault()
        setBlog( newBlog )
    }

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
                                value={newBlog[id]}
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