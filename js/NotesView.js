export default class NotesView {
constructor(root, handlers){
this.root=root;
const {onNoteAdd, onNoteEdit}=handlers;
this.onNoteAdd=onNoteAdd;
this.onNoteEdit=onNoteEdit;

this.root.innerHTML=`
<div class="notes__sidebar">
<div class="notes__logo">NOTE APP</div>
<ul class="notes__list">
</ul>
<button class="notes__add">ADD NOTES</button>
</div>
<div class="notes__preview">
<input type="text" class="notes__title" placeholder="note title..." />
<textarea name="" class="notes__body">Take some note...</textarea>
</div>
`

const addNoteBtn= this.root.querySelector(".notes__add");
const inputTitle= this.root.querySelector(".notes__title");
const inputBody= this.root.querySelector(".notes__body");
addNoteBtn.addEventListener("click", ()=>{
this.onNoteAdd()
});
[inputBody,inputTitle].forEach(inputField => {
    inputField.addEventListener("blur",()=>{
        const newBody= inputBody.value.trim();
        const newTitle= inputTitle.value.trim();
        this.onNoteEdit(newTitle, newBody)
    })
});
}
}