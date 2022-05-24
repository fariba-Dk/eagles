import { useState } from "react";

const Form = (props) => {
    const [golfer, setGolfer] = useState({
        first: "",
        last: ""
    });

    //create functions that handle the event of the user typing into the form
    const handleNameChange = (event) => {
        const first = event.target.value;
        setGolfer((golfer) => ({ ...golfer, first }));

    }

    const handlelastChange = (event) => {
        const last = event.target.value;
        setGolfer((golfer) => ({ ...golfer,
         }));

    }

    //A function to handle the post request
    const postGolfer = (newGolfer) => {
        return fetch('http://localhost:5000/api/Golfers', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newGolfer)
      }).then((response) => {
          return response.json()
      }).then((data) => {
        console.log("From the post ", data);
        props.addGolfer(data);

    });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postGolfer(golfer);

    };

    return (
        <form onSubmit={handleSubmit}>
            <fieldset>
                <label>First Name</label>
                <input
                    type="text"
                    id="add-user-name"
                    placeholder="First Name"
                    required
                    value={golfer.name}
                    onChange={handleNameChange}

                />
                <label>Last Name</label>
                <input
                    type="text"
                    id="add-user-last"
                    placeholder="Last Name"
                    required
                    value={golfer.last}
                    onChange={handlelastChange}
                />
            </fieldset>
            <button type="submit">Add</button>
        </form>
    );
};

export default Form;
