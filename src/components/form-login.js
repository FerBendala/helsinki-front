import { useState } from 'react'
import PropTypes from 'prop-types'

const FormLogin = ( { setLogin } ) => {
    const [username, setUsername] = useState( 'ferbendala' )
    const [password, setPassword] = useState( 'fernandobendala1990' )

    const handleLogin = ( event ) => {
        event.preventDefault()
        setLogin( { username, password } )
    }

    return (
        <form onSubmit={handleLogin}>
            <fieldset>
                <legend>Login</legend>
                <label htmlFor='username'>
                    <span>username</span>
                    <input
                        type='text'
                        value={username}
                        name='username'
                        onChange={( { target } ) => setUsername( target.value )}
                    />
                </label>
                <label htmlFor='password'>
                    <span>password</span>
                    <input
                        type='password'
                        value={password}
                        name='password'
                        onChange={( { target } ) => setPassword( target.value )}
                    />
                </label>
                <button type='submit'>login</button>
            </fieldset>
        </form>
    )
}

FormLogin.propTypes = {
    setLogin: PropTypes.func.isRequired
}

export default FormLogin