const addBtn = document.querySelector(".adder")
const saveBtn = document.querySelector(".saver")
const addBox = document.querySelector(".adderedbox")
const cardHolder = document.querySelector(".cardholder")
const initial = document.querySelector(".initial")
addBtn.addEventListener("click",()=>
{
    addBox.style.display ='flex'
    initial.style.display = 'none'
})
function deleted(nameToDelete, urlToDelete) {
    const bookmarks = JSON.parse(localStorage.getItem('bookmark')) || []
    const updated = bookmarks.filter(
        ({name , url}) => !(name === nameToDelete && url === urlToDelete)
    )
    localStorage.setItem('bookmark' , JSON.stringify(updated))
    if (updated.length === 0) {
        initial.style.display = 'flex'
    }
    
    loading()
}
function loading() {
    const bookmarks = JSON.parse(localStorage.getItem('bookmark')) || [];
    cardHolder.innerHTML = ''
    initial.style.display = bookmarks.length > 0 ? 'none' : 'flex'
    bookmarks.forEach(({ name, url }) => createCard(name, url));
}

saveBtn.addEventListener("click",()=>{
    const url = document.getElementById('url').value.trim()
    const name = document.getElementById('linkname').value.trim()
    if(!url || !name)
    {
        alert('Both fields are required!')
        document.getElementById('url').value= ''
    document.getElementById('linkname').value= ''
    addBox.style.display = 'none'
        return;
    }

    const newBookmark = {name , url}
    const bookmarks = JSON.parse(localStorage.getItem('bookmark')) || [];
    bookmarks.push(newBookmark)
    localStorage.setItem('bookmark', JSON.stringify(bookmarks))
    createCard(name , url)
    document.getElementById('url').value= ''
    document.getElementById('linkname').value= ''
    addBox.style.display = 'none'
})

function createCard(name , url) {
    const domain = new URL(url).hostname
    const favicon =`https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    const card = document.createElement('div')
    card.className = ` card flex column align justify`
    card.innerHTML = `
    <img src="${favicon}" alt="Favicon of ${name}">
    <div class="flex align jcentre gap">
        <a href="${url}" target="_blank">${name}</a>
        <button class="delete-btn">🗑️</button>
    </div>
`;
            card.querySelector('.delete-btn').addEventListener('click',()=>{
                deleted(name,url)
            })
    cardHolder.appendChild(card)
}

window.addEventListener('DOMContentLoaded',loading)