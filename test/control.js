let btnCreate = document.getElementById("btnCreate");
btnCreate.addEventListener("click", function () {
  let personName = document.getElementById("personName").value;
  let listPerson = JSON.parse(localStorage.getItem("listPerson"));
  let exist = false;
  if (listPerson != null) {
    for (const person of listPerson) {
      if (person.personName == personName) {
        exist = true;
        break;
      }
    }
  }
  if (exist) {
    editPerson();
  } else {
    createPerson();
  }
});

function createPerson() {
  let listPerson = JSON.parse(localStorage.getItem("listPerson"));
  if (listPerson == null) {
    listPerson = [];
  }

  let personName = document.getElementById("personName").value;
  let personEmail = document.getElementById("personEmail").value;
  let personPhone = parseFloat(document.getElementById("personPhone").value);
  let personPlace = document.getElementById("personPlace").value;

  let personNew = {
    personName: personName,
    personEmail: personEmail,
    personPhone: personPhone,
    personPlace: personPlace,
  };

  listPerson.push(persontNew);

  localStorage.setItem("listPerson", JSON.stringify(listPerson));

  readlistPerson();
}
function readlistPerson() {
  let listPerson = JSON.parse(localStorage.getItem("listPerson"));
  if (listPerson == null) {
    listPerson = [];
  }

  let tableBody = document.getElementById("tableBody");
  tableBody.innerHTML = "";
  listPerson.forEach((person, index) => {
    tableBody.innerHTML += `
          <tr>
              <td>${index + 1}</td>
              <td>${person.personName}</td>
              <td>${person.personEmail}</td>
              <td>${person.personPhone}</td>
              <td>${person.personPlace}</td>
              <td>
                  <button onclick="updatePerson('${
                    person.personName
                  }')">Edit</button>
                  <button onclick="deletePerson('${
                    person.personName
                  }')">Delete</button>
              </td>
          </tr>`;
  });
}
readlistPerson();
function updatePerson(personName) {
  let listPerson = JSON.parse(localStorage.getItem("listPerson"));

  let personUpdate = listPerson.filter((person) => {
    if (person.personName == personName) {
      return person;
    }
  });

  document.getElementById("personName").value = personUpdate[0].personName;
  document.getElementById("personEmail").value = personUpdate[0].personEmail;
  document.getElementById("personPhone").value = personUpdate[0].personPhone;
  document.getElementById("personPlace").value = personUpdate[0].personPlace;
}
function editPerson() {
  let listPerson = JSON.parse(localStorage.getItem("listPerson"));

  let personName = document.getElementById("personName").value;
  let personEmail = document.getElementById("personEmail").value;
  let personPhone = parseFloat(document.getElementById("personPhone").value);
  let personPlace = parseFloat(document.getElementById("personPlace").value);

  let listPersonUpdate = listPerson.map((person) => {
    if (person.personName == personName) {
      person.personEmail = personEmail;
      person.personPhone = personPhone;
      person.personPlace = personPlace;
    }
    return person;
  });

  localStorage.setItem("listPerson", JSON.stringify(listPersonUpdate));
}

function deletePerson(personName) {
  let listPerson = JSON.parse(localStorage.getItem("listPerson"));

  for (let i = 0; i < listPerson.length; i++) {
    if (listPerson[i].personName == personName) {
      listPerson.splice(i, 1);
      break;
    }
  }

  localStorage.setItem("listPerson", JSON.stringify(listPerson));

  readlistPerson();
}
