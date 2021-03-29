/* Fonction affichant le nombre d'article dans le nav */
let panier = JSON.parse(localStorage.getItem("monPanier"));

function nombreArticle() {
    let numberArticle = document.getElementById("Numberarticle");
    numberArticle.textContent = panier.length;
}
nombreArticle();

/* Affichage du panier */
let total = 0;

function affichagePanier() {
    if (panier.length > 0) {
        document.getElementById("panierVide").remove();

        let tableauSection = document.getElementById("Sectionpanier");

        /* Création du tableau */
        let tableauPanier = document.createElement("table");
        let tableauHeaderLigne = document.createElement("tr");
        let tableauHeaderImage = document.createElement("th");
        let tableauHeaderNom = document.createElement("th");
        let tableauHeaderPrix = document.createElement("th");
        let tableauHeaderAction = document.createElement("th");
        let tableauFooterLigne = document.createElement("tr");
        let tableauFooterPrixTotal = document.createElement("th");

        /* Hiérarchisation des éléments créées */
        tableauSection.appendChild(tableauPanier);
        tableauPanier.appendChild(tableauHeaderLigne);
        tableauHeaderLigne.appendChild(tableauHeaderImage);
        tableauHeaderLigne.appendChild(tableauHeaderNom);
        tableauHeaderLigne.appendChild(tableauHeaderPrix);
        tableauHeaderLigne.appendChild(tableauHeaderAction);

        /* Attribution des données aux éléments crées */
        tableauHeaderImage.textContent = "Articles";
        tableauHeaderNom.textContent = "Nom";
        tableauHeaderPrix.textContent = "Prix";
        tableauHeaderAction.textContent = "Suppr";

        /* Création d'une ligne dans le tableau pour chaque produit du panier */
        JSON.parse(localStorage.getItem("monPanier")).forEach((article, index) => {
            let articleLigne = document.createElement("tr");
            let articleImage = document.createElement("img");
            let articleNom = document.createElement("td", );
            let articlePrix = document.createElement("td", );
            let articleAction = document.createElement("i", );

            /* Hiérarchisation des élements crées */
            tableauPanier.appendChild(articleLigne);
            articleLigne.appendChild(articleImage);
            articleLigne.appendChild(articleNom);
            articleLigne.appendChild(articlePrix);
            articleLigne.appendChild(articleAction);

            /* Attributs supplémentaires */
            articleImage.setAttribute("src", article.imageUrl);
            articleImage.setAttribute("class", "Imagedescription");
            articleAction.setAttribute("class", "fas fa-trash-alt");
            articleAction.setAttribute("id", index);

            /* Attribution des données aux élements créees */
            articleNom.textContent = article.name;
            articlePrix.textContent = article.price / 100 + " " + "euros";

            /* Suppression de l'article en cliquant sur la poubelle */
            articleAction.addEventListener("click", function (event) {
                suppressionArticle(event.target.id);
            });
        });

        /* Création de la ligne du bas du tableau affichant le prix total de la commande */
        tableauPanier.appendChild(tableauFooterLigne);
        tableauFooterLigne.appendChild(tableauFooterPrixTotal);
        JSON.parse(localStorage.getItem("monPanier")).forEach(priceArticle => {
            total += priceArticle.price / 100;
        });
        tableauFooterPrixTotal.textContent = "Prix total: " + total + " euros";
    }
}
affichagePanier();

/* Fonction de suppression d'article du panier */
function suppressionArticle(i) {
    panier.splice(i, 1); /* suppression de l'element i du tableau */
    localStorage.setItem("monPanier", JSON.stringify(panier)); /* maj du panier sans l'élément i */
    window.location.reload();
}

/* Création de l'objet à envoyer, regroupant le formulaire et les articles */
const commandeUser = {
    contact: {},
    products: [],
}

document.getElementById("formulaire").addEventListener("submit", function (event) {
    event.preventDefault();

    /* Vérification que le panier n'est pas vide */
    if (panier.length == 0) {
        alert("Attention, votre panier est vide.");
    } else {
        /* Récupération des infos */
        let nomForm = document.getElementById("Nomform").value;
        let prenomForm = document.getElementById("Prénom").value;
        let emailForm = document.getElementById("Email").value;
        let adresseForm = document.getElementById("Adresse").value;
        let villeForm = document.getElementById("Ville").value;

        /* Création de l'objet contact */
        commandeUser.contact = {
            firstName: prenomForm,
            lastName: nomForm,
            address: adresseForm,
            city: villeForm,
            email: emailForm,
        }

        /* Création du tableau product */
        panier.forEach(articlePanier =>
            commandeUser.products.push(articlePanier)
        )

        /* Envoi des données */
        fetch("http://localhost:3000/api/cameras/order", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(commandeUser),
            })
            .then(function (response) {
                response.json()
                    .then(function (resJson) {
                        window.location = `./confirmation.html?id=${resJson.orderId}&name=${prenomForm}&prix=${total}`
                    });
            });
        /* Vider le panier apres la commande */
        localStorage.clear()
    }
})