import './Notification.css'

const Notification = ({ message: { status, message } }) => {
    if (status === '') {
        return null
    }

    return (
        <div className={status === 'error' ? 'error' : 'success'}>
            {message}
        </div>
    )
}

export default Notification