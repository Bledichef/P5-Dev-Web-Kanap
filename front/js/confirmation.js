let tagOrderId = document.querySelector("#orderId");
 console.log(tagOrderId)
 console.log(orderId)
  const urlConfirmation = window.location.search; 
   const urlSearchParams = new URLSearchParams(urlConfirmation);
    tagOrderId.innerHTML = urlSearchParams.get('orderId'); //récupère la clé orderId et l'insère dans le span
     localStorage.clear(); // vide le localStorage