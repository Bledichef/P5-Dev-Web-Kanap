let tagOrderId = document.querySelector("#orderId");

const urlConfirmation = window.location.search;
const urlSearchParams = new URLSearchParams(urlConfirmation);
tagOrderId.innerHTML = urlSearchParams.get("orderId"); //récupère la clé orderId et l'insère dans le span
localStorage.clear(); // vide le localStorage
