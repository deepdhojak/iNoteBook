import noteContext from "./noteContext";
import {useState} from "react";

const NoteState = (props)=>{
  const host ="http://localhost:3000"
  const notesInitial = [
  
  ]
  const [notes, setNotes] =useState(notesInitial)

  //Get all Notes
  const getNote = async ()=>{
    // TODO: API Call
     // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json' ,
        "auth-token":  localStorage.getItem('token')
      }
        });
        // const json= await response.json();
        // setNotes(json)

}

  //Add a Note
  const addNote = async (id,title, description, tag)=>{
        // TODO: API Call
         
                   // eslint-disable-next-line
 const response = await fetch(`${host}/api/notes/addnote`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json' ,
            "auth-token":  localStorage.getItem('token')
          },
          body: JSON.stringify ({id,title,description,tag})
        });
        const note = 
          {"_id": id,
          "user": "6131dc5e3e4037cd4734a066",
           "title": title, 
           "description": description,
            "tag":tag,
            "date": "2021-09-03T14:20:09.668Z",
            "__v": 0
          }     

    setNotes(notes.concat(note))
  }
  //Delete a Note
  const deleteNote = async(id)=>{
    // TODO: API Call
     // eslint-disable-next-line
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json' ,
        "auth-token":  localStorage.getItem('token')
      },
    });
    // eslint-disable-next-line
      // const json= response.json();

    const newNotes = notes.filter((note)=>{return note._id !==id})
    setNotes(newNotes)

  }

  //Edit a Note
  const editNote = async(id, title, description, tag)=>{
    //API Call
      
       // eslint-disable-next-line
 const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json' ,
        "auth-token":  localStorage.getItem('token')
      },
      body: JSON.stringify ({id,title,description,tag})
    });
   /////// const json = await response.json();
      let newNotes = JSON.parse(JSON.stringify(notes))
    //Logic to edit in client
    for(let index=0;index<newNotes.length;index++){
      const element = newNotes[index];
      if(element._id === id){
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
    }
    setNotes(newNotes);
  }

  return (
      <noteContext.Provider value={{notes, addNote,deleteNote,editNote,getNote}}>
          {props.children}
      </noteContext.Provider>
  )
}

export default NoteState;
