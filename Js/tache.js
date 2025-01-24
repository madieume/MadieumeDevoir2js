const urlTache = "http://localhost:5501/Pages/tache.html"; // URL correcte pour JSON Server
document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("table-body");
    const tacheName = document.getElementById("tacheName");
    const doneAll = document.getElementById("doneAll");
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    const usernameElement = document.getElementById("username");
    const logoutButton = document.getElementById("logoutButton");
    const btnAdd = document.getElementById('btnAdd');
    const modalAdd = document.getElementById('modalAdd');
    const btnClose = document.getElementById('btnClose');
    const formAddTask = document.getElementById('formAddTask');
    const taskNameInput = document.getElementById('taskName');

    let data = { taches: [] }; 

    
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("bg-dark");
        body.classList.toggle("bg-white");
    });

   
    btnAdd.addEventListener('click', function () {
        modalAdd.classList.remove('hidden');
    });

 
    btnClose.addEventListener('click', function () {
        modalAdd.classList.add('hidden');
    });

  
    formAddTask.addEventListener('submit', function (event) {
        event.preventDefault();

        const taskName = taskNameInput.value.trim();

        if (taskName) {
            const newId = data.taches.length + 1;
            data.taches.push({
                id: newId,
                check: 0,
                name: taskName
            });

            modalAdd.classList.add('hidden');
            taskNameInput.value = '';
            generateTable();
        } else {
            alert('Veuillez entrer un nom de tâche.');
        }
    });


    

    // Fonction pour générer le tableau de tâches
    function generateTable() {
        tableBody.innerHTML = ''; 

        data.taches.forEach(tache => {
            const row = document.createElement("tr");
            row.setAttribute("id", "row-" + tache.id);

            row.innerHTML = `
                <td class="py-3 px-6 text-left border-r">
                    <input type="checkbox" id="check-${tache.id}" class="coche">
                </td>
                <td class="py-3 px-6 text-left border-r">${tache.name}</td>
                <td class="py-3 px-6 text-center">
                    <button class="text-blue-500 hover:text-blue-700 mr-4" onclick="editTache(${tache.id}, '${tache.name}')">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="text-red-500 hover:text-red-700" onclick="deleteTache(${tache.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

            const checkbox = row.querySelector(`#check-${tache.id}`);
            checkbox.addEventListener("change", function () {
                toggleRowTrace(tache.id, checkbox.checked);
            });

            tableBody.appendChild(row);
        });
    }

   
    function toggleRowTrace(id, isChecked) {
        const row = document.getElementById("row-" + id);
        if (isChecked) {
            row.style.textDecoration = "line-through";  
        } else {
            row.style.textDecoration = "none";  
        }
    }

   
    doneAll.addEventListener("change", function () {
        const inputsToCheck = document.querySelectorAll(".coche");
        if (doneAll.checked) {
            inputsToCheck.forEach(function (input) {
                input.checked = true;
                toggleRowTrace(input.id.replace('check-', ''), true);
            });
        } else {
            inputsToCheck.forEach(function (input) {
                input.checked = false;
                toggleRowTrace(input.id.replace('check-', ''), false);
            });
        }
    });

   
    const currentUser = {
        name: "Aminata Fall"
    };

    if (currentUser && currentUser.name) {
        usernameElement.textContent = currentUser.name;
    }

   
    logoutButton.addEventListener("click", function () {
        usernameElement.textContent = '';
        window.location.href = "connexion.html";
    });

   
    function loadData() {
        fetch('/db.json')
            .then(response => response.json())
            .then(fetchedData => {
                data = fetchedData; 
                generateTable();  
            })
            .catch(error => {
                console.error('Erreur lors du chargement des données :', error);
            });
    }

   
    loadData();
});
