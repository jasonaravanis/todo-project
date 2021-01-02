// Foreign modules
import add from 'date-fns/add'
import format from 'date-fns/format'
import datepicker from 'js-datepicker'
// Helper home-made modules
import createNode from "./createNode"
// Images
import emptySquareIcon from "../img/square.svg"
import filledSquareIcon from "../img/square-fill.svg"
import pencilSquareIcon from "../img/pencil-square.svg"
import trashIcon from "../img/trash.svg"
import addIcon from "../img/plus-square.svg"


export const runApp = () => {

    // 'main' is the main content controller, which CRUDs user tasks and lists
    const Main = (() => {

        // Creates a task object
        function createTask(completeBool, title, dueDate) {
            const task = {
                completeBool,
                title,
                dueDate,
            }
            return task
        }

        // Stores user tasks
        const userData = new Map() // Note: need to figure out how to configure this to operate with lists as buckets for the Map

        userData.set('1', createTask(false, "testTitle4", "testDueDate4"))

        return { createTask, userData }
    })()

    // 'render' controls the publication of information to the DOM
    const Render = (() => {
        // Renders a task object to the DOM
        function renderTask(taskObject) {
            const taskNode = createNode("li", userContentContainer, "", "task")
            const checkbox = createNode("img", taskNode, "", "checkbox")
            if (!taskObject.completeBool) {
                checkbox.src = emptySquareIcon
            } else {
                checkbox.src = filledSquareIcon
            }
            const taskDescription = createNode("div", taskNode, "", "taskDescription")
            taskDescription.textContent = taskObject.title

            const taskDueDate = createNode("div", taskNode, "", "taskDueDate")
            let date = taskObject.dueDate
            date = format(date, "dd/MM/yy")
            taskDueDate.textContent = date

            const editTaskIcon = createNode("img", taskNode, "", "editTaskIcon")
            editTaskIcon.src = pencilSquareIcon
            const deleteTaskIcon = createNode("img", taskNode, "", "deleteTaskIcon")
            deleteTaskIcon.src = trashIcon

            return taskNode
        }

        // Renders userData Map to DOM
        function renderUserContent(map) {
            for (const entry of map) {
                const task = entry[1]
                renderTask(task.completeBool, task.title, task.dueDate)
            }
        }

        // Renders the 'Add Task' button to the DOM
        function renderAddTaskButton() {
            // Note: id of the button is 'lower' add task button, because there is a second 'higher' one in the top bar.
            const button = createNode("li", userContentContainer, "LowerAddTask", ["addTaskButton"])
            const addTaskIconNode = createNode("img", button, "addTaskIcon", "checkbox")
            addTaskIconNode.src = addIcon
            const addTaskText = createNode("div", button, undefined, "taskDescription")
            addTaskText.textContent = "Add Task"
        }

        return { renderTask, renderUserContent, renderAddTaskButton }
    })()


    // 'Listeners' adds functionality to DOM buttons
    const Listeners = (() => {

        const datePicker = datepicker('#dateInput', {
            formatter: (input, date) => {
                input.value = format(date, "eee d/M/yy")
                const node = document.getElementById("dateInput")
                node.setAttribute("data-date", date)
            },
        })

        const submitButton = (() => {
            function submitNewItem() {
                const title = document.getElementById("newItemTitle").value
                const date = Date.parse(document.getElementById("dateInput").dataset.date)
                const newTask = Main.createTask(false, title, date)
                Render.renderTask(newTask)
            }
            const submitButtonElement = document.getElementById("newItemSubmit")
            submitButtonElement.addEventListener("click", function () { submitNewItem() })
        })()
    })()
    Render.renderAddTaskButton()
}