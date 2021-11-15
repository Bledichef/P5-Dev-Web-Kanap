let ProduitsValide = JSON.parse(localStorage.getItem("Produits")) ;
  


////////////////////////////// Visibilité des elements dans le panier 




if (ProduitsValide ===null || ProduitsValide ==0) {
  document.getElementById("cart__items").innerHTML +=`
  <div class="cart__item__img">
  <p> Votre panier est vide </p>
  </div>`


}else { 
  

   
  for (i=0; i < ProduitsValide.length; i++  ){
  
   document.getElementById("cart__items").innerHTML +=`    
  
    

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
    `

  }
  


  
                                         // QUANTITE TOTAL DANS LE PANIER 

       
   function quantiteArticleTotal(ProduitsValide){
  
  const arrayQuantity = [];
   for (let sofa of ProduitsValide){
    arrayQuantity.push(sofa.quantite)
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    const totalQuantity = arrayQuantity.reduce(reducer)
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
    
}

if(arrayQuantity.length === 0){
    document.querySelector("h1").innerHTML = "Panier vide";
    totalQuantity = "";
    document.getElementById("totalQuantity").innerHTML = totalQuantity;
}
}
///////////////////////////////////// Prix total

function prixToltal(ProduitsValide) {
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
}

//////////////////////////////////////// DELETE ARTICLE
 
  const Delete = document.querySelectorAll(".deleteItem"); 
  
  Delete.forEach(tag => {
      const tagClosest = tag.closest("article");
      console.log(tagClosest)
      const id = tagClosest.dataset.id; 
      console.log(id)
      const article = tagClosest;
      console.log(article)
      const color = tagClosest.dataset.color;
      console.log(color)
  
      tag.addEventListener('click', event => {
          event.preventDefault();
          ProduitsValide.forEach(sofa => {
            console.log(sofa)
            console.log(sofa.idChoisie)
            console.log(sofa.ColorChoisie)
            console.log(id)
            console.log(color)
              if (sofa.idChoisie == id && sofa.ColorChoisie == color){ 
                  let index = ProduitsValide.indexOf(sofa) // récupération index du canapé
                  if(confirm("Voulez vous supprimer cet article de votre panier?")){
                    console.log(index)
                      article.remove(); // supprime du DOM
                      ProduitsValide.splice(index, 1); // on retire ce canapé du panier
                  }
              }
          })


      localStorage.setItem("Produits", JSON.stringify(ProduitsValide)); 
      prixToltal(ProduitsValide)
      quantiteArticleTotal(ProduitsValide)
       
        })
  })




///////////////////////////////////////////////////////////////////////// MODIF QUANTITY 


const tagQuantity = document.querySelectorAll(".itemQuantity");

tagQuantity.forEach(tag => {
    const tagClosest = tag.closest("article");
    let newQuantity = "";
    const id = tagClosest.dataset.id; 
    const color = tagClosest.dataset.color;
console.log(tagClosest)
console.log(id)
    tag.addEventListener('change', event => {
        event.preventDefault();
        newQuantity = Number(tag.value); // la nouvelle quantité est la value de la balise quantité
        ProduitsValide.forEach(sofa => { // Pour chaque canapé mis ds le panier, si l'id est le même que celui récupéré -> on cible le canapé 
            
            if (sofa.idChoisie == id  && sofa.ColorChoisie == color){ 
                sofa.quantite = newQuantity // la quantité des produits du panier se met à jour et devient égale à la nouvelle quantité
                
            }
            console.log(id)
            console.log(sofa.idChoisie)
            console.log(color)
            console.log(sofa.ColorChoisie)
            console.log(newQuantity)
            console.log(sofa)
            
        })

    localStorage.setItem("Produits", JSON.stringify(ProduitsValide)); 
    prixToltal(ProduitsValide)
    quantiteArticleTotal(ProduitsValide)
    })
})
}


prixToltal(ProduitsValide)
quantiteArticleTotal(ProduitsValide)

