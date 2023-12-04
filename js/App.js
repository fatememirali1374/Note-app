import NotesAPI from "./NotesAPI.js";
import NotesView from "./NotesView.js";

export default class App{
    constructor(root){
        this.notes=[];
        this.activeNote= null;
         this.view= new NotesView(root, this._handlers());
         this._refreshNotes();
    }
    _refreshNotes(){
        const notes=NotesAPI.getAllNotes();

        // set Notes:
        this._setNotes(notes);

        // set Active Note:
      if (notes.length>0) {
        this._setActiveNotes(notes[0])
      }

       
    }
    _setNotes(notes){
        this.notes=notes;
        this.view.updateNoteList(notes);
        this.view.updateNptePreviewVisibility(notes.length>0);
    }
    _setActiveNotes(note){
        this.activeNote=note;
        this.view.updateActiveNote(note)
    }
    _handlers(){
        return {
            onNoteAdd:()=>{
                const newNote={
                    title:"New Note",
                    body:"Take some note..."
                };
                NotesAPI.saveNote(newNote);
                this._refreshNotes();
            },
            onNoteEdit:(newTitle, newBody)=>{
                NotesAPI.saveNote({
                    id: this.activeNote.id,
                    title:newTitle,
                    body:newBody,
                })
                this._refreshNotes();
            },
            onNoteSelect:(noteId)=>{
                
                // select =>1. selected class add, title , body=> preview update
                // view.updateActiveNote(note)

                const selectedNote=this.notes.find((n)=>n.id==noteId);
                this._setActiveNotes(selectedNote);
            },
            onNoteDelete:(noteId)=> {
               NotesAPI.deleteNote(noteId);
               this._refreshNotes()
            }
        }
    }

}