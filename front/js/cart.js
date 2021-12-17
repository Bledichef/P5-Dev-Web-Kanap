let ProduitsValide = JSON.parse(localStorage.getItem("Produits"));

////////////////////////////// Affichage des elements dans le panier

if (ProduitsValide === null || ProduitsValide == 0) {
  document.getElementById("cart__items").innerHTML += `
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
  /* 
Pour chaque canapé du LS on met dans le tableau vide la quantité choisie
On additionne entre elles toutes les données du tableau
On affiche dans la balise totalQuantity le résulat obtenu 
*/
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
  /* 
Pour chaque canapé du LS on récupère le prix et la quantité et on les multiplie
on met la quantité obtenue dans le tableau vide et on additionne tous les chiffres du tableau
on affiche ds la balise totalPrice le résultat obtenu
*/
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
  /*
Pour chaque balise delete,  on récupère l'id + la couleur de l'élément avec closest 
au click sur la balise on cible le canapé à supprimer avec la double condition
on récupère l'index ds productInStorage de ce canapé + on le supprime. 
On envoi le nouveau ProduitsValide ds LocalStorage
  */
  const Delete = document.querySelectorAll(".deleteItem");
  Delete.forEach((tag) => {
    const tagClosest = tag.closest("article");

    const id = tagClosest.dataset.id;

    const article = tagClosest;

    const color = tagClosest.dataset.color;

    tag.addEventListener("click", (event) => {
      event.preventDefault();
      ProduitsValide.forEach((sofa) => {
        if (sofa.idChoisie == id && sofa.ColorChoisie == color) {
          let index = ProduitsValide.indexOf(sofa); // récupération index du canapé
          if (confirm("Voulez vous supprimer cet article de votre panier?")) {
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

  /* 
Pour chaque balise quantity, on récupère le data-id de l'élément avec closest, et le data-color
Au "change" sur la balise on définit la nouvelle quantité (la value du tag) et on la met ds une variable
On cible le canapé sur lequel on modifie quantité avec la double condition
On donne ds ProduitValidé la nouvelle valeur à quantité de ce canapé
On envoi le nouveau ProduitValide ds LocalStorage
*/

  const tagQuantity = document.querySelectorAll(".itemQuantity");
  tagQuantity.forEach((tag) => {
    const tagClosest = tag.closest("article");
    let newQuantity = "";
    const id = tagClosest.dataset.id;
    const color = tagClosest.dataset.color;

    tag.addEventListener("change", (event) => {
      event.preventDefault();
      newQuantity = Number(tag.value); // la nouvelle quantité est la value de la balise quantité
      ProduitsValide.forEach((sofa) => {
        // Pour chaque canapé mis ds le panier, si l'id est le même que celui récupéré -> on cible le canapé

        if (sofa.idChoisie == id && sofa.ColorChoisie == color) {
          sofa.quantite = newQuantity; // la quantité des produits du panier se met à jour et devient égale à la nouvelle quantité
        }
      });

      localStorage.setItem("Produits", JSON.stringify(ProduitsValide));
      prixToltal(ProduitsValide);
      quantiteArticleTotal(ProduitsValide);
    });
  });
}

const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
const addressErrorMsg = document.getElementById("addressErrorMsg");
const cityErrorMsg = document.getElementById("cityErrorMsg");
const emailErrorMsg = document.getElementById("emailErrorMsg");
const buttonValidation = document.getElementById("order");

//  fonction pour  Envoi du formulaire à l'api

function sendForm(ProduitsValide, contact) {
  let products = [];
  for (let i = 0; i < ProduitsValide; i++) {
    let productId = ProduitsValide.idChoisie;
    products.push(productId);
  }

  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contact, products }),
  })
    .then((response) => response.json())
    .then((data) => {
      window.location = `confirmation.html?orderId=${data.orderId}`; // redirection vers page confirmation
    })
    .catch((e) =>
      console.log("il y a une erreur sur la page cart de type :" + e)
    );
}

/* 
Au clic : 
Récupère les valeurs des champs des formulaires
Appelle la fonction verifyForm avec les bons paramètres pour vérifier chaque champ et afficher les messsages d'erreur
Créé un objet contact avec les values du formulaire
Appelle la fonction d'envoi du formulaire si la  vérification est ok et si panier non vide
*/
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
