let urlKanap = "http://localhost:3000/api/products";
/*
Récuperation des données de l'api 

*/
fetch(urlKanap)
  .then((response) => response.json())
  .then((data) => {
    const baliseSection = document.createElement("section");
    baliseSection.classList.add("items");
    baliseSection.id = "items";
    const selectDivLimitedWidthBlock = document.querySelector(
      "main .limitedWidthBlock"
    );
    selectDivLimitedWidthBlock.appendChild(baliseSection);

    // pour chaque canapé dans le tableau (chaque élément dans le array)
    for (sofa of data) {
      /*
           Creation des Balises A,article,img,H3 et P 
      */
      const baliseA = document.createElement("a");
      baliseSection.appendChild(baliseA);
      baliseA.href = `./product.html?id=${sofa._id}`;

      const baliseArticle = document.createElement("article");
      baliseA.appendChild(baliseArticle);

      const baliseImg = document.createElement("img");
      baliseImg.src = sofa.imageUrl;
      baliseImg.alt = sofa.altTxt;
      baliseArticle.appendChild(baliseImg);

      const baliseh3 = document.createElement("h3");
      baliseh3.classList.add("productName");
      baliseArticle.appendChild(baliseh3);
      baliseh3.innerText = sofa.name;

      const baliseP = document.createElement("p");
      baliseP.classList.add("productDescription");
      baliseArticle.appendChild(baliseP);
      baliseP.innerText = sofa.description;
    }
  });
