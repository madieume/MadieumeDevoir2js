document.addEventListener("DOMContentLoaded", function () {
   
    const data = {
        "utilisateurs": [
            {
                "id": 1,
                "name": "Ibrahima Diop",
                "login": "idiop",
                "mdp": "mdp123",
                "image": "user1.png"
            },
            {
                "id": 2,
                "name": "Aminata Fall",
                "login": "afall",
                "mdp": "mdp123",
                "image": "user2.png"
            },
            {
                "id": 3,
                "name": "Moussa Sylla",
                "login": "msylla",
                "mdp": "mdp123",
                "image": "user3.png"
            }
        ],
        "taches": [
            {
                "id": 1,
                "check": 1,
                "name": "tache 1"
            },
            {
                "id": 2,
                "check": 2,
                "name": "tache 2"
            },
            {
                "id": 3,
                "check": 3,
                "name": "tache 3"
            },
            {
                "id": 4,
                "check": 4,
                "name": "tache 4"
            },
            {
                "id": 5,
                "check": 5,
                "name": "tache 5"
            }

        ]
    };

    
    const tableBody = document.getElementById("table-body");


    function generateTable() {
       
        tableBody.innerHTML = '';

       
        data.taches.forEach(tache => {
            
            const row = document.createElement("tr");
            row.setAttribute("id", "row-" + tache.id);

           
            row.innerHTML = `
                <td class="py-3 px-6 text-left border-r">
                    <input type="checkbox" id="check-${tache.id}" ${tache.check === 1 ? 'checked' : ''}>
                </td>
                <td class="py-3 px-6 text-left border-r">${tache.name}</td>
                <td class="py-3 px-6 text-center">
                    <button class="bg-blue-500 text-white px-4 py-2 rounded mr-2" onclick="editTache(${tache.id})">Modifier</button>
                    <button class="bg-red-500 text-white px-4 py-2 rounded" onclick="deleteTache(${tache.id})">Supprimer</button>
                </td>
            `;
            
           
            const checkbox = row.querySelector(`#check-${tache.id}`);
            checkbox.addEventListener("change", function() {
                toggleRowTrace(tache.id, checkbox.checked);
            });

           
            tableBody.appendChild(row);

          
            if (tache.check === 1) {
                toggleRowTrace(tache.id, true);
            }
        });
    }

   
    function editTache(id) {
        alert(`Modifier la tâche ${id}`);
 
    }

 
    function deleteTache(id) {
        if (confirm(`Voulez-vous vraiment supprimer la tâche ${id}?`)) {
           
            data.taches = data.taches.filter(tache => tache.id !== id);
            generateTable(); 
        }
    }

   
    function toggleRowTrace(id, isChecked) {
        const row = document.getElementById("row-" + id);
        if (isChecked) {
            row.classList.add(); 
            row.style.textDecoration = "line-through";  
        } else {
            row.classList.remove();  
            row.style.textDecoration = "none";  
        }
    }

    generateTable();
});
