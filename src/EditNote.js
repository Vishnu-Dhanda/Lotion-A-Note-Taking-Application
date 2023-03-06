import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React, { useState } from 'react';
import {useOutletContext, useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function EditNote(){
    const [notesObjects, setNotes] = useOutletContext();
    const {id} = useParams();
    const note = notesObjects.find(note => note.ID === id);
    const [value, setValue] = useState(note.noteContent); 
    const [date, setDate] = useState(note.Date)
    const [title, setTitle] = useState(note.Title); 
    
    
    const navigate = useNavigate(); // add this hook to use navigation

    
     if (!note) {
         return <div className="noNoteFound">Note not found</div>;
    }
    
    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this note?")) {
          const updatedNotes = notesObjects.filter(note => note.ID !== id);
          setNotes(updatedNotes);
      
      
          if (updatedNotes.length > 0) {
            navigate(`/ViewNote/${updatedNotes[0].ID}`, { replace: true }); 
          }
          if (updatedNotes.length === 0) {
            navigate(`/`, { replace: true });
          }
        }
      };

      const handleSave = () => {
        const note = notesObjects.find(note => note.ID === id);
        note.noteContent = value
        note.Title = title
        note.notePreview = value
        console.log(date)
        note.Date = date
        console.log(note.date)
        console.log(note)
        localStorage.setItem('localNotes', JSON.stringify(notesObjects)); // update notes in local storage
        navigate(`/ViewNote/${note.ID}`, { replace: true });
        console.log(notesObjects)
      }

    return(
        
        <div className="test">
            {/* editing section */}

            
                <div className="editingHeader">
                    <div className='div1'>
                      
                        <input className="editingHeaderTitle" type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
                        <input className="editingHeaderDate" type="datetime-local" onChange={(e) => setDate(e.target.value)} value={date}/> 
                    </div>
                    <div className='div2'>
                        <button className="editingHeaderSave editButton" onClick={handleSave}>Save</button>
                        <button className="editingHeaderDelete editButton" onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                    {/* reactquill section */}  
                    
                    <ReactQuill theme="snow" value={value} onChange={setValue}  defaultValue={note.noteContent} />
                    
        </div>
        
    )
}

