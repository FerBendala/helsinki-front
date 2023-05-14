import { useState, useEffect, useRef } from 'react'

import FormLogin from './components/form-login'
import FormAddBlog from './components/form-add_blog'
import Blog from './components/blog'
import Alert from './components/alert'
import Footer from './components/footer'
import Togglable from './components/togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [alertMessage, setAlertMessage] = useState( null )
    const [alertClassName, setAlertClassName] = useState( null )
    const [blogs, setBlogs] = useState( [] )
    const [user, setUser] = useState( null )

    const blogFormRef = useRef()

    const sortedBlogs = blogs.sort( ( a, b ) => b.likes - a.likes )


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

    const alert = ( { text, classname } ) => {
        setAlertMessage( text )
        setAlertClassName( classname )
        setTimeout( () => {
            setAlertMessage( null )
        }, 5000 )
    }

    const login = ( user ) => {
        loginService
            .login( user )
            .then( validUser => {
                // Set user session
                setUser( validUser )
                window.localStorage.setItem( 'User', JSON.stringify( validUser ) )

                // Set the token for the user to be able to manage their own posts
                blogService.setToken( validUser.token )
                alert( {
                    text: `Hello ${validUser.username}! Nice to have you here`,
                    classname: 'success'
                } )
            } )
            .catch( () => {
                alert( {
                    text: 'Wrong username or password',
                    classname: 'error'
                } )
            } )
    }

    const createBlog = ( newBlog ) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create( newBlog )
            .then( returnedBlog => {
                setBlogs( blogs.concat( returnedBlog ) )
                alert( {
                    text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added.`,
                    classname: 'success'
                } )
            } )
            .catch( () => {
                alert( {
                    text: 'There was an error creating your blog.',
                    classname: 'error'
                } )
            } )
    }

    const updateBlog = ( updatedBlog ) => {
        const { id, user } = updatedBlog

        blogService
            .update( id, updatedBlog, user.id )
            .then( returnedBlog => {
                setBlogs( prevBlogs =>
                    prevBlogs.map( ( blog ) =>
                        blog.id === returnedBlog.id ? returnedBlog : blog
                    )
                )
                alert( {
                    text: `${returnedBlog.title} by ${returnedBlog.author} updated.`,
                    classname: 'success'
                } )
            } )
            .catch( () => {
                alert( {
                    text: 'There was an error updating your blog.',
                    classname: 'error'
                } )
            } )
    }

    const removeBlog = ( removedBlog ) => {
        const { id, title, author, user } = removedBlog
        const userId = user.id === undefined
            ? user
            : user.id

        if ( window.confirm( `Remove blog ${title} by ${author}` ) ) {
            blogService
                .remove( id, userId )
                .then( () => {
                    const { id } = removedBlog
                    const filteredBlogs = blogs.filter( blog => blog.id !== id && blog )

                    setBlogs( filteredBlogs )
                    alert( {
                        text: 'The blog was removed.',
                        classname: 'success'
                    } )
                } )
                .catch( () => {
                    alert( {
                        text: 'There was an error removing your blog.',
                        classname: 'error'
                    } )
                } )
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem( 'User' )
        window.location.reload()
    }


    return (
        <div>
            {/* Header */}
            <h1>Blogs</h1>

            {/* Alert if error succeeds */}
            <Alert
                message={alertMessage}
                classname={alertClassName}
            />

            {/* Login */}
            {user === null &&
                <Togglable buttonLabel='login'>
                    <FormLogin setLogin={login} />
                </Togglable>
            }
            {user !== null && <>
                <p>
                    <span>{user.name} logged-in </span>
                    <button onClick={handleLogout}>Logout</button>
                </p>
                <Togglable
                    buttonLabel='new blog'
                    ref={blogFormRef}
                >
                    <FormAddBlog createBlog={createBlog} />
                </Togglable>
            </>}

            {/* Sorted blogs list */}
            <ul>
                {sortedBlogs.map( blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        updateBlog={updateBlog}
                        removeBlog={removeBlog}
                    />
                )}
            </ul>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default App
