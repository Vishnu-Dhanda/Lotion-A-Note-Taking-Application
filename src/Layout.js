import NoteItem from "./NoteItem.js";
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Layout() {
  const [notesObjects, setNotes]= useState(JSON.parse(localStorage.getItem("localNotes")) || []);

  useEffect(() => {
    localStorage.setItem("localNotes", JSON.stringify(notesObjects));
    if (notesObjects.length !== 0) {
      var NoNotes = document.getElementsByClassName("noNotes");
      NoNotes[0].style.display = "none";
    }
  }, [notesObjects]);

  const navigate = useNavigate();

  function toggleSidebar() {
    document.querySelector(".sideBar").classList.toggle("sideBarHidden");
    if (notesObjects.length > 0) {
      document.querySelector(".test").classList.toggle("testExpanded");
    }
  }

  function addNote() {
    var newdata = { ID: uuidv4(), Title: "Untitled", noteContent: "", notePreview: "...", Date: "" };
    setNotes([newdata, ...notesObjects]);
    navigate(`/EditNote/${newdata.ID}`, { replace: true }); 
  }

 

  return (
    <>
      <div className="main">
        <nav>
          <button className="sideBarToggle" onClick={toggleSidebar}>&#9776;</button>
          <div className="titleContainer">
            <div className="lotionTitle">Lotion</div>
            <h5>Like Notion, But Worse</h5>
          </div>
          <div></div>
        </nav>

        <div className="mainContent">
          <div className="sideBar">
            <div className="sideBarHeader">
              <div className="notesTitle">Notes</div>
              <button className="addButton" onClick={addNote}>&#43;</button>
            </div>
            
            <div className="notes">
              <div className="noNotes" id="noNotes">
                <div></div>
                <div>No Notes Here</div>
                <div></div>
              </div>
              
              {notesObjects.map(note => (
                <NavLink key={note.ID} to={'/ViewNote/' + note.ID}>
                  <NoteItem ID={note.ID} Title={note.Title} Note={note.noteContent} NotePreview={note.notePreview} noteDate={note.Date} />
                </NavLink>
              ))}
            
            </div>
            <div></div>
          </div>
         
          <Outlet context={[notesObjects, setNotes]} />
        </div>
      </div>
    </>
  )
}

export default Layout;
