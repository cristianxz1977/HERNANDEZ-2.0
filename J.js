// ======================
// PRODUCTOS
// ======================
const productos = [
 { nombre:"CREED AVENTUS", precio:280, imagen:"perfume1.jpg" },
 { nombre:"BACCARAT ROUGE 540", precio:320, imagen:"perfume2.jpg" },
 { nombre:"DIOR SAUVAGE ELIXIR", precio:260, imagen:"perfume3.jpg" },
 { nombre:"BLEU DE CHANEL", precio:280, imagen:"perfume4.jpg" },
 { nombre:"ASAD LATTAFA", precio:180, imagen:"perfume5.jpg" },
 { nombre:"KHAMRAH", precio:220, imagen:"perfume6.jpg" },

 { nombre:"YSL Y EDP", precio:250, imagen:"perfume7.jpg" },
 { nombre:"YSL Y LE PARFUM", precio:270, imagen:"perfume8.jpg" },
 { nombre:"CHANEL ALLURE HOMME SPORT", precio:290, imagen:"perfume9.jpg" },
 { nombre:"CHANEL PLATINUM ÉGOÏSTE", precio:300, imagen:"perfume10.jpg" },

 { nombre:"DIOR HOMME INTENSE", precio:280, imagen:"perfume11.jpg" },
 { nombre:"DIOR FAHRENHEIT", precio:260, imagen:"perfume12.jpg" },
 { nombre:"DIOR SAUVAGE EDP", precio:250, imagen:"perfume13.jpg" },

 { nombre:"VERSACE EROS", precio:230, imagen:"perfume14.jpg" },
 { nombre:"VERSACE DYLAN BLUE", precio:240, imagen:"perfume15.jpg" },
 { nombre:"VERSACE POUR HOMME", precio:220, imagen:"perfume16.jpg" },

 { nombre:"JEAN PAUL GAULTIER LE MALE", precio:250, imagen:"perfume17.jpg" },
 { nombre:"JPG LE MALE LE PARFUM", precio:280, imagen:"perfume18.jpg" },
 { nombre:"JPG ULTRA MALE", precio:270, imagen:"perfume19.jpg" },

 { nombre:"ARMANI ACQUA DI GIO", precio:240, imagen:"perfume20.jpg" },
 { nombre:"ACQUA DI GIO PROFUMO", precio:290, imagen:"perfume21.jpg" },
 { nombre:"ACQUA DI GIO PROFONDO", precio:280, imagen:"perfume22.jpg" },

 { nombre:"PACO RABANNE 1 MILLION", precio:230, imagen:"perfume23.jpg" },
 { nombre:"1 MILLION ELIXIR", precio:260, imagen:"perfume24.jpg" },
 { nombre:"INVICTUS", precio:240, imagen:"perfume25.jpg" },
 { nombre:"INVICTUS VICTORY", precio:270, imagen:"perfume26.jpg" },

 { nombre:"AZZARO WANTED", precio:220, imagen:"perfume27.jpg" },
 { nombre:"AZZARO THE MOST WANTED INTENSE", precio:260, imagen:"perfume28.jpg" },

 { nombre:"PRADA LUNA ROSSA", precio:240, imagen:"perfume29.jpg" },
 { nombre:"PRADA LUNA ROSSA BLACK", precio:270, imagen:"perfume30.jpg" },

 { nombre:"TOM FORD OMBRÉ LEATHER", precio:350, imagen:"perfume31.jpg" },
 { nombre:"TOM FORD NOIR EXTREME", precio:360, imagen:"perfume32.jpg" },
 { nombre:"TOM FORD TOBACCO VANILLE", precio:380, imagen:"perfume33.jpg" },

 { nombre:"LATTAFA QAED AL FURSAN", precio:170, imagen:"perfume34.jpg" },
 { nombre:"LATTAFA RAGHBA", precio:160, imagen:"perfume35.jpg" },
 { nombre:"LATTAFA OUD FOR GLORY", precio:200, imagen:"perfume36.jpg" },
 { nombre:"LATTAFA AMEER AL OUD", precio:190, imagen:"perfume37.jpg" },

 { nombre:"AFNAN 9PM", precio:200, imagen:"perfume38.jpg" },
 { nombre:"AFNAN SUPREMACY NOT ONLY INTENSE", precio:230, imagen:"perfume39.jpg" },

 { nombre:"ARMAF CLUB DE NUIT INTENSE LIMITED EDITION", precio:220, imagen:"perfume40.jpg" },
 { nombre:"ARMAF CLUB DE NUIT MILESTONE", precio:230, imagen:"perfume41.jpg" },

 { nombre:"DIOR SUAVAGE EDT", precio:230, imagen:"perfume42.jpg" },
 { nombre:"NAXOS DE XERJOFF", precio:220, imagen:"perfume43.jpg" },

 { nombre:"BVLGARI MAN IN BLACK", precio:260, imagen:"perfume44.jpg" },
 { nombre:"LAYTON PERMS DE MARLY", precio:240, imagen:"perfume45.jpg" },

 { nombre:"VERSACE EROS FLAME", precio:200, imagen:"perfume46.jpg" },
 { nombre:"CREED AVENTUS ABSOLU", precio:190, imagen:"perfume47.jpg" },

 { nombre:"HUGO BOSS BOTTLED", precio:240, imagen:"perfume48.jpg" },
 { nombre:"HUGO BOSS THE SCENT", precio:260, imagen:"perfume49.jpg" },

 { nombre:"LALIQUE ENCRE NOIRE", precio:210, imagen:"perfume50.jpg" },

 { nombre:"MANCERA RED TOBACO", precio:350, imagen:"perfume51.jpg" },
 { nombre:"VALENTINO BORN ROMA INTENSE", precio:360, imagen:"perfume52.jpg" },

]


const container = document.querySelector(".product-container");
let cart = JSON.parse(localStorage.getItem("carrito")) || [];

// ======================
// MOSTRAR PRODUCTOS
// ======================
function mostrarProductos(){
 container.innerHTML="";

 productos.forEach((p,i)=>{
  const div = document.createElement("div");
  div.classList.add("product");
  div.innerHTML = `
   <img src="${p.imagen}">
   <h3>${p.nombre}</h3>
   <p><strong>$${p.precio}</strong></p>
   <button onclick="agregar(${i})">Agregar</button>
  `;
  container.appendChild(div);
 });

 animacionScroll();
}

// ======================
// CARRITO
// ======================
function agregar(i){
 const producto = productos[i];
 const existe = cart.find(p=>p.nombre===producto.nombre);

 if(existe){
  existe.cantidad++;
 }else{
  cart.push({...producto,cantidad:1});
 }

 guardar();
 actualizar();
}

function actualizar(){
 const div = document.getElementById("cart");
 div.innerHTML="";
 let total=0;

 if(cart.length===0){
  div.innerHTML="<p>Carrito vacío</p>";
 }

 cart.forEach((p,i)=>{
  let subtotal=p.precio*p.cantidad;
  total+=subtotal;

  div.innerHTML+=`
   <p>
    <strong>${p.nombre}</strong><br>
    $${p.precio} x 
    <button onclick="cambiar(${i},-1)">-</button>
    ${p.cantidad}
    <button onclick="cambiar(${i},1)">+</button>
    <button onclick="eliminar(${i})" style="background:red">❌</button>
    <br>Subtotal: $${subtotal}
   </p><hr>
  `;
 });

 document.getElementById("total").innerText="Total: $"+total;
}

function cambiar(i,c){
 cart[i].cantidad+=c;
 if(cart[i].cantidad<=0){
  cart.splice(i,1);
 }
 guardar();
 actualizar();
}

function eliminar(i){
 cart.splice(i,1);
 guardar();
 actualizar();
}

function guardar(){
 localStorage.setItem("carrito",JSON.stringify(cart));
}

function pagar(){
 if(cart.length===0){
  alert("Carrito vacío");
  return;
 }
 let metodo = document.getElementById("payment").value;
 alert("Pago realizado con "+metodo+" ✔️ Gracias por su compra");
 cart=[];
 guardar();
 actualizar();
}

// ======================
// MOSTRAR TARJETA
// ======================
function mostrarTarjeta(){
 const metodo = document.getElementById("payment").value;
 const tarjeta = document.getElementById("datos-tarjeta");
 tarjeta.style.display = metodo === "Tarjeta" ? "block" : "none";
}

// ======================
function irPerfumes(){
 document.getElementById("productos").scrollIntoView({behavior:"smooth"});
}

function animacionScroll(){
 window.addEventListener("scroll",()=>{
  document.querySelectorAll(".product").forEach(p=>{
   if(p.getBoundingClientRect().top < window.innerHeight-50){
    p.classList.add("show");
   }
  });
 });
}

window.onload = ()=>{
 mostrarProductos();
 actualizar();
};
