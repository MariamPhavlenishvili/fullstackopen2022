import './Notification.css'

const Notification = ({ message: { status, message } }) => {
    if (message === null) {
        return null
    }

    return (
        <div className={status === 'error' ? 'error' : 'success'}>
            {message}
        </div>
    )
}

export default Notification