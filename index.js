/* Appel de l'API */
async function getCams () {
    const response = await fetch("http://localhost:3000/api/cameras");
    /* utilisation json() pour les convertir en un objet JS */
    return await response.json();
}
getCams();
console.log(getCams())

/* Affichage des produits */ 
async function listeCams() {
    const cams = await getCams();
    /* On vient cibler la balise section ayant l'id "Produits" */
    let produits = document.getElementById("Produits");

    /* Affichage de la liste des produits */
    cams.forEach((cameras) => {
        let produitContainer = document.createElement("div");
        let produitB1 = document.createElement("div");
        let produitB2 = document.createElement("div");
        let produitNom = document.createElement("h2");
        let produitLien = document.createElement("a");
        let produitPrix = document.createElement("p");
        let produitImage = document.createElement("img");

        /* Hiérarchisation des éléments crées */ 
        produits.appendChild(produitContainer);
        produitContainer.appendChild(produitB1);
        produitContainer.appendChild(produitB2);
        produitB1.appendChild(produitImage);
        produitB2.appendChild(produitNom);
        produitB2.appendChild(produitPrix);
        produitB2.appendChild(produitLien);

        /* Attributs supplémentaires */
        produitContainer.setAttribute("class", "col-4");
        produitB1.setAttribute("class", "card");
        produitLien.setAttribute("href", "produit.html?id=" + cameras._id);
        produitImage.setAttribute("src", cameras.imageUrl);

        /* Attribution des données aux éléments crées */
        produitNom.textContent = cameras.name;
        produitPrix.textContent = cameras.price / 100 + " euros";
        produitLien.textContent = "Voir le produit.";
    });
};
listeCams();

/* Création du panier utilisateur */
function crtPanier (){
if (localStorage.getItem("monPanier")){
}else{
    let init = [];
    localStorage.setItem("monPanier", (JSON.stringify(init)));
    window.location.reload();
}
}
crtPanier();
console.log(localStorage);

let panier = JSON.parse(localStorage.getItem("monPanier"));


/* Fonction affichant le nombre d'article dans le panier dans le nav */
function nombreArticle (){
    let numberArticle = document.getElementById("Numberarticle");
    numberArticle.textContent = panier.length;
}
nombreArticle();
