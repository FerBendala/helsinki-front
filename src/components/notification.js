const Notification = ( { message, classname } ) => {
    if ( message === null ) {
        return null
    }

    return (
        <div className={`notification ${classname}`}>
            {message}
        </div>
    )
}

export default Notification