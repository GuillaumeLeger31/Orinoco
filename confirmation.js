let paramsConfirmation = new URLSearchParams(window.location.search);

let nameConfirmation = document.getElementById("Namecommande");
let prixConfirmation = document.getElementById("Prixcommande");
let idConfirmation = document.getElementById("Idcommande");


nameConfirmation.textContent = paramsConfirmation.get('name');
prixConfirmation.textContent = paramsConfirmation.get('prix');
idConfirmation.textContent = paramsConfirmation.get('id');