document.addEventListener("DOMContentLoaded", function () {
    const loginButton = document.getElementById("login-button");

    loginButton.addEventListener("click", function () {
        const login = document.getElementById("login").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!login || !password) {
            alert("Veuillez remplir tous les champs !");
            return;
        }

       
        window.location.href = "tache.html";
    });
});