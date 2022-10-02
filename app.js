const addf = document.querySelector(".add");
const list = document.querySelector(".todos");
const search = document.querySelector(".search input");
const addtodo = (val) => {
  const todo = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${val}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
     `;
  list.innerHTML += todo;
};

addf.addEventListener("submit", (e) => {
  e.preventDefault();
  const val = e.target.add.value.trim();
  if (val) {
    addtodo(val);
    addf.reset();
  }
});

list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
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
