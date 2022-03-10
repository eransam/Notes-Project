// הכנסת פתק חדש לסטורג'
function addNoteToStorage() {
  event.preventDefault()
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const timeInput = document.getElementById("timeInput");

    //ולידציה - מילוי משימה ותאריך 
  if (taskInput.value.length === 0 && dateInput.value.length === 0) {
    alert ("Plese determain your task and dead-line");
    return;
  }
  if (taskInput.value.length === 0) {
    alert ("Plese determain your task");
    return;
  }
  if (dateInput.value.length === 0) {
    alert ("Plese determain your dead-line");
    return;
  }
  
  // יצירת אובייקט
  let newNote = {
    text: taskInput.value,
    date: dateInput.value,
    time: timeInput.value
  };

  // הכנסה לזיכרון
  const savedNotesArrayJson = localStorage.getItem("stored-notes");
  let notesArray = savedNotesArrayJson === null ? [] : JSON.parse(savedNotesArrayJson);
  notesArray.push(newNote);

  const notesArrayJson = JSON.stringify(notesArray);
  localStorage.setItem("stored-notes", notesArrayJson);

  // הדפסה
  const timeOfNote = "first";
  printNote(taskInput.value, dateInput.value, timeInput.value, notesArray.length, timeOfNote)
  reloadTimer()
}

// יצירת פתק
function printNote(taskInput, dateInput, timeInput, placeInArry, timeOfNote) {
  const notesDiv = document.getElementById ("notesDiv");
  
  // יצירת אלמנטים בפתק
  let outterNoteDiv = document.createElement("DIV");
  notesDiv.appendChild(outterNoteDiv);
  if (timeOfNote === "first") {
    outterNoteDiv.classList = "outterNoteDiv col-6 col-md-3 col-lg-2 fade-in";
 } 
 else{
  outterNoteDiv.classList = "outterNoteDiv col-6 col-md-3 col-lg-2";
 }
      let noteDiv = document.createElement("DIV");
      outterNoteDiv.appendChild(noteDiv);
      noteDiv.classList = "noteDiv";

          let textAndBtnDiv = document.createElement("DIV");
          textAndBtnDiv.classList = "textAndBtnDiv";
          noteDiv.appendChild(textAndBtnDiv);

              let taskTextArea = document.createElement("TEXTAREA");
              taskTextArea.classList = "taskTextArea bg-transparent border-0";
              textAndBtnDiv.appendChild(taskTextArea);

              let closeBtn = document.createElement("BUTTON");
              closeBtn.classList = "btn-close hide ";
              closeBtn.type = "button";
              closeBtn.ariaLabel="Close";
              textAndBtnDiv.appendChild(closeBtn);

          let deadlineP = document.createElement("P");
          deadlineP.classList = "deadlineP";
          noteDiv.appendChild(deadlineP);
  
  // הכנסת טקסט לפתק
  taskTextArea.innerText = taskInput;
  deadlineP.innerText = `${dateInput}
  ${timeInput}`;
  
  // כפתור מחיקה
  closeBtn.addEventListener('click',function(){
    noteDiv.remove();
    deleateNoteFromStorge(placeInArry)})
  }
  
  // העלאת פתקים מהסטורג'
  function printStoredNotes() {
    const savedNotesArrayJson = localStorage.getItem("stored-notes");
    if (savedNotesArrayJson === null) {
      return;
  }
  else{
    const notesArray = JSON.parse(savedNotesArrayJson)
    // הדפסת פתקים
    for (let i = 0; i < notesArray.length; i++) {
      printNote(notesArray[i].text, notesArray[i].date, notesArray[i].time, i)       
    }
  }
}

// מחיקה מהסטורג'
function deleateNoteFromStorge(placeInArry) {
  const savedNotesArrayJson = localStorage.getItem("stored-notes");
  const notesArray = JSON.parse(savedNotesArrayJson);
  
  notesArray.splice (placeInArry, 1);
  
  const notesArrayJson = JSON.stringify(notesArray);
  localStorage.setItem("stored-notes", notesArrayJson);
  location.reload()
}

// רענון לדף
function reloadTimer() {
  setTimeout(function () {
    location.reload()
  }, 2500);
}
