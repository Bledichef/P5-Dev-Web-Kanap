const str = window.location.href;
var url = new URL(str);
 id = url.searchParams.get("id");               // Recuperer l'Id du canapé 
console.log(id)
let UrlProduct = `http://localhost:3000/api/products/${id}`;   
console.log(UrlProduct);
fetch (UrlProduct)                                             // Recevoir les données du canapé 
  .then( response =>response.json())
  .then(data=>{
     console.log(data);


let photo = document.querySelector('.item__img')    
const baliseImg = document.createElement('img');
baliseImg.src = data.imageUrl;  // Recupere l'image dans l'api 
baliseImg.alt = data.altTxt; // récupère le alt 
photo.appendChild(baliseImg);   // Ajoute l'image dans le Html

let Nom = document.querySelector('#title');  // Recupere id Title
Nom.innerHTML = data.name;    // Ajoute le nom du Canape dans Title 

let Prix = document.querySelector('#price');  // Recupere id Price
Prix.innerHTML = data.price;             // Ajoute le Prix 

let Texte = document.querySelector('#description'); // Recupere le id descpription 
Texte.innerHTML = data.description;  // Ajoute la description produit sur la page 

let PlaceColors = document.querySelector("select");    //Recupere le id select
for (i=0; i<data.colors.length; i++  ){                     // Boucle pour chaque couleur        
let option = document.createElement("option");              // creer un element option pour chaque couleur 
option.setAttribute("value", data.colors[i]);               // ajoute les attributs provenant de data.colors 
option.textContent = data.colors[i];                        // ajoute le texte de la couleur concernée   
PlaceColors.appendChild(option);                             // ajoute la balise option dans PlaceColors

}

const button = document.querySelector('#addToCart');
button.addEventListener("click", function() {
  console.log(data.name)
  let ProduitsChoisie =   {  
    imageChoisie: data.imageUrl,
    NomChoisie: data.name,
    PrixChoisie : data.price,
    AltTxtChoisie: data.altTxt,
    idChoisie: parseInt(id),
    ColorChoisie : document.querySelector('#colors').value,    // Recupere la couleur Choisie
    quantite :parseInt(document.querySelector('#quantity').value),         // Recupere la quantitée Voulue 
  }
 
let ProduitInLocalStorage = [];

if (localStorage.getItem("Produits")) {
  console.log(localStorage)
 ProduitInLocalStorage = JSON.parse(localStorage.getItem("Produits"));
  const DejaPresent = ProduitInLocalStorage.filter(product => product.ColorChoisie === ProduitsChoisie.ColorChoisie && product.idChoisie === ProduitsChoisie.idChoisie)
   console.log(DejaPresent.length)
   console.log(ProduitsChoisie.ColorChoisie)
   console.log(ProduitInLocalStorage) 
    if (DejaPresent.length){
      let Total =  ProduitsChoisie.quantite+ DejaPresent[0].quantite ;
       console.log(DejaPresent[0].quantite);
       console.log("Ce produit est deja de votre panier il y en a maintenant  : ", Total);
       console.log(DejaPresent[0])
        const IndexDejaPresent = ProduitInLocalStorage.indexOf(DejaPresent[0])
         console.log(IndexDejaPresent)
          ProduitInLocalStorage[IndexDejaPresent].quantite = Total;
 
     } else{
      ProduitInLocalStorage.push(ProduitsChoisie);
  }
  localStorage.setItem("Produits", JSON.stringify(ProduitInLocalStorage));
 
 } 
else{  
  console.log(ProduitsChoisie)
   ProduitInLocalStorage.push(ProduitsChoisie) ;                        // On envoie les elements voulu dans le localStorage 
    localStorage.setItem("Produits", JSON.stringify(ProduitInLocalStorage));         // on transforme en format Json 
     console.log(ProduitInLocalStorage);
}

console.log("produit ajouté => ",ProduitsChoisie)

  })

  })
     