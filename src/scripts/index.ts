import '../style.css'

//constants.
const titleDiv = document.getElementById('title',) as HTMLInputElement | null;
const contentDiv = document.getElementById('content') as HTMLInputElement | null;
const dueDateDiv = document.getElementById('due') as HTMLDataElement | null;
const colorDiv = document.getElementById('mySelect') as HTMLDataElement
const notes = document.getElementById('notesDiv') as HTMLDataElement | null;
let noteIdDiv = document.getElementById('count') as HTMLDataElement;
const deleteAllButton = document.getElementById('deleteAll') as HTMLButtonElement
noteIdDiv.textContent = localStorage.getItem('amount')



if (localStorage.getItem('myNotes') !== null) {
   var getData = JSON.parse(localStorage.getItem('myNotes') as string);
   console.log(getData);

   //appending elements to notesDiv
   for (let i = 0; i < getData.length; i++) {
      const notes11 = document.createElement('div');
      const content1 = document.createElement('p');
      const title1 = document.createElement('p');
      const dueTime1 = document.createElement('p');
      const curTime1 = document.createElement('p');
      const deleteBtn = document.createElement('button');


      getData[i].dueDate = getData[i].dueDate.split('-').reverse().join('-');


      title1.textContent = getData[i].title;
      title1.className = 'titleFont';
      content1.textContent = getData[i].content;
      content1.style.wordBreak = 'break-word';
      content1.className = 'contentFont';
      dueTime1.textContent = `Due to: ${getData[i].dueDate}`;
      curTime1.textContent = `Created on: ${getData[i].curDate}`;
      deleteBtn.textContent = 'delete';
      deleteBtn.className = 'deleteButton'
      deleteBtn.id = getData[i].id
      deleteBtn.addEventListener('click', () => {
         var getData = JSON.parse(localStorage.getItem('myNotes') as string);
         for (let i = 0; i < getData.length; i++) {
            if (getData[i].id.toString() == deleteBtn.id.toString()) {
               console.log(getData)
               getData.splice(i, 1);
               console.log(getData);

               //update myNotes in localstorage
               localStorage.setItem('myNotes', JSON.stringify(getData));
               //get myNotes to here
               var getData = JSON.parse(localStorage.getItem('myNotes') as string);

               //updating the countDiv and the ('amount) in localStorage
               let noteIdDiv = document.getElementById('count') as HTMLDataElement;
               noteIdDiv.textContent = localStorage.getItem('amount')
               let sum = Number(noteIdDiv.textContent) - 1
               localStorage.setItem('amount', JSON.stringify(sum))
               noteIdDiv.textContent = localStorage.getItem('amount')

               const target = document.getElementsByClassName('note')
               target[i].remove()
               console.log(notes)

               localStorage.removeItem(`note${getData[i].id}`);
               break;
            }
         }
      })

      notes11?.appendChild(title1)
      notes11?.appendChild(content1)
      notes11?.appendChild(dueTime1)
      notes11?.appendChild(curTime1)
      notes11.appendChild(deleteBtn)
      notes?.appendChild(notes11)
      notes11.style.backgroundColor = getData[i].color
      notes11.className = 'note'
   }
}

//sort by a-z
const button1: HTMLElement | null = document.getElementById('sort');
var reverse = false;
button1?.addEventListener('click', () => {
   var getData = JSON.parse(localStorage.getItem('myNotes') as string);
   console.log(getData);
   getData.sort(function (a: { title: string; }, b: { title: string; }) {

      const textA = a.title.toLowerCase();
      const textB = b.title.toLowerCase();
      if (!reverse) {
         //a-z
         return textA < textB ? -1 : textA > textB ? 1 : 0;
      } if (reverse) {
         //z-a
         return textA > textB ? -1 : textA < textB ? 1 : 0;
      }

   });
   reverse = !reverse ? true : false;
   var parent = document.getElementById('notesDiv') as HTMLElement;
   parent.innerHTML = "";
   for (let i = 0; i < getData.length; i++) {
      const notes11 = document.createElement('div');
      const content1 = document.createElement('p');
      const title1 = document.createElement('p');
      const dueTime1 = document.createElement('p');
      const curTime1 = document.createElement('p');
      const deleteBtn2 = document.createElement('button');

      getData[i].dueDate = getData[i].dueDate.split('-').reverse().join('-');


      title1.textContent = getData[i].title;
      title1.className = 'titleFont'

      content1.textContent = getData[i].content;
      content1.style.wordBreak = 'break-word'
      content1.className = 'contentFont';

      dueTime1.textContent = `Due to: ${getData[i].dueDate}`;
      curTime1.textContent = `Created on: ${getData[i].curDate}`;
      deleteBtn2.textContent = 'delete';
      deleteBtn2.className = 'deleteButton'
      deleteBtn2.id = getData[i].id;

      localStorage.setItem('myNotes', JSON.stringify(getData))
      getData = JSON.parse(localStorage.getItem('myNotes') as string);

      deleteBtn2.addEventListener('click', () => {
         getData = JSON.parse(localStorage.getItem('myNotes') as string);
         for (let i = 0; i < getData.length; i++) {
            if (getData[i].id.toString() == deleteBtn2.id.toString()) {
               console.log(getData)
               getData.splice(i, 1);
               console.log(getData);

               //update myNotes in localstorage
               localStorage.setItem('myNotes', JSON.stringify(getData));
               //get myNotes to here
               var getData = JSON.parse(localStorage.getItem('myNotes') as string);

               //updating the countDiv and the ('amount) in localStorage
               let noteIdDiv = document.getElementById('count') as HTMLDataElement;
               noteIdDiv.textContent = localStorage.getItem('amount')
               let sum = Number(noteIdDiv.textContent) - 1
               localStorage.setItem('amount', JSON.stringify(sum))
               noteIdDiv.textContent = localStorage.getItem('amount')

               const target = document.getElementsByClassName('note')
               console.log(target[i])
               target[i].remove()
               console.log(notes)

               localStorage.removeItem(`note${deleteBtn2.id}`);
               break;
            }
         }
      })

      notes11?.appendChild(title1)
      notes11?.appendChild(content1)
      notes11?.appendChild(dueTime1)
      notes11?.appendChild(curTime1)
      notes11.appendChild(deleteBtn2)
      notes?.appendChild(notes11)
      notes11.style.backgroundColor = getData[i].color
      notes11.className = 'note'
   }
});

console.log("hello world!");
//note class
class Notes {
   public title: string
   public content: string
   public dueDate: string
   public curDate: string
   public color: string
   public id: number
   constructor(title: string, content: string, dueDate: string, curDate: string, color: string, id: number) {
      this.title = title;
      this.content = content;
      this.dueDate = dueDate;
      this.curDate = curDate
      this.color = color;
      this.id = id
   }
}

//button create note event listener
const button = document.getElementById('create');
button?.addEventListener('click', function handleClick() {

   let maxId = 0;
   if (localStorage.getItem('myNotes') !== null) {
      var getData5 = JSON.parse(localStorage.getItem('myNotes') as string);

      getData5.forEach((element: { id: number; }) => {
         if (element.id > maxId) {
            maxId = element.id
         }
      })
      console.log(maxId)
   }

   if (titleDiv?.value != null && contentDiv?.value != null && dueDateDiv?.value != null) {

      let pickedDateStr = dueDateDiv.value;
      let pickedDate = new Date(Date.parse(pickedDateStr.replace(/-/g, " ")));
      console.log(pickedDate)
      if (pickedDate < new Date()) {
         alert('invalid date come on')
         // const pop: HTMLElement | null = document.getElementById('popUp');
         // if (pop) {
         //    pop.style.backgroundColor = 'lightgreen';
         //    pop.style.display = 'block';
         //    pop.style.color='black'
         //    pop.innerHTML='invalid date!';
         // }

         // setTimeout(function () {
         //    if(pop) pop.style.display = 'none';
         //   }, 3000)
         dueDateDiv.value = "";
         return
      }

      //value to count id of note
      let value = localStorage.getItem('amount')
      noteIdDiv.textContent = (Number(value) + 1).toString()
      //creating the note object
      const yes = new Notes(titleDiv?.value, contentDiv?.value, dueDateDiv.value, new Date().toLocaleString(), colorDiv.value, maxId + 1);
      // console.log(yes); notes1.style.backgroundColor = yes.color

      //saving each note as a single object to local storage with amount count
      localStorage.setItem(`note${Number(yes.id)}`, JSON.stringify(yes));
      let start = 0
      if (localStorage.getItem('myNotes') == null) {
         start++;
         localStorage.setItem('amount', JSON.stringify(start))

      } else if (localStorage.getItem('myNotes') !== null) {
         let getData6 = JSON.parse(localStorage.getItem('myNotes') as string);
         console.log(getData6)
         console.log(getData6.length)
         localStorage.setItem('amount', JSON.stringify(Number(getData6.length) + 1))
      }

      //adding each note to list of notes and save to local storage and retrieve
      if (localStorage.getItem('myNotes') == null) {
         localStorage.setItem('myNotes', '[]')
      }
      var old_Data = JSON.parse(localStorage.getItem('myNotes') as string);
      old_Data.push(yes);
      localStorage.setItem('myNotes', JSON.stringify(old_Data));
      console.log(Array.isArray(old_Data))//return true if its type of array

      //append the new note to div element ('#notesDiv')
      const notes1 = document.createElement('div');
      const content = document.createElement('p');
      const title = document.createElement('p');
      const dueTime = document.createElement('p');
      const curTime = document.createElement('p');
      const deleteBtn: HTMLButtonElement = document.createElement('button');

      yes.dueDate = yes.dueDate.split('-').reverse().join('-');
      //yes.curDate=new Date().toLocaleString('en-US',{timeZone:'Asia/Israel'})
      //console.log(yes.curDate)

      title.textContent = yes.title;
      title.className = 'titleFont'

      content.textContent = yes.content;
      content.style.wordBreak = 'break-word'
      content.className = 'contentFont';

      dueTime.textContent = `Due to: ${yes.dueDate}`;
      curTime.textContent = `Created on: ${new Date().toLocaleString()}`;
      deleteBtn.textContent = 'delete';
      deleteBtn.className = 'deleteButton';
      deleteBtn.id = yes.id.toString();
      deleteBtn.addEventListener('click', () => {
         var getData = JSON.parse(localStorage.getItem('myNotes') as string);
         for (let i = 0; i < getData.length; i++) {
            if (getData[i].id.toString() == yes.id.toString()) {
               //removing the object from the getData array of objects
               console.log(getData)
               getData.splice(i, 1);
               console.log(getData);

               //update myNotes in localStorage
               localStorage.setItem('myNotes', JSON.stringify(getData));
               //get myNotes to here
               var getData = JSON.parse(localStorage.getItem('myNotes') as string);

               //updating the countDiv and ('amount') in localStorage
               let noteIdDiv = document.getElementById('count') as HTMLDataElement;
               // noteIdDiv.textContent = localStorage.getItem('amount')
               let sum = Number(noteIdDiv.textContent) - 1
               localStorage.setItem('amount', JSON.stringify(sum))
               noteIdDiv.textContent = localStorage.getItem('amount')

               const target = document.getElementsByClassName('note')
               target[i].remove()
               console.log(notes)

               localStorage.removeItem(`note${yes.id}`);

               break;
            }
         }
      })

      //append the child to the parent element
      notes1?.appendChild(title)
      notes1?.appendChild(content)
      notes1?.appendChild(dueTime)
      notes1?.appendChild(curTime)
      notes1?.appendChild(deleteBtn)
      notes?.appendChild(notes1)
      notes1.style.backgroundColor = yes.color
      notes1.className = 'note'
      notes1.style.border = 'groove'

      // var retrieveData=localStorage.getItem(key);
      //   if(retrieveData){
      //    const items=JSON.parse(retrieveData);
      //    console.log(items);
      //   }

      titleDiv.value = "";
      contentDiv.value = "";
      dueDateDiv.value = "";

   }
})

deleteAllButton.addEventListener('click', () => {
   if (confirm("Are you sure you want to delete all notes?") == true) {

      var parent = document.getElementById('notesDiv') as HTMLElement;
      parent.innerHTML = "";
      noteIdDiv.textContent = ""

      localStorage.clear();
   }
})

window.addEventListener('storage', function () {
   if (localStorage.getItem('myNotes') == null) {
      var parent2 = document.getElementById('notesDiv') as HTMLElement;
      parent2.innerHTML = "";
      noteIdDiv.textContent = ""
   }
})

window.onscroll = function () {
   myFixedFunction();
}

var navbar = document.getElementById('navbar');
var sticky = navbar?.offsetTop;
function myFixedFunction() {
   if (sticky) {
      if (window.pageYOffset >= sticky) {
         navbar?.classList.add('sticky')

      } else {
         navbar?.classList.remove('sticky')
      }
   }
}








