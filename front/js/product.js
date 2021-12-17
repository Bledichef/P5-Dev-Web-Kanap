const str = window.location.href;
var url = new URL(str);
let id = url.searchParams.get("id"); // Recuperer l'Id du canapé

let UrlProduct = `http://localhost:3000/api/products/${id}`;

fetch(UrlProduct) // Recevoir les données du canapé
  .then((response) => response.json())
  .then((data) => {
    let photo = document.querySelector(".item__img");
    const baliseImg = document.createElement("img");
    baliseImg.src = data.imageUrl; // Recupere l'image dans l'api
    baliseImg.alt = data.altTxt; // récupère le alt
    photo.appendChild(baliseImg); // Ajoute l'image dans le Html

    let Nom = document.querySelector("#title"); // Recupere id Title
    Nom.innerText = data.name; // Ajoute le nom du Canape dans Title

    let Prix = document.querySelector("#price"); // Recupere id Price
    Prix.innerText = data.price; // Ajoute le Prix

    let Texte = document.querySelector("#description"); // Recupere le id descpription
    Texte.innerText = data.description; // Ajoute la description produit sur la page

    let PlaceColors = document.querySelector("select"); //Recupere le id select
    for (i = 0; i < data.colors.length; i++) {
      // Boucle pour chaque couleur
      let option = document.createElement("option"); // creer un element option pour chaque couleur
      option.setAttribute("value", data.colors[i]); // ajoute les attributs provenant de data.colors
      option.textContent = data.colors[i]; // ajoute le texte de la couleur concernée
      PlaceColors.appendChild(option); // ajoute la balise option dans PlaceColors
    }

    const button = document.querySelector("#addToCart");
    button.addEventListener("click", function () {
      let ProduitsChoisie = {
        imageChoisie: data.imageUrl,
        NomChoisie: data.name,
        PrixChoisie: data.price,
        AltTxtChoisie: data.altTxt,
        idChoisie: parseInt(id),
        ColorChoisie: document.querySelector("#colors").value, // Recupere la couleur Choisie
        quantite: parseInt(document.querySelector("#quantity").value), // Recupere la quantitée Voulue
      };
      let ProduitInLocalStorage = [];

      if (ProduitsChoisie.ColorChoisie < 1) {
        alert("Choisissez une couleur ");
      } else {
        if (ProduitsChoisie.quantite < 1) {
          alert("Choisissez une quantitée entre 1 et 100 ");
        } else {
          if (ProduitsChoisie.quantite > 100) {
            alert("Choisissez une quantitée entre 1 et 100 ");
          } else {
            if (localStorage.getItem("Produits")) {
              ProduitInLocalStorage = JSON.parse(
                localStorage.getItem("Produits")
              );
              const DejaPresent = ProduitInLocalStorage.filter(
                (product) =>
                  product.ColorChoisie === ProduitsChoisie.ColorChoisie &&
                  product.idChoisie === ProduitsChoisie.idChoisie
              );

              if (DejaPresent.length) {
                let Total = ProduitsChoisie.quantite + DejaPresent[0].quantite;

                console.log(
                  "Ce produit est deja de votre panier il y en a maintenant  : ",
                  Total
                );

                const IndexDejaPresent = ProduitInLocalStorage.indexOf(
                  DejaPresent[0]
                );

                ProduitInLocalStorage[IndexDejaPresent].quantite = Total;
              } else {
                ProduitInLocalStorage.push(ProduitsChoisie);
              }
              localStorage.setItem(
                "Produits",
                JSON.stringify(ProduitInLocalStorage)
              );
            } else {
              ProduitInLocalStorage.push(ProduitsChoisie); // On envoie les elements voulu dans le localStorage
              localStorage.setItem(
                "Produits",
                JSON.stringify(ProduitInLocalStorage)
              ); // on transforme en format Json
              console.log(ProduitInLocalStorage);
            }

            console.log("produit ajouté => ", ProduitsChoisie);
            alert("Votre produit est ajouté au panier.");
          }
        }
      }
    });
  });
