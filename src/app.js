import { useState, useEffect } from 'react'

import FormLogin from './components/form-login'
import FormAddBlog from './components/form-add_blog'
import Blog from './components/blog'
import Notification from './components/notification'
import Footer from './components/footer'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [errorMessage, setErrorMessage] = useState( null )
    const [blogs, setBlogs] = useState( [] )
    const [newBlog, setNewBlog] = useState( {} )
    const [user, setUser] = useState( null )

    useEffect( () => {
        blogService
            .getAll()
            .then( initialBlogs => {
                setBlogs( initialBlogs )
            } )
    }, [] )

    const handleAddBlog = ( newBlog ) => {
        blogService
            .create( newBlog )
            .then( returnedBlog => {
                setBlogs( blogs.concat( returnedBlog ) )
                setNewBlog( {} )
            } )
            .catch( ( { response } ) => {
                setErrorMessage( response.statusText )
                setTimeout( () => {
                    setErrorMessage( null )
                }, 5000 )
            } )
    }

    const handleLogin = ( response ) => {
        loginService
            .login( response )
            .then( ( validUser ) => {
                setUser( validUser )
                blogService.setToken( validUser.token )
            } )
            .catch( ( { response } ) => {
                setErrorMessage( response.statusText )
                setTimeout( () => {
                    setErrorMessage( null )
                }, 5000 )
            } )
    }

    return (
        <div>
            {/* Header */}
            <h1>Blogs</h1>

            {/* Notifications if error succeeds */}
            <Notification message={errorMessage} />

            {/* Login */}
            {user === null
                ? <FormLogin setLogin={handleLogin} />
                : <>
                    <p>{user.name} logged-in</p>
                    <FormAddBlog
                        setBlog={handleAddBlog}
                        newBlog={newBlog}
                        setNewBlog={setNewBlog}
                        userId={user}
                    />
                </>
            }

            {/* Blogs list */}
            <ul>
                {blogs.map( blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                    />
                )}
            </ul>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default App
