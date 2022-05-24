import { useState, useEffect } from "react";
import Form from "../Form";

function Golfers() {

    const [Golfers, setGolfers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/Golfers")
        .then((response) => response.json())
        .then(Golfers =>{
            //setGolfers((Golfers[3]));
            //console.log("Testing", typeof Golfers);
            for (let index in Golfers){
               if( index !== "3"){
                   setGolfers(Golfers);
               }
            };
        })

    }, []);



    const addStudent = (newStudent) => {
        //console.log(newStudent);
        //postStudent(newStudent);
        setGolfers((Golfers) => [...Golfers, newStudent]);
    }


    return (
      <div className="Golfers">
        <h2> List of Golfers </h2>
        <ul>
            {Golfers.map(student =>
                <li key={student.id}> {student.firstname} {student.lastname}</li>)}
        </ul>
        <Form addStudent={addStudent} />
      </div>
    );
  }

  export default Golfers;
