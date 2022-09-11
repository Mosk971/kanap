document.getElementById("orderId").innerHTML = "00000020";

const surplus = window.location.search; //recupere le surplus et lurl actuelle
const urlParams = new URLSearchParams(surplus);
productid = urlParams.get("orderid");
console.log(productid)

document.getElementById("orderId").innerHTML = productid;
