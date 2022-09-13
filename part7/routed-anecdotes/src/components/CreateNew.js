import { useField } from "../hooks/index";

const CreateNew = (props) => {
  const { reset: resetContent, ...content } = useField("text");
  const { reset: resetAuthor, ...author } = useField("text");
  const { reset: resetInfo, ...info } = useField("text");

  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    resetContent();
    resetAuthor();
    resetInfo();
  };

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form>
        <div>
          content:
          <input label="content" {...content} />
        </div>
        <div>
          author:
          <input label="author" {...author} />
        </div>
        <div>
          url:
          <input label="info" {...info} />
        </div>
        <div>
          <button variant="contained" color="primary" onClick={handleSubmit}>
            create
          </button>
          <button variant="contained" color="error" onClick={handleReset}>
            reset
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateNew;