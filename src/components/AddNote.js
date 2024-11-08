import React, {useContext, useState} from 'react'
import NoteContext from '../context/notes/NoteContext'

export default function AddNote(props) {
    const context = useContext(NoteContext);
  const {addNote} = context;

  const [note, setNote] = useState({title: "", description: "", tag: ""});

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({title: "", description: "", tag: ""});
    props.showAlert("Added Successfully", "success");
  }
  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }
  return (
    <>
      <div className="container my-3">
        <h2>Add a Note</h2>
        <div className="container my-3">
        <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" name='title' id="title" aria-describedby="titleHelp" onChange={onChange} minLength={5}
                    required value={note.title}/>
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">Descriprion</label>
    <input type="text" className="form-control" name="description" id="description" onChange={onChange} minLength={5}
                    required value={note.description}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" name="tag" id="tag" onChange={onChange} value={note.tag}/>
  </div>
  <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
</form>
</div>
</div>
    </>
  )
}
