$(document).ready(function() {
    // Fonction de validation du formulaire d'inscription
    $('#signin-form').submit(function(event) {
        event.preventDefault(); // Empêche le rechargement de la page

        // Récupérer les valeurs des champs
        let email = $('#email').val();
        let password = $('#password').val();
        let confirmPassword = $('#confirm-password').val();
        
        let isValid = true; // Par défaut, on considère que les données sont valides

        // Réinitialiser les erreurs
        $('.input-group').removeClass('error'); // Enlever la classe error de tous les groupes
        $('.errormessage').hide(); // Cacher tous les messages d'erreur

        // Validation de l'email
        if (email === "") {
            $('#email-group').addClass('error');
            $('#emailError').show();
            isValid = false;
        }

        // Validation du mot de passe
        if (password === "") {
            $('#password-group').addClass('error');
            $('#passwordError').show();
            isValid = false;
        }

        // Validation de la confirmation du mot de passe
        if (confirmPassword === "") {
            $('#confirm-password-group').addClass('error');
            $('#confirmPasswordError').show();
            isValid = false;
        } else if (password !== confirmPassword) {
            $('#confirm-password-group').addClass('error');
            $('#confirmPasswordError').text("Passwords do not match").show();
            isValid = false;
        }

        // Si tout est valide, on vérifie si l'utilisateur existe déjà
        if (isValid) {
            let users = JSON.parse(localStorage.getItem('users')) || [];

            // Vérifier si l'email existe déjà
            let userExists = users.some(function(user) {
                return user.email === email;
            });

            if (userExists) {
                alert("Cet email est déjà enregistré. Veuillez vous connecter.");
                // Rediriger vers la page de connexion
                window.location.href = "login.html"; // Page login.html
            } else {
                // Créer un nouvel utilisateur
                const newUser = { email: email, password: password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                alert("Utilisateur créé avec succès !");
                window.location.href = "login.html";  // Redirection vers la page de connexion
            }
        }
    });

    $("#login-btn").click(function(e) {
        e.preventDefault(); // Empêche la soumission du formulaire

        // Récupérer les valeurs des champs email et password
        const email = $("#email").val().trim();
        const password = $("#password").val().trim();

        // Réinitialiser les erreurs
        $("#email-group").removeClass("error");
        $("#password-group").removeClass("error");
        $("#emailError").hide();
        $("#passwordError").hide();

        let formValid = true;

        // Vérification de l'email et du mot de passe
        if (email === "") {
            formValid = false;
            $("#email-group").addClass("error");
            $("#emailError").text("Can’t be empty").show();
        }

        if (password === "") {
            formValid = false;
            $("#password-group").addClass("error");
            $("#passwordError").text("Please check again").show();
        }

        // Vérification dans le localStorage pour voir si l'utilisateur existe
        if (formValid) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let userFound = false;

            users.forEach(user => {
                if (user.email === email && user.password === password) {
                    userFound = true;
                    // Si l'utilisateur est trouvé, on redirige vers la page d'accueil (ou une autre page)
                    window.location.href = "index.html"; // Change cette URL selon ton besoin
                }
            });

            // Si aucun utilisateur trouvé avec les informations fournies
            if (!userFound) {
                formValid = false;
                $("#email-group").addClass("error");
                $("#password-group").addClass("error");
                $("#emailError").text("User does not exist").show();
                $("#passwordError").text("Invalid password").show();
            }
        }
    });
});
