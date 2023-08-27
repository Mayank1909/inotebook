import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    // const host = "http://localhost:5000"
    const notesInitial = [
        {
            "_id": "64de836e2483fe23c6532019",
            "user": "64dbefebbf3b4d94202d32fe",
            "title": "My title",
            "description": "Hello this is mayank",
            "tag": "perosonal",
            "date": "2023-08-17T20:30:38.674Z",
            "__v": 0
        },
        {
            "_id": "64e12ce974ebb6236e85621e",
            "user": "64dbefebbf3b4d94202d32fe",
            "title": "new note 2",
            "description": "My anme is mayank from CU ",
            "tag": "perosonal",
            "date": "2023-08-19T20:58:17.369Z",
            "__v": 0
        },
        {
            "_id": "64e12ce974ebb6236e85621e",
            "user": "64dbefebbf3b4d94202d32fe",
            "title": "new note 2",
            "description": "My anme is mayank from CU ",
            "tag": "perosonal",
            "date": "2023-08-19T20:58:17.369Z",
            "__v": 0
        },
        {
            "_id": "64e12ce974ebb6236e85621e",
            "user": "64dbefebbf3b4d94202d32fe",
            "title": "new note 2",
            "description": "My anme is mayank from CU ",
            "tag": "perosonal",
            "date": "2023-08-19T20:58:17.369Z",
            "__v": 0
        }
    ]
    const [notes, setNotes] = useState(notesInitial)

    //Addnotes
    // const addNote = async (title, description, tag) => {
    //     const response = await fetch(`${host}/api/notes/addnote`, {
    //         method: 'POST',
    //         header: {
    //             'content-Type': 'application/json',
    //             'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYmVmZWJiZjNiNGQ5NDIwMmQzMmZlIn0sImlhdCI6MTY5MjIxMzE1OH0.J0-fqkHl02T84hbdlvEBuQ5yLiDYlc9Jlg_A0_gbtOU"
    //         },
    //         body: JSON.strigify({ title, description, tag })
    //     });
    //     console.log("Adding a new note")

    //     const note = {
    //         "_id": {
    //             "$oid": "64e12ce974ebb6236e85621e"
    //         },
    //         "user": {
    //             "$oid": "64dbefebbf3b4d94202d32fe"
    //         },
    //         "title": "new note 2",
    //         "description": "My anme is mayank from CU ",
    //         "tag": "perosonal",
    //         "date": {
    //             "$date": "2023-08-19T20:58:17.369Z"
    //         },
    //         "__v": 0
    //     };
    //     setNotes(notes.concat(note))
    // }

    // // delete anote
    // const deleteNote = (id) => {
    //     // todo Api call
    //     console.log("Deleting a note with id" + id);
    //     const newNotes = notes.filter((note) => { return note._id != id })
    //     setNotes(newNotes)
    // }
    // // edit a note
    // const editNote = async (id, titlte, description, tag) => {
    //     const response = await fetch(`${host}/api/notes/updatenote/64e11adde13d4fa5c3744f08`, {
    //         method: 'POST',
    //         header: {
    //             'content-Type': 'application/json',
    //             'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjRkYmVmZWJiZjNiNGQ5NDIwMmQzMmZlIn0sImlhdCI6MTY5MjIxMzE1OH0.J0-fqkHl02T84hbdlvEBuQ5yLiDYlc9Jlg_A0_gbtOU"
    //         },
    //         body: JSON.strigify({ title, description, tag })
    //     });
    //     const json = response.json();
    // }
    // // lofic to edit in client

    // for (let index = 0; index < notes.length; index++) {
    //     const element = notes[index];
    //     if (element._id === id) {
    //         element._id = title;
    //         element.description = description;
    //         element.tag = tag;
    //     }
    // }

    return (
        <NoteContext.Provider value={{ notes, setNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState