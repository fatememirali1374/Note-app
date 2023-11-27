const notes=[
    {
        id:1,
        title:"first note",
        body: "some dummy text first",
        updated:"2022-10-13T17:03:57.556Z"
    },
    {
        id:2,
        title:"second note",
        body: "some dummy text second",
        updated:"2022-12-10T17:03:57.411Z"
    },
    {
        id:3,
        title:"Third note",
        body: "some dummy text Third",
        updated:"2020-12-10T17:03:57.411Z"
    }
];

class NotesAPI{
    static getAllNotes(){
const savedNotes= JSON.parse(localStorage.getItem("notes-app"))||[];
return savedNotes.sort((a,b)=>{
    return new Date(a.updated)> new Date(b.updated)?-1:1;
})
    }
   static saveNote(noteToSave){
    // 1.existed or 2.not
    const notes=NotesAPI.getAllNotes();
const existedNote= notes.find((n)=>n.id==noteToSave.id)
if(existedNote){
existedNote.updated=new Date().toISOString();
existedNote.title=noteToSave.title;
existedNote.body=noteToSave.body;
}
else{
noteToSave.id= new Date().getTime();
noteToSave.updated=new Date().toISOString();
notes.push(noteToSave) 
}
localStorage.setItem("notes-app", JSON.stringify(notes))
   }
    static deleteNote(id){
        const notes= NotesAPI.getAllNotes();
        const filteredNotes= notes.filter(n=>n.id!=id)
        localStorage.setItem("notes-app", JSON.stringify(filteredNotes))
    }
}

console.log(NotesAPI.deleteNote(3));