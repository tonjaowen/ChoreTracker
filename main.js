document.getElementById('choreInputForm').addEventListener('submit', saveChore);

function saveChore(e) {
    var choreDesc = document.getElementById('choreDescInput').value;
    var choreSeverity = document.getElementById('choreSeverityInput').value;
    var choreAssignedTo = document.getElementById('choreAssignedToInput').value;
    var choreId = chance.guid();
    var choreStatus = 'Open';

    var chore = {
        id: choreId,
        description: choreDesc,
        severity: choreSeverity,
        assignedTo: choreAssignedTo,
        status: choreStatus
    }

    if (localStorage.getItem('chores') == null) {
        var chores = [];
        chores.push(chore);
        localStorage.setItem('chores', JSON.stringify(chores));
    } else {
        var chores = JSON.parse(localStorage.getItem('chores'));
        chores.push(chore);
        localStorage.setItem('chores', JSON.stringify(chores));
    }

    document.getElementById('choreInputForm').reset();

    fetchChores();

    e.preventDefault();
}

function setStatusClosed(id) {
    var chores = JSON.parse(localStorage.getItem('chores'));

    for (var i = 0; i < chores.length; i++) {
        if (chores[i].id == id) {
            chores[i].status = 'Closed';
        }
    }

    localStorage.setItem('chores', JSON.stringify(chores));

    fetchChores();
}

function deleteChore(id) {
    var chores = JSON.parse(localStorage.getItem('chores'));

    for (var i = 0; i < chores.length; i++) {
        if (chores[i].id == id) {
            chores.splice(i, 1);
        }
    }

    localStorage.setItem('chores', JSON.stringify(chores));

    fetchChores();
}

function fetchChores() {
    var chores = JSON.parse(localStorage.getItem('chores'));
    var choresList = document.getElementById('choresList');

    choresList.innerHTML = '';

    for (var i = 0; i < chores.length; i++) {
        var id = chores[i].id;
        var desc = chores[i].description;
        var severity = chores[i].severity;
        var assignedTo = chores[i].assignedTo;
        var status = chores[i].status;

        choresList.innerHTML += '<div class="well">' +
            '<h6>Chore ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>' +
            '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
            '<a href="#" onclick="deleteChore(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '</div>';
    }
}
