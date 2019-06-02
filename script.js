const LOCALKEY = 'todo-data';

var table = document.querySelector('table');
var tableBody = document.querySelector('tbody');

var buttonAdd = document.querySelector('#button-add');
var buttonToggleComplete = document.querySelector('#button-toggle-complete');


var messageDisplay = document.querySelector('.message-display');

var buttonComplete = [];
var buttonDelete = [];


class Task {
    constructor(title, createdAt, status) {
        this.title = title;
        this.createdAt = createdAt;
        this.status = status;
    }
}

class TaskList {
    constructor(list) {
        this.list = [];

        if (list && Array.isArray(list)) {
            this.list = list;
        }
    }

    addList(title, createdAt, status) {
        var task = new Task(title, createdAt, status);
        this.list.push(task);

        this.outputTask();
    }

    toggleList(index, tr) {
        this.list[index].status = !this.list[index].status;

        this.outputTask();
    }

    removeList(index) {
        this.list.splice(index, 1);

        this.outputTask();
    }

    addTable(sn, name, date, status) {
        var createTr = document.createElement('tr');
        createTr.classList.add('complete');

        var createSn = document.createElement('td');
        createSn.innerText = sn;

        var createName = document.createElement('td');
        createName.innerText = name;

        var createDate = document.createElement('td');
        createDate.innerText = date;

        var createStatus = document.createElement('td');
        createStatus.innerText = status;

        if (status) {
            createTr.classList.add('complete');
        } else {
            createTr.classList.remove('complete');
        }

        var createOptions = document.createElement('td');

        var createButton = document.createElement('button');
        createButton.classList.add('button-complete');

        createButton.setAttribute('onclick', `toggleTask(${sn})`);

        var createButtonExit = document.createElement('button');
        createButtonExit.classList.add('button-delete');

        createButtonExit.setAttribute('onclick', `removeTask(${sn})`);


        createOptions.append(createButton, createButtonExit);

        createTr.append(createSn, createName, createDate, createStatus, createOptions);

        return createTr;
    }

    outputTask() {
        tableBody.innerHTML = '';

        for (var i = 0; i < this.list.length; i++) {
            const {
                title,
                createdAt,
                status
            } = this.list[i];

            var tableRow = this.addTable(i + 1, title, createdAt, status);

            tableBody.append(tableRow);
        }

        localStorage.setItem(LOCALKEY, JSON.stringify(this.list));
    }

}


var localData = JSON.parse(localStorage.getItem(LOCALKEY));

var tasklist = new TaskList(localData);

if (localData) {
    tasklist.outputTask();
}

// var task1 = new Task('Superman', generateDate(), false);
// var task2 = new Task('Batman', generateDate(), false);

// tasklist.addList(task1);
// tasklist.addList('Dratatatat');



function addInput() {
    var name = prompt('ENter Your Name');

    if (name == null) {
        return;
    }
    tasklist.addList(name, generateDate(), false);
}

function toggleTask(index) {
    tasklist.toggleList(index - 1);
}

function removeTask(index) {
    tasklist.removeList(index - 1);
    messageDelete();
}


function generateDate() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var dateCollect = new Date();
    var dateDay = dateCollect.getDay();

    var dayName = days[dateDay];

    timeGet = new Date();
    hour = timeGet.getHours();
    min = timeGet.getMinutes();
    seconds = timeGet.getSeconds();
    meridiem = "AM";

    if (hour > 12) {
        meridiem = "PM";
        hour = hour - 12;
    }

    if (hour < 10) {
        hour = "0" + hour;
    }

    if (min < 10) {
        min = "0" + min;
    }

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return (`${dayName} | ${hour}:${min}:${meridiem}`);
}

function messageDelete() {
    var messageDelete = document.createElement('span');
    messageDelete.innerText = 'Section Deleted';
    messageDelete.classList.add('message-delete', 'appear');

    var duration = 3;
    durationMilli = duration * 1000;

    messageDelete.style.animationDuration = duration + 's';
    messageDisplay.append(messageDelete);

    setTimeout(function () {
        messageDelete.remove();
    }, durationMilli);
}

function toggleText(element) {
    var text = element.innerText;
    var textList = text.split(' ');

    if (textList[0].toLowerCase() === "show") {
        element.innerText = "Hide " + textList[1];
    } else {
        element.innerText = "Show " + textList[1];
    }
}

function toggleAllTasks(e) {
    var clickedElement = e.srcElement;
    toggleText(clickedElement);
    table.classList.toggle('complete-hide');
}



buttonAdd.onclick = addInput;
buttonToggleComplete.onclick = toggleAllTasks;