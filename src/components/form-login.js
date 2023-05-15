import { useState } from 'react'
import PropTypes from 'prop-types'

const FormLogin = ( { setLogin } ) => {
    const [username, setUsername] = useState( '' )
    const [password, setPassword] = useState( '' )

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
                        id='username'
                        name='username'
                        type='text'
                        value={username}
                        onChange={( { target } ) => setUsername( target.value )}
                    />
                </label>
                <label htmlFor='password'>
                    <span>password</span>
                    <input
                        id='password'
                        name='password'
                        type='password'
                        value={password}
                        onChange={( { target } ) => setPassword( target.value )}
                    />
                </label>
                <button
                    id='button-submit'
                    type='submit'
                >
                    login
                </button>
            </fieldset>
        </form>
    )
}

FormLogin.propTypes = {
    setLogin: PropTypes.func.isRequired
}

export default FormLogin