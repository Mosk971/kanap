async function singleproduct() {
  const surplus = window.location.search; //recupere le surplus et lurl actuelle
  const urlParams = new URLSearchParams(surplus); // trie les cles et valeur
  const productid = urlParams.get("id"); //recupere la valeur id
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
    productcolors += `<option value="${productdata['colors'][i]}"> ${productdata['colors'][i]}</option>`
    console.log(productcolors)
    document.getElementById("colors").innerHTML = productcolors;
  }
}
singleproduct();

document.getElementById("addToCart").onclick = function(e){
   
  let productquantity = document.getElementById("colors").value;
  let productSelectedColor = document.getElementById("quantity").value;
   console.log(productquantity, productSelectedColor)
}








