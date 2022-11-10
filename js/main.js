

let alterTag = document.querySelector(".alter");
let inputTag = document.querySelector(".input");
let addTag = document.querySelector(".add");
let tasksTag = document.querySelector(".tasks");
let infoTag = document.querySelector(".info");



// ========================================================================
let allTask = [];
console.log(allTask);

if (window.localStorage.getItem("tasks")) {
    allTask = JSON.parse(window.localStorage.getItem("tasks"));
}
// ========================================================================


// ========================================================================
addTag.addEventListener("click", function() {
    if (inputTag.value != "") {
        saveTask(inputTag.value);
        inputTag.value = "";
    } else {
        alterTag.innerHTML = "الحقل فارغ يرجى اضافة مهمة";
        setTimeout( () => alterTag.innerHTML = "" , 1000)
    }
})
// ========================================================================




// ========================================================================
// click on task element 
tasksTag.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        removeTaskLocal(e.target.parentElement.getAttribute("data-id"));
        e.target.parentElement.remove();
    }
    if (e.target.classList.contains("task")) {
        changeStatues(e.target.id);
        e.target.classList.toggle("done");
    }
})

function saveTask(value) {    
    const theTask = {
        id : Date.now(),
        title : value,
        statues: false,
    }
    allTask.push(theTask);  // save in arr
    addDataLocal(allTask); // save in local storage
    addDataPage(allTask); // add in page
}
// ========================================================================



// ========================================================================
function addDataLocal(data) { // the data become is arr
    window.localStorage.setItem("tasks", JSON.stringify(data));
}
// ========================================================================





// ========================================================================
function addDataPage(tasks) {
    tasksTag.innerHTML = "";
    let numberTask = tasks.length;
    infoTag.innerHTML = numberTask;

    // loop on every task are there in arr allTaskArr
    tasks.forEach(t => {   // t = else from task
        // create main div => .task
        let taskDiv = document.createElement("div");
            taskDiv.classList.add("task")
        // check if task is done
        t.statues ? taskDiv.classList.add("done") : taskDiv.classList.add("un-done");
            taskDiv.id = t.id;
            taskDiv.setAttribute("data-id", t.id);

        // create delete button
        let delBtn = document.createElement("span");
            delBtn.appendChild(document.createTextNode("delete"));
            delBtn.className = "del";

        // create delete done
        let doneBtn = document.createElement("span");
            doneBtn.appendChild(document.createTextNode("done"));
        
        // append children [delBtn] element to main div
        taskDiv.appendChild(document.createTextNode(t.title));
        taskDiv.appendChild(doneBtn );
        taskDiv.appendChild(delBtn);

        // add the task div .task to page
        tasksTag.appendChild(taskDiv);
    });
}
// ========================================================================




// ========================================================================
function addDataToPageFromLocal() {
    let data = window.localStorage.getItem("tasks");
    if (data) {
        addDataPage(JSON.parse(data));
    }
}
 addDataToPageFromLocal();
// ==============================================




// ========================================================================
function removeTaskLocal(id) {
    allTask = allTask.filter( (t) => t.id != id);
    addDataLocal(allTask);
}

// ========================================================================


// ========================================================================
function changeStatues(id) {
    for (let i = 0; i < allTask.length; i++) {
        if (allTask[i].id == id) {
            allTask[i].statues == false ? allTask[i].statues = true : allTask[i].statues = false;
        }
    }
    addDataLocal(allTask);
}
// ========================================================================