import React, { useContext, useEffect , useState} from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';
// import {useNavigate} from 'react-router-dom'

const Notes = (props) => {
  const context = useContext(noteContext);
  // let navigate  = useNavigate();
  const { notes, getNote, editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }
    // else{
    //   navigate("/")
    // }
    
    // eslint-disable-next-line
  }, [])
  // const ref = useRef(null)
  const [note, setNote] = useState({id: "", etitle: "", edescription: "" , etag: ""})

    const updateNote = (currentNote) => {

      setNote({id: currentNote._id ,etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})
      
    }
  const handleClick = (e)=>{
      editNote(note.id, note.etitle, note.edescription, note.etag)
      props.showAlert("Updated successfully!", "success");
  }
  const onChange = (e)=>{
      setNote({...note, [e.target.name]: e.target.value})
  }


  return (
    <>
      <AddNote showAlert={props.showAlert} />
      <button type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title " id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label"  >Title</label>
                  <input  type="text" className="form-control" id="etitle" name="etitle" value={note.etitle}  aria-describedby="emailHelp" onChange={onChange} minLength={5} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input value={note.edescription} type="text" className="form-control" id="edescription" name="edescription" onChange={onChange} minLength={5} required  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input value={note.etag} type="text" className="form-control" id="etag" name="etag" onChange={onChange} />
                </div>


              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" data-bs-dismiss="modal"  className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your notes</h2>
        <div className="container mx-2">
          {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return <Noteitem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
        })}
      </div>
    </>
  )
}

export default Notes
// import React, { useState } from 'react'
// //import {useNavigate} from 'react-router-dom'

// const Login = () => {
//   const [credentials, setCredentials] = useState({ email: "", password: "" })
//   // let navigate  = useNavigate();
//   // eslint-disable-next-line
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const response = await fetch("http://localhost:3000/api/auth/login", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ email: credentials.email, password: credentials.password })

//     });
//     // eslint-disable-next-line
//    const json = await response.json()
//     //  if(json.success){
//     //   //Save the auth token and redirect
//     //   localStorage.setItem('token', json.authtoken);
//     //   navigate ("/");
//     // }
//     //  else{
//     //  alert("Invalid Credientials");
//     // }
//   }
//   const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value })
//   }
//   return (
//     <div>
//       <form onSubmit={handleSubmit} >
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email address</label>
//           <input onChange={onChange} value={credentials.email} type="email" className="form-control" id="email" nmae="email" aria-describedby="emailHelp" />
//           <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input onChange={onChange} value={credentials.password} type="password" className="form-control" id="password" name="password" />
//         </div>

//         <button type="submit" className="btn btn-primary">Submit</button>
//       </form>
//     </div>
//   )
// }

// export default Login
