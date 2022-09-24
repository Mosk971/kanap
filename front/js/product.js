let productid

async function singleproduct() {
  const surplus = window.location.search; //recupere le surplus et lurl actuelle
  const urlParams = new URLSearchParams(surplus); // trie les cles et valeur
  productid = urlParams.get("id"); //recupere la valeur id
  // console.log(productid);

  const response = await fetch(`http://localhost:3000/api/products/${productid}`);  
  const productdata = await response.json();
  console.log(productdata);

  let picture = `<img src="${productdata['imageUrl']} " alt="Photographie d'un canapé">`;  
  document.getElementsByClassName("item__img")[0].innerHTML = picture;

  let productname = `${productdata['name']}` ;
  document.getElementById("title").innerHTML = productname;

  let productprice = `${productdata['price']}`
  document.getElementById("title").innerHTML = productprice;
  
  let productdescription = `${productdata['description']}`
  document.getElementById("description").innerHTML = productdescription;
  
  let productcolors = ``
  for(let i = 0; i < productdata.colors.length; i++){
    productcolors = `<option value="${productdata['colors'][i]}"> ${productdata['colors'][i]}</option>`
    console.log(productcolors)
    document.getElementById("colors").innerHTML += productcolors;
  }
}
singleproduct();

 //--------------------------------------------------------------------------------------------------------------------
  

document.getElementById("addToCart").onclick = function(e){             //au click lance la fonction
  //recuperation des donnees
  let = productSelectedColor = document.getElementById("colors").value;   //recupere dans une variable la couleur
  let = productquantity = document.getElementById("quantity").value;      //recuepre dans une variable la quantité
  // console.log(productquantity, productSelectedColor)

  if (productSelectedColor == "" ) {                                    //if la valeur de laoculeur choisie est nul alors alerte
    alert("Choisissez une couleur")
    return;
    //  donner du bois a juni !
  } 
  if (productquantity == 0) {                                           //si la quantité est nul alors alerte
    alert('Choisissez une quantité')
    return
  }  
  

//---------version 2

//traitement des donnees

  /*
  panier{
    productid: {
      couleur: quantité
    }
  }
  */


  //conversion en entiers
  productquantity = parseInt(productquantity)  
  
  let oldgetpanier = window.localStorage.getItem("panier")
  let oldpanierjsonObject = JSON.parse(oldgetpanier);
  console.error(oldpanierjsonObject)
  
  let panier = oldpanierjsonObject

  //si panier est vide, creer un object vide.
  if(!panier){
    panier = {}
  }  
  //si panier ne contient pas la clé product id, creer un objet vide.
  if(!panier[productid]){
    panier[productid] = {}     
  }

   //s'il n'y pas la couleur associé a ce productId dans le panier, alors la quantity est 0.
  if(!panier[productid][productSelectedColor]){
    panier[productid][productSelectedColor] = 0
  }

  productquantity = panier[productid][productSelectedColor] + productquantity   

  panier[productid][productSelectedColor] = productquantity
  
  
  
  // soumission des donnees
  let panierJsonString = JSON.stringify(panier)  
  window.localStorage.setItem("panier", panierJsonString)

  
  let getpanier = window.localStorage.getItem("panier")
  let panierjsonObject = JSON.parse(getpanier);

  console.log(panierjsonObject)
  

  window.location.replace(`./cart.html`)
  
}

// localStorage.clear();











