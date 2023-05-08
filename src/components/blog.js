const Blog = ( { blog } ) => {

    return (
        <li>
            <b>Title</b> {blog.title} <br />
            <b>Author</b> {blog.author} <br />
            <b>Likes</b> {blog.likes} <br />
            <b>Url</b> {blog.url} <br />
        </li>
    )
}

export default Blog