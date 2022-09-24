let totalprice = 0
let  jsondata = {}

let idArray = []
let products = idArray

//Affichage du panier
async function panier () { 
    
    // recuperation des id produits depuis le local storage vers nbpanier
    // let nbpanier = window.localStorage.getItem('nbpanier')
    
    // // conversion en entier
    // nbpanier = parseInt(nbpanier);
    let panierString = window.localStorage.getItem("panier")
    let panier = JSON.parse(panierString)
    console.log(panier)
    //recuperation de la liste des produits depuis l'api
    const response = await fetch(`http://localhost:3000/api/products/`);  
    const productsdata = await response.json();
    //conversion de la reponse  
    
    // L'id de chaque produit est récupérer dans productdataid puis stocker dans jsondata
    for(let productdata of productsdata){
        
        let productdataid = productdata["_id"]
        
        jsondata[productdataid] = productdata
    }
    console.log(jsondata)    
    
    
    for(let key in panier){

        let id = key
        let article = panier[id]

        for( let color in article){
            number = article[color] 

            
            idArray.push(id)
            let productdata = jsondata[id]           

            
            //remplacement html par creation de balise  et d'attribut - innerTEXT
            const productdetails = document.createElement("article");
                productdetails.classList.add("cart__item");
                productdetails.setAttribute("data-id", id);
                productdetails.setAttribute("data-color", color); 

                const cart__item__img = document.createElement("div")
                    cart__item__img.classList.add("cart__item__img");                
                    productdetails.appendChild(cart__item__img);

                    const eimg = document.createElement("img")
                        eimg.src = productdata['imageUrl']
                        eimg.setAttribute("alt", "Photographie d'un canapé");
                        cart__item__img.appendChild(eimg)

                                     
                const cart__item__content = document.createElement("div")
                    cart__item__content.classList.add("cart__item__content");
                    productdetails.appendChild(cart__item__content);

                    const cart__item__content__description = document.createElement("div")
                        cart__item__content__description.classList.add("cart__item__content__description")
                        cart__item__content.appendChild(cart__item__content__description)   
                    
                        const descriptionTitle = document.createElement("h2")
                            descriptionTitle.innerText = productdata['name'];                            
                            cart__item__content__description.appendChild(descriptionTitle);

                        const descriptionColor =  document.createElement("p")  
                            descriptionColor.innerText = color;
                            cart__item__content__description.appendChild(descriptionColor);

                        const descriptionPrice =  document.createElement("p")  
                            descriptionPrice.innerText = productdata['price']+" €";
                            cart__item__content__description.appendChild(descriptionPrice);


                    const cart__item__content__settings = document.createElement("div")
                        cart__item__content__settings.classList.add("cart__item__content__settings")
                        cart__item__content.appendChild(cart__item__content__settings)

                        const cart__item__content__settings__quantity = document.createElement("div")
                            cart__item__content__settings__quantity.classList.add("cart__item__content__settings__quantity")
                            cart__item__content__settings.appendChild(cart__item__content__settings__quantity)

                                const descriptionQuantity =  document.createElement("p")
                                    descriptionQuantity.setAttribute("id", "nbr"+id+color)
                                    descriptionQuantity.innerText = "Qté :"+number;
                                    cart__item__content__settings__quantity.appendChild(descriptionQuantity);

                                const descriptionSelectQuantity = document.createElement("input")
                                    descriptionSelectQuantity.setAttribute("type", "number")
                                    descriptionSelectQuantity.setAttribute("onchange", "changer(this, '"+id+"','"+color+"')")
                                    descriptionSelectQuantity.classList.add("itemQuantity")
                                    descriptionSelectQuantity.setAttribute("name","itemQuantity")
                                    descriptionSelectQuantity.setAttribute("min","1")
                                    descriptionSelectQuantity.setAttribute("max","100")
                                    descriptionSelectQuantity.setAttribute("value", number)
                                    cart__item__content__settings__quantity.appendChild(descriptionSelectQuantity)

                                
                        const cart__item__content__settings__delete = document.createElement("div")
                            cart__item__content__settings__delete.classList.add("cart__item__content__settings__delete")
                            cart__item__content__settings.appendChild(cart__item__content__settings__delete)
                                
                                
                                    const descriptionDeleteButton = document.createElement("p")   
                                    descriptionDeleteButton.setAttribute("onclick", "deleteItem(this, '"+id+"','"+color+"')")
                                    descriptionDeleteButton.innerText = "Supprimer"
                                    cart__item__content__settings__delete.appendChild(descriptionDeleteButton)            
            
            //ajout au html
            document.querySelector("#cart__items").appendChild(productdetails)            

            totalprice += number*productdata.price
        }
        

        
        document.getElementById("totalPrice").innerHTML = totalprice
    }           
    
}
panier ()



async function deleteItem(element, eid, ecolor){   ////
    element.parentNode.parentNode.parentNode.parentNode.innerHTML = ""
    let panierString = window.localStorage.getItem("panier")
    let panier = JSON.parse(panierString)    
    let number
    let productprice = jsondata[eid]['price'] 
     
    for(let key in panier){

        let id = key
        let article = panier[id]

        for( let color in article){
            number = article[color]
            if(id == eid && color == ecolor){
                delete panier[id][color]
                let index = idArray.indexOf(eid);
                idArray.splice(index, 1); 
                break  
            }
        }
    }
       
    totalprice -= number * productprice  
    document.getElementById("totalPrice").innerHTML = totalprice
    


    newPanierString = JSON.stringify(panier)
    window.localStorage.setItem("panier", newPanierString)   

    // totalprice -= price * newquantity
}

async function changer(element, eid, ecolor){
    let panierString = window.localStorage.getItem("panier")
    let panier = JSON.parse(panierString)
    let newquantity = element.value


    for(let key in panier){

        let id = key
        let article = panier[id]
        
        for( let color in article){
            number = article[color]
            if(id == eid && color == ecolor){
                 panier[id][color] = newquantity
                break  
            }
        }
    }
        
    let productprice = jsondata[eid]['price']    
    


    if(newquantity > number){
        totalprice = totalprice + productprice
    }else {
        totalprice = totalprice - productprice
    }

    document.getElementById(`nbr${eid}${ecolor}`).innerHTML = "Qté :" + newquantity
    // totalprice = ((newquantity > number) ?  totalprice + productprice : totalprice - productprice)
    // // totalprice = number-price
    document.getElementById("totalPrice").innerHTML = totalprice


    newPanierString = JSON.stringify(panier)
    window.localStorage.setItem("panier", newPanierString)

}


    
document.getElementById('firstName').addEventListener("input", function(event){checkInput()})    
document.getElementById('lastName').addEventListener("input", function(event){checkInput()})  
document.getElementById('address').addEventListener("input", function(event){checkInput()})
document.getElementById('city').addEventListener("input", function(event){checkInput()}) 
document.getElementById('email').addEventListener("input", function(event){checkInput()})       
   // recherche de chiffre dans l'input  
function isThereAnumber (word) {     
    
    let numberFound = false       
    let string = word;
    
    // A chaque caractere issus du string(parametre).
    for(let i = 0; i < string.length; i++)
    {       	
        //string[0] = a        string[1] = b   ...
        let character = string[i]      
        
                //Tente de convertir character en nombre
        character = parseInt(character)         	
    
        //if character is a number then "numberfound" is true
        if(!isNaN(character)){           
            numberFound = true        		
        }      	
    }     
    return numberFound     
} 
      
  //insertion des error msg    
function insertMessage (element, errorMessage){    	 
    element.innerHTML = errorMessage     
} 
      
     
  // verifie la presence de chiffre    
function isThereOnlyLetter(mot){
    var Regex = /^[a-zA-Z-\s]+$/

    let textToTest = mot   

    if(Regex.test(textToTest))
    {      
        return true
    }
    else
    {      
        return false
    }
}
      
function isThisAddress(mot){
    var Regex = /^[a-zA-ZÀ-ÿ-.,0-9 ]*$/

    let textToTest = mot   

    if(Regex.test(textToTest))
    {      
        return true
    }
    else
    {      
        return false
    }
}      
      
   // Regex pour conditionner les caracteres pour email   
function isThisEmail(mot){
    var RegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

    let textToTest = mot    

    if(RegexEmail.test(textToTest))  //si le rest est reussi
    {      
        return true
    }
    else
    {      
        return false
}
}       
    
    //Fonctions regroupée 
function checkInput(){    //La fonction checkInput regroupe les 3 fonctions
    if(
        checkPrenomNomVille('firstName') &&
        checkPrenomNomVille('lastName') &&
        checkPrenomNomVille ('city')  &&
        checkAdresse('address') &&
        checkEmail('email')){
            return true
        }else{
            return false
        }
}
      
    // Verifie les inputs Prenom Nom et Ville soit true sinon Envoi de MSG d'erreur
function checkPrenomNomVille(elementId){
    
    let output = document.getElementById(elementId).value  //recupere la valeur
    let outputError = document.getElementById(`${elementId}ErrorMsg`) //les parametre id et le msg a envoyer
    let thereisOnlyLetter = isThereOnlyLetter(output)                   // lance la fonction is thereOnlyLetter et recupere le resultat dans thereIsOnlyLetter en true ou false
        
    if(output != "" && thereisOnlyLetter == false)        //si output n'est pas vide et que le test caractere only est false alors msg derreur
    { 
        insertMessage(outputError , "Mauvais caractère <3")
        return false
    }
    else
    {
        insertMessage(outputError , "") 
        return true          
    }        
}      
      
    // verifie l'input adresse  
function checkAdresse(elementId){

    let output = document.getElementById(elementId).value
    let outputError = document.getElementById(`${elementId}ErrorMsg`)
    let thisIsAddress = isThisAddress(output)      

    if(output != "" && thisIsAddress == false)
    { 
        insertMessage(outputError , "Mauvais caractère <3") 
        return false      
    }
    else
    {
        insertMessage(outputError , "") 
        return true          
    }        
} 

    //vérifie que l'input email soit true sinon envoie un msg d'erreur    
function checkEmail(elementId){

    let output = document.getElementById(elementId).value
    let outputError = document.getElementById(`${elementId}ErrorMsg`)                 
    let thisIsEmail = isThisEmail(output) 
    
    if(output != "" && thisIsEmail == false)
    { 
        insertMessage(outputError , "Mauvais caractère <3") 
        return false    
    }
    else
    {
        insertMessage(outputError , "")
        return true
    }        
}
      
const formulaireAvis = document.querySelector(".cart__order__form").addEventListener("submit", async function (event) {
   //stop l'action par defaut
   event.preventDefault()	
    
   if(checkInput() == false) {
    alert("Il y a une erreur dans votre formulaire")
    return
   }    
   

   let contact = {
     firstName: event.target.querySelector("[name=firstName]").value,
     lastName: event.target.querySelector("[name=lastName]").value,     
     address: event.target.querySelector("[name=address]").value,
     city: event.target.querySelector("[name=city]").value,
     email: event.target.querySelector("[name=email]").value,
   };
      
    
   
    let bodyToSend = {contact:contact, products: idArray}
    bodyToSend = JSON.stringify(bodyToSend)
   
    // Appel de la fonction fetch avec toutes les informations nécessaires
    let orderForm = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: bodyToSend
   })

    let data = await orderForm.json()  
    console.log(data)
    console.log(idArray)
    window.location.replace(`./confirmation.html?orderid="${data.orderId}"`) 

    localStorage.clear();
});
// localStorage.clear();