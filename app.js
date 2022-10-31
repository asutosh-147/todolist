const addf = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");
const addtodo = (val,id) => {
    const todo = `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-id=${id}>
    <span>${val.twork}</span>
    <i class="far fa-trash-alt delete"></i>
    </li>
    `;
    list.innerHTML += todo;
};
const deletetodo=(id)=>{
    const todos=document.querySelectorAll('li');
    todos.forEach((todo)=>{
        if(todo.getAttribute('data-id')===`${id}`){
            todo.remove();
        }
    })
};
addf.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = e.target.add.value.trim();
    if (val) {
        const ob={
            twork:val
        };
        db.collection('todo').add(ob).then(()=>{
            console.log(`added ${val}`);
        }).catch(err=>{
            console.log(err);
        });
        addf.reset();
    }
});

list.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
        //e.target.parentElement.remove();
        const id=e.target.parentElement.getAttribute('data-id');
        console.log(id);
        db.collection('todo').doc(id).delete().then(()=>{
            console.log('removed');
        }).catch((err)=>{
            console.log(err);
        })
    }
});

//filter todos
const filt = (term) => {
    Array.from(list.children)
    .filter( todo=> !todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.add('filtered'));
    
    Array.from(list.children)
    .filter( todo=> todo.textContent.toLowerCase().includes(term))
    .forEach(todo => todo.classList.remove('filtered'));
};

search.addEventListener("keyup", (e) => {
    const x=search.value.trim().toLowerCase();
    filt(x);
});
//get data
db.collection('todo').onSnapshot(snapshot=>{
    snapshot.docChanges().forEach(change=>{
        const doc=change.doc;
        const id=doc.id;
        if(change.type==="added"){
            addtodo(doc.data(),id);
        }
        if(change.type==="removed"){
            deletetodo(id);
        }
    })
})