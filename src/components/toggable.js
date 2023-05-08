import { useState } from 'react'

const Toggable = ( { children, buttonLabel } ) => {
    const [visible, setVisible] = useState( false )

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    return (
        <>
            <div style={hideWhenVisible}>
                <button
                    type='button'
                    onClick={() => setVisible( true )}
                >
                    {buttonLabel}
                </button>
            </div>
            <div style={showWhenVisible}>
                {children}
                <button
                    type='button'
                    onClick={() => setVisible( false )}
                >
                    cancel
                </button>
            </div>
        </>
    )
}

export default Toggable