import { productos } from "./data.js";

const all = document.querySelector(".all");
const buttonAll = document.querySelector(".baseball");
const basketball = document.querySelector(".basketball");
const futbol = document.querySelector(".futbol");
const tennis = document.querySelector(".tennis");
const others = document.querySelector(".others");

const cartCounter = document.getElementById("cartCounter");

let counterToCart = 0;

JSON.parse(localStorage.getItem("cart"))?.map((item) => {
  counterToCart = item? counterToCart + item.cantidad : 0;
  return counterToCart
});

all.addEventListener("click", toggleClick);
buttonAll.addEventListener("click", toggleClick);
basketball.addEventListener("click", toggleClick);
futbol.addEventListener("click", toggleClick);
tennis.addEventListener("click", toggleClick);
others.addEventListener("click", toggleClick);

cartCounter.innerText = counterToCart? counterToCart< 99 ? counterToCart : '99+':'0';

function toggleClick(e) {
  if (e.target.innerText === "All") {
    const titleSection = document.getElementById("titleSection");
    titleSection.innerText = `Todos los productos`;
    loadAllProducts(productos);
  } else {
    const filterProduct = productos.filter(
      (product) => product.categoria === e.target.innerText.toLowerCase()
    );
    const titleSection = document.getElementById("titleSection");
    titleSection.innerText = `Sección de ${e.target.innerText}`;
    loadAllProducts(filterProduct, e.target.innerText);
  }
}

function loadAllProducts(filterProduct, sectionid) {
  const section = document.getElementById(sectionid? sectionid :"productsSection");
  
  if (section) {
    section.innerHTML = ""; 
    filterProduct.map((producto) => {
      producto.cantidad = 1;

      section.innerHTML += `
                <div class='cardProducts'>
                <img src='./apiProyect/${producto.img}' alt={producto.nombre} width='100px' />
                <h2>${producto.nombre}</h2>
                <h4>${producto.precio}</h4>
                <div class='counter' >
                <div class='containerCounter'>
                <button id='less${producto.id}' >-</button>
                <h3 id='counter${producto.id}'>${producto.cantidad}</h3>
                <button class='plus' id='plus${producto.id}'>+</button>
                </div>
                </div>
               <button  id='add${producto.id}'>Agragar al carrito</button>
                </div>
      
         `;
      document.addEventListener("DOMContentLoaded", function () {
        document
          .getElementById(`less${producto.id}`)
          .addEventListener("click", toggleClickLess, false);
        document
          .getElementById(`plus${producto.id}`)
          .addEventListener("click", toggleClickPlus, false);
        document
          .getElementById(`add${producto.id}`)
          .addEventListener("click", toggleClickAdd, false);
      });
      function toggleClickLess() {
        producto.cantidad > 1 && (producto.cantidad = producto.cantidad - 1);
        const counterText = document.getElementById(`counter${producto.id}`);
        counterText.innerText = producto.cantidad;
      }
      function toggleClickPlus() {
        producto.cantidad = producto.cantidad + 1;
        const counterText = document.getElementById(`counter${producto.id}`);
        counterText.innerText = producto.cantidad;
      }
      function toggleClickAdd() {
        const cart = JSON.parse(localStorage.getItem("cart"));
        if (cart) {
          counterToCart = counterToCart + producto.cantidad
          cartCounter.innerText = counterToCart < 99 ? counterToCart : '99+';
          localStorage.setItem(
            "cart",
            JSON.stringify([
              ...cart,
              { id: producto.id, cantidad: producto.cantidad },
            ])
          );
          producto.cantidad = 1
        const counterText = document.getElementById(`counter${producto.id}`);

        counterText.innerText = producto.cantidad;

        } else {
          counterToCart = counterToCart+ producto.cantidad
          cartCounter.innerText = counterToCart < 99 ? counterToCart : '99+';
          localStorage.setItem(
            "cart",
            JSON.stringify([{ id: producto.id, cantidad: producto.cantidad }])
          );
          producto.cantidad = 1
        }
      }
    });

   
  }
}
loadAllProducts(productos);




