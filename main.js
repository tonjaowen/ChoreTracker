document.getElementById('choreInputForm').addEventListener('submit', savechore);

function savechore(e) {
    var choreDesc = document.getElementById('choreDescInput').value;
    var choreseverity = document.getElementById('choreseverityInput').value;
    var choreAssignedTo = document.getElementById('choreAssignedToInput').value;
    var choreId = chance.guid();
    var chorestatus = 'Open';

    var chore = {
        id: choreId,
        description: choreDesc,
        severity: choreseverity,
        assignedTo: choreAssignedTo,
        status: chorestatus
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

    fetchchores();

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

    fetchchores();
}

function deletechore(id) {
    var chores = JSON.parse(localStorage.getItem('chores'));

    for (var i = 0; i < chores.length; i++) {
        if (chores[i].id == id) {
            chores.splice(i, 1);
        }
    }

    localStorage.setItem('chores', JSON.stringify(chores));

    fetchchores();
}

function fetchchores() {
    var chores = JSON.parse(localStorage.getItem('chores'));
    var choresListe = document.getElementById('choresList');

    choresList.innerHTML = '';

    for (var i = 0; i < chores.length; i++) {
        var id = chores[i].id;
        var desc = chores[i].description;
        var severity = chores[i].severity;
        var assignedTo = chores[i].assignedTo;
        var status = chores[i].status;

        choresList.innerHTML += '<div class="well">' +
            '<h6>chore ID: ' + id + '</h6>' +
            '<p><span class="label label-info">' + status + '</span></p>' +
            '<h3>' + desc + '</h3>' +
            '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '</p>' +
            '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' +
            '<a href="#" onclick="setStatusClosed(\'' + id + '\')" class="btn btn-warning">Close</a> ' +
            '<a href="#" onclick="deletechore(\'' + id + '\')" class="btn btn-danger">Delete</a>' +
            '</div>';
    }
}
