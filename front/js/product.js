





const str = window.location.href;
var url = new URL(str);
var id = url.searchParams.get("id");               // Recuperer l'Id du canapé 
console.log(id);
let UrlProduct = `http://localhost:3000/api/products/${id}`;   
console.log(UrlProduct);
fetch (UrlProduct)                                             // Recevoir les données du canapé 
  .then( response =>response.json())
  .then(data=>{
     console.log(data);
for (Canape in data){}

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
})

const button = document.querySelector('#addToCart');
button.addEventListener("click", function() {
  let ProduitsChoisie ={    
      idChoisie: id,
     ColorChoisie : document.querySelector('#colors  ').value,    // Recupere la couleur Choisie
      quantite :parseInt(document.querySelector('#quantity').value),         // Recupere la quantitée Voulue 
  }

let ProduitInLocalStorage = JSON.parse(localStorage.getItem("Produit"));
ProduitInLocalStorage = [];

if (localStorage.getItem("Produits")){                                        // si il y a deja un objet dans le localStorage 
  ProduitInLocalStorage = JSON.parse(localStorage.getItem("Produits"));       // on recupere ce quil y a deja pour l'ajouter à ProduitInLocalStorage  transformé JS
 
  const IdDejaPresent = ProduitInLocalStorage.filter(Produits =>   ProduitsChoisie.idChoisie === Produits.id );
  const ColorDejaPresente = ProduitInLocalStorage.filter(Produits =>  ProduitsChoisie.ColorChoisie === Produits.ColorChoisie);
  
if (IdDejaPresent && ColorDejaPresente){
  let Total =  ProduitInLocalStorage[0].quantite + ProduitsChoisie.quantite;
  console.log("Ce produit est deja de votre panier il y en a maintenant  : ", Total);
for (Produits of ProduitInLocalStorage){
  if (Produits.ColorChoisie === ProduitsChoisie.ColorChoisie && Produits.idChoisie === ProduitsChoisie.idChoisie){
          Produits.quantite = Total;
      console.log(ProduitInLocalStorage);     
  }
}
  
 } else{
    ProduitInLocalStorage.push(ProduitsChoisie) ;                   // On envoie les elements voulu dans le localStorage 
    localStorage.setItem("Produits", JSON.stringify(ProduitInLocalStorage));
     }
  
 
  
}else{  
  ProduitInLocalStorage.push(ProduitsChoisie ) ;                        // On envoie les elements voulu dans le localStorage 
  localStorage.setItem("Produits", JSON.stringify(ProduitInLocalStorage));         // on transforme en format Json 
  console.log(ProduitInLocalStorage);
}


})



     