"use strict"


import {highPriorityForm, lowPriorityForm, taskElemClass} from "./view.js";
import {taskStorage} from "./storage.js";

const LOW_PRIORITY = "low"
const HIGH_PRIORITY = "high"


function syncTaskWithStorage(taskElem) {
    const options = taskElem.getOptions();
    const key = options.text;

    taskStorage.syncTask(key, options);
}

function deleteTaskFromStorage(taskElem) {
    taskStorage.delete(taskElem.options.text);
}

function loadTasks() {
    const tasks = taskStorage.get();
    for (let taskOptions of Object.values(tasks)) {
        addTask(taskOptions);
    }
}

function isUniqueTaskText(taskText) {
    const currentTaskTexts = Object.keys(taskStorage.get());
    return !currentTaskTexts.includes(taskText);
}

function addTask(options) {
    // todo проверка на уникальность текста
    const {text, priority} = options;
    if (!isUniqueTaskText(text)) {
        alert('Такое задание уже существует');
        return;
    }

    let newTask = new taskElemClass(options, {
        callbackDelete() {
            deleteTaskFromStorage(newTask);
        },
        callbackChangeStatus() {
            syncTaskWithStorage(newTask);
        },
    });

    taskStorage.add(options.text, options);

    let tasksList;
    if (priority === LOW_PRIORITY) {
        tasksList = lowPriorityForm;
    } else if (priority === HIGH_PRIORITY) {
        tasksList = highPriorityForm;
    }

    tasksList.resetText();
    tasksList.append(newTask);
}


highPriorityForm.submitBtnElem.addEventListener("submit", () => {
    addTask({
        text: highPriorityForm.getText(),
        priority: HIGH_PRIORITY,
        isActive: false,
    });
})
lowPriorityForm.submitBtnElem.addEventListener("submit", () => {
    addTask({
        text: lowPriorityForm.getText(),
        priority: LOW_PRIORITY,
        isActive: false,
    });
})

loadTasks();