let totalprice = 0
let  jsondata = {}

async function panier () {      

    
    
    let nbpanier = window.localStorage.getItem('nbpanier')    
    nbpanier = parseInt(nbpanier);

    const response = await fetch(`http://localhost:3000/api/products/`);  
    const productsdata = await response.json();
    
    
    
    for(let productdata of productsdata){
        console.log(productdata["_id"])
        let productdataid = productdata["_id"]
        jsondata[productdataid] = productdata
    }
    console.log(jsondata)
    
    
    
    
    for(let i = 0; i < nbpanier ; i++ ){
            console.log(i)
                                                             //  window.localStorage.setItem(i+1, "")
        let articledata = window.localStorage.getItem(i+1)
        
        if(articledata == ''){
            console.log("vide")
            continue
        }

        let articlearray = articledata.split(",")

        let id = articlearray[0]
        let color = articlearray[1]
        let number = articlearray[2] 
        console.log(articlearray)


        let productdata = jsondata[id]

        let productdetails = `<article class="cart__item" data-id="${id}" data-color="${color}">
            <div class="cart__item__img">
                <img src="${productdata['imageUrl']}" alt="Photographie d'un canapé">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${productdata['name']}</h2>
                    <p>${color}</p>
                    <p>${productdata['price']}</p>
                </div>
                <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p id="nbr${id}">Qté :${number}</p>
                        <input type="number" onchange ="changer(this, '${i+1}')" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${number}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" onclick ="deleteItem(this, '${i+1}')" >Supprimer</p>
                    </div>
                </div>
            </div>
            </article>`

        document.getElementById("cart__items").innerHTML += productdetails

        totalprice += number*productdata.price
        document.getElementById("totalPrice").innerHTML = totalprice
    }           

}
panier ()

async function deleteItem(element, id){
    element.parentNode.parentNode.parentNode.parentNode.innerHTML = ""
    window.localStorage.setItem(id,'')
    
    console.log(id)
}

async function changer(element, id){
    let olddata =window.localStorage.getItem(id)
    
    let articlearray = olddata.split(",")

    let id1 = articlearray[0]
    let color = articlearray[1]
    let number = articlearray[2] 
    console.log(jsondata[id1]['price'])
    let productprice = jsondata[id1]['price']        
      

    let newquantity = element.value
    window.localStorage.setItem(id, [id1,color,newquantity])


if(newquantity > number){
    totalprice = totalprice + productprice
}else {
    totalprice = totalprice - productprice
}
document.getElementById(`nbr${id1}`).innerHTML = "Qté :" + newquantity
// totalprice = ((newquantity > number) ?  totalprice + productprice : totalprice - productprice)
// // totalprice = number-price
document.getElementById("totalPrice").innerHTML = totalprice
}
    

