let ProduitsValide = JSON.parse(localStorage.getItem("Produits")) || [];



for (let sofa of ProduitsValide){


let ProduitDejaPresent = (sofa.idChoisie == ProduitsValide.idChoisie & sofa.ColorChoisie == ProduitsValide.ColorChoisie);
let TotalElementPanier = (sofa.quantite+ProduitsValide.quantite);

if(ProduitDejaPresent) {
 document.getElementsByName("itemQuantity").innerHTML =` 
 <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${TotalElementPanier}"`
}
  

else{
    document.getElementById("cart__items").innerHTML +=`

      <article class="cart__item" data-id=${sofa.idChoisie}>
    <div class="cart__item__img">
      <img src=${sofa.imageChoisie} alt=${sofa.AltTxtChoisie}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${sofa.NomChoisie}</h2>
        <p>${sofa.PrixChoisie} €</p>
      </div>
      <div class="cart__item__content__settings">
      <p>Couleur : ${sofa.ColorChoisie}</p>
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${sofa.quantite} </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${sofa.quantite}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> 
    `
    console.log("Les articles dans le  panier : ", ProduitsValide);
}
}

                                         // qUANTITE TOTAL DANS LE PANIER 
const arrayQuantity = [];
for (let sofa of ProduitsValide){
    arrayQuantity.push(sofa.quantite)
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const totalQuantity = arrayQuantity.reduce(reducer)
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    
}

if(arrayQuantity.length === 0){
    document.querySelector("h1").innerHTML = "Le panier est vide";
    totalQuantity = "";
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
}

///////////////////////////////////// Prix total
let totalPriceQuantity = "";
let arrayPrice = [];

for (let sofa of ProduitsValide){ 
    totalPriceQuantity = sofa.PrixChoisie * sofa.quantite
    arrayPrice.push(totalPriceQuantity)
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const totalPrice = arrayPrice.reduce(reducer);
    document.getElementById("totalPrice").innerHTML = totalPrice
}
if(arrayPrice.length === 0){
    totalPriceQuantity = "";
    document.getElementById("totalPrice").innerHTML = totalPriceQuantity;
}
