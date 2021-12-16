let ProduitsValide = JSON.parse(localStorage.getItem("Produits"));
console.log(ProduitsValide);
////////////////////////////// Affichage des elements dans le panier

if (ProduitsValide === null || ProduitsValide == 0) {
  document.getElementById("cart__items").innerText += `
   <div class="cart__item__img">
    <p> Votre panier est vide </p>
    </div>`;
} else {
  for (i = 0; i < ProduitsValide.length; i++) {
    document.getElementById("cart__items").innerHTML += `   
  
    
      <article class="cart__item" data-id=${ProduitsValide[i].idChoisie} data-color="${ProduitsValide[i].ColorChoisie}">
    <div class="cart__item__img">
      <img src=${ProduitsValide[i].imageChoisie} alt=${ProduitsValide[i].AltTxtChoisie}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${ProduitsValide[i].NomChoisie}</h2>
        <p>${ProduitsValide[i].PrixChoisie} €</p>
      </div>
      <div class="cart__item__content__settings">
      <p>Couleur : ${ProduitsValide[i].ColorChoisie}</p>
        <div class="cart__item__content__settings__quantity">
          <p>Qté :  </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${ProduitsValide[i].quantite}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> 
    `;
  }
  // QUANTITE TOTAL DANS LE PANIER
  function quantiteArticleTotal(ProduitsValide) {
    const arrayQuantity = [];
    for (let sofa of ProduitsValide) {
      arrayQuantity.push(sofa.quantite);
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue;
      const totalQuantity = arrayQuantity.reduce(reducer);
      document.getElementById("totalQuantity").innerText = totalQuantity;
    }

    if (arrayQuantity.length === 0) {
      document.querySelector("h1").innerText = "Panier vide";
      totalQuantity = "";
      document.getElementById("totalQuantity").innerText = totalQuantity;
    }
  }
  ///////////////////////////////////// Prix total
  function prixToltal(ProduitsValide) {
    let totalPriceQuantity = "";
    let arrayPrice = [];
    for (let sofa of ProduitsValide) {
      totalPriceQuantity = sofa.PrixChoisie * sofa.quantite;
      arrayPrice.push(totalPriceQuantity);
      const reducer = (previousValue, currentValue) =>
        previousValue + currentValue;
      const totalPrice = arrayPrice.reduce(reducer);
      document.getElementById("totalPrice").innerText = totalPrice;
    }
    if (arrayPrice.length === 0) {
      totalPriceQuantity = "";
      document.getElementById("totalPrice").innerText = totalPriceQuantity;
    }
  }
  //////////////////////////////////////// DELETE ARTICLE
  const Delete = document.querySelectorAll(".deleteItem");
  Delete.forEach((tag) => {
    const tagClosest = tag.closest("article");
    console.log(tagClosest);
    const id = tagClosest.dataset.id;
    console.log(id);
    const article = tagClosest;
    console.log(article);
    const color = tagClosest.dataset.color;
    console.log(color);

    tag.addEventListener("click", (event) => {
      event.preventDefault();
      ProduitsValide.forEach((sofa) => {
        console.log(sofa);
        console.log(sofa.idChoisie);
        console.log(sofa.ColorChoisie);
        console.log(id);
        console.log(color);
        if (sofa.idChoisie == id && sofa.ColorChoisie == color) {
          let index = ProduitsValide.indexOf(sofa); // récupération index du canapé
          if (confirm("Voulez vous supprimer cet article de votre panier?")) {
            console.log(index);
            article.remove(); // supprime du DOM
            ProduitsValide.splice(index, 1); // on retire ce canapé du panier
          }
        }
      });

      localStorage.setItem("Produits", JSON.stringify(ProduitsValide));
      prixToltal(ProduitsValide);
      quantiteArticleTotal(ProduitsValide);
    });
  });
  ///////////////////////////////////////////////////////////////////////// MODIF QUANTITY
  const tagQuantity = document.querySelectorAll(".itemQuantity");
  tagQuantity.forEach((tag) => {
    const tagClosest = tag.closest("article");
    let newQuantity = "";
    const id = tagClosest.dataset.id;
    const color = tagClosest.dataset.color;
    console.log(tagClosest);
    console.log(id);
    tag.addEventListener("change", (event) => {
      event.preventDefault();
      newQuantity = Number(tag.value); // la nouvelle quantité est la value de la balise quantité
      ProduitsValide.forEach((sofa) => {
        // Pour chaque canapé mis ds le panier, si l'id est le même que celui récupéré -> on cible le canapé

        if (sofa.idChoisie == id && sofa.ColorChoisie == color) {
          sofa.quantite = newQuantity; // la quantité des produits du panier se met à jour et devient égale à la nouvelle quantité
        }
        console.log(id);
        console.log(sofa.idChoisie);
        console.log(color);
        console.log(sofa.ColorChoisie);
        console.log(newQuantity);
        console.log(sofa);
      });

      localStorage.setItem("Produits", JSON.stringify(ProduitsValide));
      prixToltal(ProduitsValide);
      quantiteArticleTotal(ProduitsValide);
    });
  });
}
//  CONDITIONS FORMULAIRE
const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");
const buttonValidation = document.getElementById("order");

//   Envoi du formulaire à l'api
function sendForm(ProduitsValide, contact) {
  let products = [];
  for (let i = 0; i < ProduitsValide; i++) {
    let productId = ProduitsValide.idChoisie;
    products.push(productId);
  }
  console.log(ProduitsValide);
  console.log(contact);
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contact, products }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      window.location = `confirmation.html?orderId=${data.orderId}`; // redirection vers page confirmation
    })
    .catch((e) =>
      console.log("il y a une erreur sur la page cart de type :" + e)
    );

  console.log(products);
}
const buttonValidate = document.getElementById("order");
const regexNameCity = /^[a-zA-ZÀ-ÿ_-]{2,60}$/;
const regexAddress = /^[#.0-9a-zA-ZÀ-ÿ\s,-]{2,60}$/;
const regexEmail = /^[^@\s]{2,30}@[^@\s]{2,30}\.[^@\s]{2,5}$/;

buttonValidate.addEventListener("click", (event) => {
  event.preventDefault();
  prenom = document.querySelector("#firstName").value;
  nom = document.querySelector("#lastName").value;
  adresse = document.querySelector("#address").value;
  ville = document.querySelector("#city").value;
  mail = document.querySelector("#email").value;

  verifyForm(prenom, firstNameErrorMsg, regexNameCity);
  verifyForm(nom, lastNameErrorMsg, regexNameCity);
  verifyForm(adresse, addressErrorMsg, regexAddress);
  verifyForm(ville, cityErrorMsg, regexNameCity);
  verifyForm(mail, emailErrorMsg, regexEmail);
  const contact = {
    firstName: prenom,
    lastName: nom,
    address: adresse,
    city: ville,
    email: mail,
  };

  console.log(lastNameErrorMsg);
  console.log(addressErrorMsg);
  console.log(cityErrorMsg);
  console.log(prenom);
  if (
    verifyForm(prenom, firstNameErrorMsg, regexNameCity) &&
    verifyForm(nom, lastNameErrorMsg, regexNameCity) &&
    verifyForm(adresse, addressErrorMsg, regexAddress) &&
    verifyForm(ville, cityErrorMsg, regexNameCity) &&
    verifyForm(mail, emailErrorMsg, regexEmail) &&
    ProduitsValide.length >= 1
  ) {
    sendForm(ProduitsValide, contact);
  } else {
    console.log("erreur sur le formulaire");
    alert("verifier le formulaire, il comporte une ou plusieurs erreurs");
  }
});
// Fonction qui verifie la présence de données dans les inputs et valide suivant les regexp
function verifyForm(elementContact, elementError, elementRegex) {
  if (elementContact.length === 0) {
    // si le champ de l'input est vide
    elementError.innerText = "Veuillez renseigner ce champ";
    return false;
  } else if (!elementRegex.test(elementContact)) {
    // si champ rempli mais regex non valide
    elementError.innerText = "Format incorrect";
    return false;
  } else {
    // champ ok
    elementError.innerText = "";
    return true;
  }
}

prixToltal(ProduitsValide);
quantiteArticleTotal(ProduitsValide);
