let ProduitsValide = JSON.parse(localStorage.getItem("Produits")) ;
  

////////////////////////////// Visibilité des elements dans le panier 
/*for (let sofa of ProduitsValide){


let ProduitDejaPresent = (sofa.idChoisie == ProduitsValide.idChoisie & sofa.ColorChoisie == ProduitsValide.ColorChoisie);
let TotalElementPanier = (sofa.quantite+ProduitsValide.quantite);

if(ProduitDejaPresent) {
 document.getElementsByName("itemQuantity").innerHTML +=` 
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
}*/



if (ProduitsValide ===null || ProduitsValide ==0) {
  document.getElementById("cart__items").innerHTML +=`
  <div class="cart__item__img">
  <p> Votre panier est vide </p>
  </div>`


}else { 
  

   
  for (i=0; i < ProduitsValide.length; i++  ){
  
   document.getElementById("cart__items").innerHTML +=`    
  
    

      <article class="cart__item" data-id=${ProduitsValide[i].idChoisie}>
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
          <p>Qté : ${ProduitsValide[i].quantite} </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${ProduitsValide[i].quantite}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article> 
    `

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


//////////////////////////////////////// DELETE ARTICLE
 ProduitsValide => {
  const tagDelete = document.querySelectorAll(".deleteItem"); 
  
  tagDelete.forEach(tag => {
      const tagClosest = tag.closest("article");
      const id = tagClosest.dataset.id; 
      const article = tagClosest;
      const color = tagClosest.dataset.color;
  
      tag.addEventListener('click', event => {
          event.preventDefault();
          ProduitsValide.forEach(sofa => {
              if (sofa.idChoisie === id && sofa.ColorChoisie === color){ 
                  let index = ProduitsValide.indexOf(sofa) // récupération index du canapé
                  if(confirm("Voulez vous supprimer cet article de votre panier?")){
                      article.remove(); // supprime du DOM
                      productInStorage.splice(index, 1); // on retire ce canapé du panier
                  }
              }
          })

      localStorage.setItem("products", JSON.stringify(productInStorage)); 

      displayTotalPrice(ProduitsValide);
      displayTotalQuantity(ProduitsValide);        
      })
  })}}
