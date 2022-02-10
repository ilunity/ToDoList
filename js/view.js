"use strict"


class taskElemClass extends HTMLDivElement {
    constructor({text, priority, isActive}, {deleteCallback, changeStatusCallback}) {
        super();
        this.className = 'task';

        this.options = {
            text: text,
            priority: priority,
            isActive: isActive,
        };

        this.callbacks = {
            delete: deleteCallback,
            changeStatus: changeStatusCallback,
        }

        const checkBoxElem = document.createElement('div');
        this.checkBoxElem = checkBoxElem;
        checkBoxElem.className = 'check-box';
        this.setActiveStatus(isActive);
        checkBoxElem.addEventListener("click", () => {
            this.setActiveStatus(!this.options.isActive);
            this.callbacks.changeStatus();
        });

        const textElem = document.createElement('div');
        this.textElem = textElem;
        textElem.className = 'task__text';
        textElem.textContent = text;

        const deleteBtnElem = document.createElement('div');
        this.deleteBtnElem = deleteBtnElem;
        deleteBtnElem.className = 'delete-task-btn';
        deleteBtnElem.addEventListener("click", () => {
            this.delete();
        });

        this.append(checkBoxElem);
        this.append(textElem);
        this.append(deleteBtnElem);
    }

    getOptions() {
        return this.options;
    }

    setActiveStatus(isActive) {
        if (isActive) {
            this.checkBoxElem.classList.add('check-box_active');
            this.classList.add('task_active');
            this.options.isActive = true;
            return;
        }

        this.checkBoxElem.classList.remove('check-box_active');
        this.classList.remove('task_active');
        this.options.isActive = false;
    }

    delete() {
        this.remove();
        this.callbacks.delete();
    }
}

customElements.define('task-elem', taskElemClass, {extends: 'div'});


const highPriorityForm = {
    formElement: document.querySelector(".high-priority-task__list"),
    textElem: document.querySelector(".high-priority-task__form .task-form__text"),
    submitBtnElem: document.querySelector(".high-priority-task__form"),

    getText() {
        return this.textElem.value;
    },

    resetText() {
        this.textElem.value = '';
    },

    append(elem) {
        this.formElement.append(elem);
    },
}


const lowPriorityForm = {
    formElement: document.querySelector(".low-priority-task__list"),
    textElem: document.querySelector(".low-priority-task__form .task-form__text"),
    submitBtnElem: document.querySelector(".low-priority-task__form"),

    getText() {
        return this.textElem.value;
    },

    resetText() {
        this.textElem.value = '';
    },

    append(elem) {
        this.formElement.append(elem);
    },
}

export {taskElemClass, highPriorityForm, lowPriorityForm}