const PersonForm = ({
    data: { addName, userInput, setUserInput }
}) => {
    return (
        <form onSubmit={addName}>
            <div>
                name:
                <input
                    onChange={(event) => setUserInput({
                        ...userInput,
                        newName: event.target.value,
                    })}
                    autoFocus
                    name="name"
                />
            </div>
            <div>
                number:
                <input
                    name="number"
                    onChange={(event) => setUserInput({
                        ...userInput,
                        newNumber: event.target.value,
                    })}
                />
            </div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    )
}

export default PersonForm