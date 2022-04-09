/* <div class="task">
    <label class="labelTodo">
        <input type="checkbox" name="" id="taskTodo">
        <p>Fazer comida</p>
    </label>
    <i class="fa-solid fa-trash"></i>
</div> */

// let dataBase = [
//     {task: 'Cozinhar', status: 'checked'},
//     {task: 'Estudar JS', status: ''},
//     {task: 'Limpar a Casa', status: 'checked'},
// ]


const container_task = document.querySelector('.container_task');
const inputTask = document.querySelector('#inputTask');
const btnInputTask = document.querySelector('#btnInputTask');


document.addEventListener('click', clickItem)
document.addEventListener('keydown', (event) =>{
    if(event.key === 'Enter'){
       addTask();
    }
})

const getItem = () => JSON.parse(localStorage.getItem('database')) ?? [] ;
const setItem = (dataBase) => localStorage.setItem('database', JSON.stringify(dataBase))


function clickItem(event){
    const element = event.target
    const index = element.dataset.index

    if(element.classList.contains('fa-check')){
        addTask()
    } else if (element.classList.contains('fa-trash')){
        deleteTask(index)
    } else if (element.type == 'checkbox'){
        checkTask(index)
    }

}

function createElement(task, index, status=''){
    const div = document.createElement('div');
    div.classList.add('task')
    div.innerHTML = 
    `
        <label class="labelTodo">
            <input type="checkbox" name="" id="taskTodo" data-index=${index} ${status} >
            <p>${task}</p>
        </label>
        <i class="fa-solid fa-trash" data-index=${index}  ></i>
    `

    container_task.appendChild(div);
}


function addTask(){
    if(!inputTask.value) return;
    let dataBase = getItem();
    dataBase.push({task: inputTask.value, status: ''})
    setItem(dataBase)
    createElement(inputTask.value)
    inputTask.value = ''
    inputTask.focus();
}

function deleteTask(index){
    const dataBase = getItem();
    dataBase.splice(index, 1)
    setItem(dataBase)
    updatePage();
}

function checkTask(index){
    const dataBase = getItem();
    dataBase[index].status == 'checked' ? dataBase[index].status = '' : dataBase[index].status = 'checked'
    setItem(dataBase)
    updatePage();
    console.log(dataBase)
}



function cleanPage(){
    container_task.innerHTML = ''
}

function updatePage(){
    cleanPage();
    let dataBase = getItem();
    dataBase.forEach((object, index) => {
        createElement(object.task, index, object.status)
    })
    setItem(dataBase)
}

updatePage();
