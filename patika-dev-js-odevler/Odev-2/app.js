
const addItemBtn = document.getElementById("liveToastBtn");
const removeItemBtn = document.getElementById("")
const itemInput = document.getElementById("task");
const list = document.getElementById("list");

const onLoadPage = () => {
    initializeLocalStorage();
}
// Görev dizisi oluşturma veya var olan görevleri getirme
const initializeLocalStorage = () => {
    if (localStorage.getItem("taskList") === null) {
        localStorage.setItem("taskList", JSON.stringify([]));
    }
    else {
        let tasks = JSON.parse(localStorage.getItem("taskList"));
        tasks.forEach(task => {
            addItemToUI(task)
        });
    }
}

// Görevi ekleme
const addItem = () => {
    if (itemInput.value.trim() === "") {
        $('#liveToastError').toast('show');
    }
    else {
        let task = { text: itemInput.value, completed: false }
        addItemToUI(task);
        addItemToLocalStorage(task);
        $('#liveToastSuccess').toast('show');
        clearInput();
    }

}
//Görevi arayüze ekleme
const addItemToUI = (task) => {
    let listItem = `<li class="d-flex justify-content-between align-items-center">
    <span>${task.text}</span>
    <button class="btn btn-sm btn-danger">X</button>
  </li>`
    list.innerHTML += listItem;
}
//Görevi storage a ekleme
const addItemToLocalStorage = (task) => {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    taskList.push(task);
    localStorage.setItem("taskList", JSON.stringify(taskList));
}
//Görevi storage dan kaldırma
const removeItemFromLocalStorage = (task) => {
    let taskList = JSON.parse(localStorage.getItem("taskList"));
    taskList = taskList.filter(item => item.text !== task);
    localStorage.setItem("taskList", JSON.stringify(taskList));
}
//Görevi kaldırma veya durumunu değiştirme
const removeOrChangeStatusItem = (e) => {
    if (e.target.className == "btn btn-sm btn-danger") {
        e.target.parentElement.remove();
        removeItemFromLocalStorage(e.target.parentElement.children[0].textContent.trim());
    }
    else{
        //storage da status değiştirme
        changeStatusFromStorage(e.target.children[0].textContent.trim())
        changeStatusTaskFromUI(e);
    }
}
//Görevin durumuna göre arayüzde değişiklik yapma
const changeStatusTaskFromUI=(e)=>{
    tasks=JSON.parse(localStorage.getItem("taskList"));
    foundIndex=tasks.findIndex(item=>item.text===e.target.children[0].textContent.trim());
    if (tasks[foundIndex].completed===true) {
        e.target.style.cssText =
        `background:#93B5C6;`
        e.target.children[0].style=`text-decoration: line-through;`;
    } 
    else{
        e.target.style="";
        e.target.children[0].style="";
    }
}
// Görevin durumunu storage da değiştirme
const changeStatusFromStorage=(task)=>{
    tasks=JSON.parse(localStorage.getItem("taskList"));
    foundIndex=tasks.findIndex(item=>item.text===task);
    tasks[foundIndex].completed=!tasks[foundIndex].completed;
    localStorage.setItem("taskList",JSON.stringify(tasks));
}

// Task ekleme input alanını temizleme
const clearInput = () => {
    itemInput.value = "";
}

document.addEventListener('DOMContentLoaded', onLoadPage);
addItemBtn.addEventListener("click", addItem);
list.addEventListener("click", removeOrChangeStatusItem);



