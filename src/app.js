import { useState, useEffect } from 'react'

import FormLogin from './components/form-login'
import FormAddBlog from './components/form-add_blog'
import Blog from './components/blog'
import Notification from './components/notification'
import Footer from './components/footer'
import Toggable from './components/toggable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [alertMessage, setAlertMessage] = useState( null )
    const [alertClassName, setAlertClassName] = useState( null )
    const [blogs, setBlogs] = useState( [] )
    const [newBlog, setNewBlog] = useState( {} )
    const [user, setUser] = useState( null )


    // blogs-app api call
    useEffect( () => {
        blogService
            .getAll()
            .then( initialBlogs => {
                setBlogs( initialBlogs )
            } )
    }, [] )

    // save logged user into localstorage
    useEffect( () => {
        const loggedUser = window.localStorage.getItem( 'User' )
        if ( loggedUser ) {
            const user = JSON.parse( loggedUser )
            setUser( user )
            blogService.setToken( user.token )
        }
    }, [] )

    const handleAddBlog = ( newBlog ) => {
        blogService
            .create( newBlog )
            .then( returnedBlog => {
                setBlogs( blogs.concat( returnedBlog ) )

                setAlertMessage( `a new blog ${returnedBlog.title} by ${returnedBlog.author} added.` )
                setAlertClassName( 'success' )
            } )
            .catch( () => {
                setAlertMessage( 'There was an error creating your blog' )
                setAlertClassName( 'error' )
            } )
            .finally( () => {
                setTimeout( () => {
                    setAlertMessage( null )
                }, 5000 )
            } )
    }

    const handleLogin = ( response ) => {
        loginService
            .login( response )
            .then( ( validUser ) => {
                setUser( validUser )
                window.localStorage.setItem( 'User', JSON.stringify( validUser ) )

                // Set the token for the user to be able to manage their own posts
                blogService.setToken( validUser.token )

                // hello user
                setAlertMessage( `Hello ${validUser.username}! Nice to have you here` )
                setAlertClassName( 'success' )
            } )
            .catch( ( { response } ) => {
                setAlertMessage( 'Wrong username or password' )
                setAlertClassName( 'error' )
            } )
            .finally( () => {
                setTimeout( () => {
                    setAlertMessage( null )
                }, 5000 )
            } )
    }

    const handleLogout = () => {
        window.localStorage.removeItem( 'User' )
        window.location.reload()
    }

    return (
        <div>
            {/* Header */}
            <h1>Blogs</h1>

            {/* Notifications if error succeeds */}
            <Notification message={alertMessage} classname={alertClassName} />

            {/* Login */}
            {user === null &&
                <Toggable buttonLabel='login'>
                    <FormLogin setLogin={handleLogin} />
                </Toggable>
            }
            {user !== null && <>
                <p>
                    <span>{user.name} logged-in </span>
                    <button onClick={handleLogout}>Logout</button>
                </p>
                <Toggable buttonLabel='new blog'>
                    <FormAddBlog
                        addBlog={handleAddBlog}
                        newBlog={newBlog}
                    />
                </Toggable>
            </>}

            <br />
            <br />

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
