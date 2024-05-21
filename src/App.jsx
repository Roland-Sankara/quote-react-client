import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let [text, setText] = useState("");
  let [author, setAuthor] = useState("");

  function handleChange(eventObject, stateUpdateFunction) {
    let inputValue = eventObject.target.value;
    stateUpdateFunction(inputValue);
  }

  function createQuote(event) {
    event.preventDefault();

    if (text && author) {
      let apiUrl = "https://quote-strapi-api.onrender.com/api/quotes";

      let requestObject = {
        method: "POST",
        body: JSON.stringify({
          data: {
            text: text,
            author: +author
          },
        }),
        headers: {
          "Content-Type": "application/json",
        },
      };

      console.log(requestObject);

      fetch(apiUrl, requestObject)
        .then((response) => {
          console.log(response)
          if(response.ok == true){
            return response.json();
          }else{
            throw new Error(response.statusText)
          }
        })
        .then((data) => {
          if (data) {
            setAuthor("");
            setText("");

            toast("Quote Successfully Created..");
          } else {
            toast("Failed to Post Quote");
          }
        })
        .catch((error)=>{
          toast(`Failed to Post: ${error}`)
        })
    } else {
      alert("Quote Text or Quote Author is missing!!");
    }
  }

  return (
    <div>
      <h1>Quote Display</h1>

      <form>
        <div>
          <label htmlFor="quote-text">Text</label>
          <br />
          <input
            type="text"
            id="quote-text"
            value={text}
            onChange={(event) => {
              handleChange(event, setText);
            }}
          />
        </div>

        <div>
          <label htmlFor="author">Author</label>
          <br />
          <input
            type="number"
            id="author"
            value={author}
            onChange={(event) => {
              handleChange(event, setAuthor);
            }}
          />
        </div>

        <button
          onClick={(event) => {
            createQuote(event);
          }}
        >
          Create
        </button>
      </form>

      <ToastContainer />
    </div>
  );
}

export default App;
