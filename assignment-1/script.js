const saveToStore=(data)=>{
  localStorage.setItem('books',JSON.stringify(data));
}
const getFromStore=()=>{
  return JSON.parse(localStorage.getItem('books'));
}
const showBookFromStore=()=>{
    let dataList= getFromStore();
    let bodyRef = document.querySelector("#dgv").getElementsByTagName('tbody')[0];
  bodyRef.innerHTML=`
        <tr>
          <th style="width:45%">Name</th>
          <th style="width:20%">Author</th>
          <th style="width:20%">Topic</th>
          <th style="width:15%">Action</th>
        </tr>`;
  dataList.forEach((book)=>{
    bodyRef.innerHTML+=`
    <tr id=${book.Id}>
      <td id=book${book.Id}name>${book.Name}</td>
      <td>${book.Author}</td>
      <td>${book.Topic}</td>
      <td><a class="btnDelete" href="#" onclick="openDelDialog(event)">Delete</td>
    </tr>`;
  })
}
const showBookFromList=(dataList)=>{
    let bodyRef = document.querySelector("#dgv").getElementsByTagName('tbody')[0];
  bodyRef.innerHTML=`
        <tr>
          <th style="width:45%">Name</th>
          <th style="width:20%">Author</th>
          <th style="width:20%">Topic</th>
          <th style="width:15%">Action</th>
        </tr>`;
  dataList.forEach((book)=>{
    bodyRef.innerHTML+=`
    <tr id=${book.Id}>
      <td id="book${book.Id}name">${book.Name}</td>
      <td>${book.Author}</td>
      <td>${book.Topic}</td>
      <td><a class="btnDelete" id=${book.Id} href="#" onclick="openDelDialog(event)">Delete</td>
    </tr>`;
  })
}
const initData=()=>{
let dummy=[
    {
      Id: 0,
      Name: "Doraemon",
      Author: "Fujiko Fujio",
      Topic: "Comic"
    },
    {
      Id: 1,
      Name: "Refactoring",
      Author: "Martin Fowler",
      Topic: "Programming"
    },
  {
    Id: 2,
    Name: "To Kill a Mockingbird",
    Author: "Harper Lee",
    Topic: "Fiction"
  },
  {
    Id: 3,
    Name: "1984",
    Author: "George Orwell",
    Topic: "Dystopian"
  },
  {
    Id: 4,
    Name: "Pride and Prejudice",
    Author: "Jane Austen",
    Topic: "Romance"
  },
  {
    Id: 5,
    Name: "The Great Gatsby",
    Author: "F. Scott Fitzgerald",
    Topic: "Classics"
  },
  ];
  let books= getFromStore();
  if(books === null || books.length===0){
    saveToStore(dummy);
    showBookFromList(dummy);
  }
  else{
    showBookFromStore();
  }
  
  
}

const txtSearch_onChange=()=>{
  const txtSearch = document.querySelector('#txtSearch');
  let data=getFromStore();
  data = data.filter((book)=> book.Name.toLowerCase().includes(txtSearch.value));
  showBookFromList(data);
}
const indexingList=(data)=>{
  let i=0;
  data.forEach(book=>book.Id=i++);
}
const delBook=(e, Id)=>{
let data = getFromStore();
data.splice(Id,1);
indexingList(data);
saveToStore(data);
data = data.filter((book)=> book.Name.toLowerCase().includes(txtSearch.value));
closeDialog(e,e.currentTarget.id);
showBookFromList(data);
/*if(isSearching)showBookFromList(searchList);
else
showBookFromList(data);*/
}
const openDelDialog=(e)=>{
  e.preventDefault();
  const tr=e.target.parentElement.parentElement;
  const bookName= document.getElementById(`book${tr.id}name`).innerText;
  document.body.insertAdjacentHTML("afterend",`
  <coverLayout id="deleteDialog" style="display: block;background-color: rgba(0,0,0, 0.4);transition: all 0.1s ease-out;opacity: 0;position: fixed;z-index: 1;width: 100%;height: 100vh;top: 0;left:0;" onclick="closeDialog(event)">
    <deleteDialog style="display: block;width: 358px;height: 208px;margin: 17% auto;background-color: whitesmoke;border: 1px solid black;border-radius: 10px;">
      <dialogTitle style="display: block;">
        <h1 style="font-size: 20px; text-align: center; margin-top: 5%;">DELETE BOOK</h1>
      </dialogTitle>
<dialogmsg style="display: block;width: 325px;">
        <p style="text-align: center;font-size: x-large;margin-top: 5%;margin-left: 10%;">Do you want to delete <b>${bookName}</b> book?</p>
      </dialogmsg>
<dialogaction style="display: flex;margin-top: 33px;">
        <div id="btnCancelDel" class="btnCancel" style="text-align: center;width: 150px;height: 36px;padding-top: 2%;margin-left: 15px;border: 1px solid;border-radius: 10px;" onclick="closeDialog(event)">Cancel</div>
        <div id="btnConfirmDel" style="text-align: center;width: 150px;height: 36px;padding-top: 2%;margin-left: 28px;border-radius: 10px;" class="btnRed" onclick="delBook(event, ${tr.id})">Delete</div>
      </dialogaction>
    </deleteDialog>
  </coverLayout>`);
  const dialog = document.querySelector('#deleteDialog');
  dialog.style.opacity=1;
}
const openAddDialog=(e)=>{
    e.preventDefault();
  document.body.insertAdjacentHTML("afterend",`
  <coverLayout id="newBookialog" style="display: block;background-color: rgba(0,0,0, 0.4);transition: all 0.1s ease-out;opacity: 0;position: fixed;z-index: 1;width: 100%;height: 100vh;top: 0;left:0;" onclick="closeDialog(event)">
    <newBookDialog style="display: block;width: 358px;height: 360px;margin: 17% auto;background-color: whitesmoke;border: 1px solid black;border-radius: 10px;">
        <h1 style="font-size: 20px; text-align: center; margin-top: 5%;">NEW BOOK</h1>
      </dialogTitle>
<dialogBody style="display: block;width: 325px;">
        <nameinput style="display: flex;flex-flow: column;margin-top: 5%;margin-left: 10%;">
          <span>Name:</span>
          <input id="txtBookName" title="Name" placeholder="Book Name" type="text" style="margin-top: 2%;height: 36px;border-radius: 10px;border: 1px black solid;">
        </nameinput>
      <authorinput style="display: flex;flex-flow: column;margin-top: 5%;margin-left: 10%;">
          <span>Author:</span>
          <input id="txtAuthor" title="Author" placeholder="Author Name" type="text" style="margin-top: 2%;height: 36px;border-radius: 10px;border: 1px black solid;">
        </authorinput><topicinput style="display: flex;flex-flow: column;margin-top: 5%;margin-left: 10%;">
          <span>Topic:</span>
          <select id="cbbTopic" style="height:36px; margin-top: 2%;border-radius: 10px;">
            <option value="Comic">Comic</option>
            <option value="Programming">Programming</option>
            <option value="Fiction">Fiction</option>
            <option value="Classic">Classic</option>
          </select>
        </topicinput>
</dialogBody>
      <dialogaction style="display: flex;margin-top: 33px;">
        <div id="btnCancelAdd" class="btnCancel" style="text-align: center;width: 150px;height: 36px;padding-top: 2%;margin-left: 15px;border: 1px solid;border-radius: 10px;" onclick="closeDialog(event)">Cancel</div>
        <div id="btnConfirmDel" style="text-align: center;width: 150px;height: 36px;padding-top: 2%;margin-left: 28px;border-radius: 10px;" class="btnRed" onclick="addBook()">Add Book</div>
      </dialogaction>
    </deleteDialog>
  </coverLayout>`);
  const dialog = document.querySelector('#newBookialog');
  dialog.style.opacity=1;
}
const closeDialog=(e)=>{
  const controls=[
                  'deleteDialog',
                  'btnConfirmDel',
                  'btnCancelDel', 
                  'newBookialog',
                  'btnCancelAdd'
                 ];
  if(controls.includes(e.target.id))
  {
    const sender = document.getElementById(e.currentTarget.id);
    sender.style.opacity=0;
    const delay= setTimeout(()=>{
    sender.remove();
    clearTimeout(delay);
    },100);
  }
}
const addBook=()=>{
  const txtBookName= document.querySelector("#txtBookName");
  const txtAuthorName= document.querySelector("#txtAuthor");
  const cbbTopic= document.querySelector("#cbbTopic");
  let books = getFromStore();
  const newBook={
    Id: books.length+1,
    Name: txtBookName.value,
    Author: txtAuthorName.value,
    Topic: cbbTopic.value
  }
  books.push(newBook);
  saveToStore(books);
  const txtSearch = document.querySelector('#txtSearch');
  books = books.filter((book)=> book.Name.toLowerCase().includes(txtSearch.value));
  document.querySelector('#txtSearch').value= txtSearch.value;
  showBookFromList(books);
}
initData();