/* Récupération de l'ID de l'URL */
const params = new URLSearchParams(window.location.search);
let camId = params.get("id");

/* Appel du produit sélectionné */
let camData;

async function selectionProduit() {
    fetch("http://localhost:3000/api/cameras/" + camId).then(function (response) {
        response.json().then(function (data) {
            camData = data;
            console.log(camData);

            /* On vient cibler la balise div ayant pour id Descriptionproduit */
            let descriptionProduit = document.getElementById("Descriptionproduit");

            /* Affichage du produit séléctionné par l'utilisateur*/
            let descriptionContainer = document.createElement("div");
            let descriptionProduitB1 = document.createElement("div");
            let descriptionProduitB2 = document.createElement("div");
            let descriptionProduitNom = document.createElement("h2");
            let descriptionProduitPrix = document.createElement("p");
            let descriptionProduitImage = document.createElement("img");
            let descriptionProduitDescription = document.createElement("p");

            /* Hiérarchisation des éléments crées */
            descriptionProduit.appendChild(descriptionContainer);
            descriptionContainer.appendChild(descriptionProduitB1);
            descriptionContainer.appendChild(descriptionProduitB2);
            descriptionProduitB1.appendChild(descriptionProduitImage);
            descriptionProduitB2.appendChild(descriptionProduitNom);
            descriptionProduitB2.appendChild(descriptionProduitPrix);
            descriptionProduitB2.appendChild(descriptionProduitDescription);

            /* Attributs suplémentaires */
            descriptionProduitImage.setAttribute("src", data.imageUrl);
            descriptionProduitImage.setAttribute("class", "Imagedescription mt-4");
            descriptionProduitDescription.setAttribute("class", "Descriptionproduit");

            /* Attribution des données aux éléments crées */
            descriptionProduitNom.textContent = data.name;
            descriptionProduitPrix.textContent = data.price / 100 + " " + "euros";
            descriptionProduitDescription.textContent = data.description;

            let selectLentille = document.getElementById("lentille");
            data.lenses.forEach(lentilles => {
                let option = document.createElement("option");
                selectLentille.appendChild(option);
                option.setAttribute("value", "Type de lentille");
                option.textContent = lentilles;
            });
        })
    })
}
selectionProduit();

let panier = JSON.parse(localStorage.getItem("monPanier"));

/* Ajouter un article au panier */
function ajouterAuPanier() {
    console.log(panier);
    const bouton = document.getElementById("Boutonpanier");
    bouton.addEventListener("click", async function () {
        panier.push(camData);
        localStorage.setItem("monPanier", JSON.stringify(panier));
        location.reload();
    });
};
ajouterAuPanier();

/* Fonction affichant le nombre d'article dans le panier dans le nav */
function nombreArticle() {
    let numberArticle = document.getElementById("Numberarticle");
    numberArticle.textContent = panier.length;
}
nombreArticle();