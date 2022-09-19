async function init() {
  const response = await fetch("http://localhost:3000/api/products/");                              //requete l'API et attend sa reponse.
  const productsdata = await response.json();                                                       // attend la conversion du resultat en .json
  
  for (let i = 0; i < productsdata.length; i++) {
                                                                                                //boucle qui parcourt chaque element du json+1 en changeant les informations necessaires
    

    const articles = document.createElement("a");
    articles.setAttribute("href",`./product.html?id=${productsdata[i]["_id"]}`);

      const eArticle = document.createElement("article");
        articles.appendChild(eArticle) ;
        
        const eimg = document.createElement("img");
          eimg.src = `${productsdata[i]["imageUrl"]}`
          eimg.setAttribute("alt",`${productsdata[i]["altTxt"]}`)
          eArticle.appendChild(eimg);

        const productName =  document.createElement("h3")
          productName.classList.add("productName")
          productName.innerText = `${productsdata[i]["name"]}`
          eArticle.appendChild(productName);

        const productDescription =  document.createElement("p") 
          productDescription.classList.add("productDescription")
          productDescription.innerText = `${productsdata[i]["description"]}`
          eArticle.appendChild(productDescription);
    
    document.querySelector("#items").appendChild(articles)      

  }  
                                              
}
init();


