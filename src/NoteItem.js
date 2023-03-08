

export default function NoteItem({ className, ID, Title, Note, NotePreview, noteDate}) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };
  

  const previewLength = 180; // Choose a number of characters to display for the preview

  const formatDate = (when) => {
    const formatted = new Date(when).toLocaleString("en-US", options);
    if (formatted === "Invalid Date") {
      return "";
    }
    return formatted;
  };

  const formattedDate = noteDate ? formatDate(noteDate) : "";

  let preview = Note.substring(0, previewLength); // Extract the first 450 characters from the Note string

  if (Note.length > previewLength || Note.length === 0) {
    preview += "..."; // Add "..." at the end if the Note string has more than 450 characters
  }

  return (
    <div className={className}>
      <div className="noteHeading">{Title}</div>
      <div className="noteDate">{formattedDate}</div>
      <div
        className="notePreview"
        dangerouslySetInnerHTML={{ __html: preview}}
      ></div>
    </div>
  );
}
