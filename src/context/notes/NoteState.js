import React, { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
  const host = "https://inotebookbackend-07co.onrender.com";
    // const stateValue = {
    //     "name" : "demo",
    // }
    // const [state, setState] = useState(stateValue);
    // const update = () => {
    //     setTimeout(() => {
    //         setState({
    //             "name" : "Demo2"
    //         })
    //     }, 2000)
    // }
    const notesInitial = [
          {
            "_id": "66c5e60b5f0cf2568cc57dd1",
            "user": "66b3714ae7bc18ec5a4deadb",
            "title": "Demo6Note",
            "description": "demo6note@gmail.com",
            "tag": "personal",
            "date": "2024-08-21T13:05:15.025Z",
            "__v": 0
          },
          {
            "_id": "66c5e6225f0cf2568cc57dd4",
            "user": "66b3714ae7bc18ec5a4deadb",
            "title": "Demo5Note",
            "description": "demo5note@gmail.com",
            "tag": "personal",
            "date": "2024-08-21T13:05:38.451Z",
            "__v": 0
          }
        ]
      const [notes, setNotes] = useState(notesInitial);

      //Add note
      const getNotes = async () => {
        let url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
          method: "GET",
          headers: {'Content-Type': 'application/json',
            "token": localStorage.getItem('token')
          }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json)
      }
      //Add note
      const addNote = async (title, description, tag) => {
        let url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
          method: "POST",
          headers: {'Content-Type': 'application/json',
            "token": localStorage.getItem('token')
          },

          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        console.log(json)
        // let note = {
        //   "_id": "66c5e6225f0cf2568cc57dd2",
        //   "user": "66b3714ae7bc18ec5a4deadb",
        //   "title": title,
        //   "description": description,
        //   "tag": tag,
        //   "date": "2024-08-21T13:05:38.451Z",
        //   "__v": 0
        // };
        setNotes(notes.concat(json.newNote))
      }
      //Edit Note
      const editNote = async (id, title, description, tag) => {
        let url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
          method: "PUT",
          headers: {'Content-Type': 'application/json',
            "token": localStorage.getItem('token')
          },

          body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes))
        for(let i = 0; i < newNotes.length; i++){
          if(newNotes[i]._id === id){
            newNotes[i].title = title;
            newNotes[i].description = description;
            newNotes[i].tag = tag;
            break
          }
        }
        setNotes(newNotes)
      }
      //Delete Note
      const deleteNote = async (id) => {
        let url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
          method: "DELETE",
          headers: {'Content-Type': 'application/json',
            "token": localStorage.getItem('token')
          }
        });
        const json = response.json();
        let newNotes = notes.filter((note) => {return note._id !== id})
        setNotes(newNotes)
      }
    return(
        // <NoteContext.Provider value={{state, update}}>
        //     {props.children}
        // </NoteContext.Provider>

        <NoteContext.Provider value={{notes, getNotes, addNote, editNote, deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;