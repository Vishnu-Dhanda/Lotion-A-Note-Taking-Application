import NoteItem from "./NoteItem"
export default function sidebar(){

    return(
        <div className="sideBar">
            <div className="sideBarHeader">
                <div className="notesTitle">Notes</div>
                <button className="addButton">&#43;</button>
            </div>
            <div className="notes">
            

            <NoteItem/>
            </div>
            <div></div>
        </div>
    )
}

