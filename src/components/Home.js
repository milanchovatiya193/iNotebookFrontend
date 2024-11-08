import React, {useContext} from 'react'
//import NoteContext from '../context/notes/NoteContext'
import Notes from './Notes';

export default function Home(props) {
  const {showAlert} = props
  return (
    <>
      <div className='container my-3'>
        <Notes showAlert={showAlert}/>
      </div>
    </>
  )
}
