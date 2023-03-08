import React from "react";
import {useOutletContext, useParams, Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function ViewNote(){
  
    const {id} = useParams();
    const [notesObjects, setNotes] = useOutletContext();
    const navigate = useNavigate(); // hook to use navigation

    
    const note = notesObjects.find(note => note.ID === id);
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

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
    };
    
    const formatDate = (when) => {
        const formatted = new Date(when).toLocaleString("en-US", options);
        if (formatted === "Invalid Date") {
            return "";
        }
        return formatted;
    };

    return(
        <div className="test">
            <div className="editingHeader">
                <div className='div1'>
                    <div className="viewingHeaderTitle">{note.Title}</div>
                    <div className="viewingHeaderDate">{formatDate(note.Date)}</div>
                </div>

                <div className='div2'>
                    <Link key={note.ID} to={'/EditNote/'+note.ID} >
                        <button className="viewingHeaderSave editButton">Edit</button>
                    </Link>
                    <button className="editingHeaderDelete editButton" onClick={handleDelete}>Delete</button>
                </div>
            </div>
            <div className="content" dangerouslySetInnerHTML={{ __html: note.noteContent }}></div>
        </div>
    )
}

export default ViewNote;
