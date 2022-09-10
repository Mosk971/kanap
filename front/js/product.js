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

 //NE PS OUBLIER LE CATCH APRES LE FETCH
 

document.getElementById("addToCart").onclick = function(e){             //au click lance la fonction
  
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

  // window.localStorage.setItem("idofproduct", productid)                   //store localement l'id la couleur et la quantité 
  // window.localStorage.setItem("colorofproduct", productSelectedColor)
  // window.localStorage.setItem("numberofproduct", productquantity)
  

  let nbpanier = window.localStorage.getItem("nbpanier")
  nbpanier = parseInt(nbpanier); 
  nbpanier += 1
  console.log(nbpanier)  
  
  window.localStorage.setItem("nbpanier",nbpanier)
  window.localStorage.setItem(nbpanier,[productid, productSelectedColor, productquantity])

}









