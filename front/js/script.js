async function init() {
  const response = await fetch("http://localhost:3000/api/products/");                              //requete l'API et attend sa reponse.
  const productsdata = await response.json();                                                       // attend la conversion du resultat en .json
  //  console.log(productsdata);                                                            //console log for testing purpose
  //  console.log(productsdata[2]['name']);
  let articles = ``; //declaration de la variable articles
  for (let i = 0; i < productsdata.length; i++) {
                                                                                                //boucle qui parcourt chaque element du json+1 en changeant les informations necessaires
    articles += `<a href="./product.html?id=${productsdata[i]["_id"]}"><article>
        <img src="${productsdata[i]["imageUrl"]}" alt="${productsdata[i]["altTxt"]}">
        <h3 class="productName">${productsdata[i]["name"]}</h3>
        <p class="productDescription">${productsdata[i]["description"]}</p>
        </article></a>`;
  }
  document.getElementById("items").innerHTML = articles;                                            // html dans section id items
}
init();
