import { productos } from "./data.js";

const cartBody = document.getElementById("cartBody");
const totalCard = document.getElementById("totalCard");
const finalizar = document.getElementById("finalizar");

const cartEmpy = localStorage.getItem("cart")

finalizar?.addEventListener("click", toggleClick);

function toggleClick() {
  localStorage.clear()
  alert('Su compra ha sido realizada con exito')
}
let total = 0
if(cartEmpy){
JSON.parse(localStorage.getItem("cart")).map((item) => {
    const product = productos.find( producto => producto.id === item.id)
    cartBody.innerHTML += `
    <tr>
    <td><img src= '/apiProyect/${product.img}' alt=${product.nombre} width='30px'/></td>
    <td>${product.nombre}</td>
    <td>${product.precio} $</td>
    <td>${item.cantidad}</td>
    <td>${item.cantidad*product.precio} $</td>
    </tr>
    `;
total += item.cantidad*product.precio
})}
  else{
  cartBody.innerHTML += `
    <tr>
   El carrito se encuentra vacio
    </tr>
    `;
  }

  totalCard.innerText = total