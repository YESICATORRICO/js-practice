// modificación del título
let titulo = document.getElementById("titulo")
console.log( titulo.innerText ) 

titulo.innerText = "Bienvenido a mi tienda de ARTE!"
console.log( titulo.innerText )


let contenedor = document.getElementById("contenedor");
let input = document.getElementById("input0");
input.addEventListener("input", () => {
  let valor = input.value;
  let obrabuscada = stockProductos.filter((obra) => {
  return obra.nombre.toLowerCase ()== valor.toLowerCase();
  });
  contenedor.innerHTML = "";
  if (obrabuscada.length > 0) {
    obrabuscada.forEach((obra) => {
      agregarObraHTML(obra);
     
    });
   
  }
}); 

function agregarObraHTML(obra)

{
  let ul = document.createElement("ul");
  let li1 = document.createElement("li");
  li1.innerText = "nombre: " + obra.nombre;
  let li2 = document.createElement("li");
  li2.innerText = "material: " + obra.material;
  let li3 = document.createElement("li");
  li3.innerText = "precio: " + obra.precio;
  let li4 = document.createElement("li");
  li4.innerText = "código: " + obra.id;
  
  ul.append(li1, li2, li3, li4)
  contenedor.append(ul)
}

//identificando para luego trabajar
//main para agregar html (1)
const contenedorProductos = document.getElementById('contenedor-productos')

//carrito detalle (modal) (2)

const contenedorCarrito = document.getElementById('carrito-contenedor')
//carrito - detalle opción vaciar carrito (modal) (3)
const botonVaciar = document.getElementById('vaciar-carrito') 
//carrito - contador en header - actualización (4)
const contadorCarrito = document.getElementById('contadorCarrito')

//carrito detalle (modal) (5)
const precioTotal = document.getElementById('precioTotal')



//borrar
// modificado como visto en clase - sin operador lógico
//let carrito = []
//let carritoJSON = localStorage.getItem ("carrito");
//if(carritoJSON){
  //carrito=JSON.parse (carritoJSON)
      
//} 
// usando operador lógico
let carrito = JSON.parse(localStorage.getItem('carrito')) || [] 

//interactuar con HTML - DOM (1)
stockProductos.forEach((producto) => {
    const div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML = `
    <img src=${producto.img} alt= "">
    <h3>${producto.nombre}</h3>
    <p > <i> ${producto.descripcion} </i></p>
    <p>Material: ${producto.material}</p>
    <p class="precioProducto">Precio:$ ${producto.precio}</p>
    <button id="agregar${producto.id}" class="boton-agregar">Agregar <i class="fas fa-shopping-cart"></i></button>`

    contenedorProductos.appendChild(div)

    const boton = document.getElementById(`agregar${producto.id}`)
 
   //acciones

//Agregar al carrito y actualizar cantidad - sumar cantidad si se desea mas de una unidad del mismo producto*

const agregarAlCarrito = (prodId) => {
  
   const exist = carrito.some (prod => prod.id === prodId) 
    if (exist){ 
        const prod = carrito.map (prod => { 
        if (prod.id === prodId){
          //SUGAR SINTAX - OPERADOR ++
            prod.cantidad++
            }
        })
    } else { 
        const item = stockProductos.find((prod) => prod.id === prodId)
        carrito.push(item)
    }
    
    actualizarCarrito() 
}

//Evento click en "agregar" debajo de cada cuadro >> Agregué la libreria Toastify.
boton.addEventListener('click', () => {

  Toastify({
    text: "Listo!! Agregado al carrito",
    duration: 1000,
    newWindow: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right,rgb(235, 203, 228), rgb(190, 139, 184))",
      padding: "20px",
    },
   
  }).showToast();
      
    agregarAlCarrito(producto.id)
      
  })
})

////carrito - evento "vaciar carrito"  (3)
botonVaciar.addEventListener('click', () => {
  carrito.length = 0
  actualizarCarrito()
  localStorage.clear()
})
//uso del tachito

const eliminarDelCarrito = (prodId) =>{
  const item= carrito.find((prod) => prod.id === prodId)
  const indice =carrito.indexOf(item)
  carrito.splice(indice,1)
  actualizarCarrito()
}


//para actualizar el carrito a medida que cargo diferentes productos y agregarlo al detalle 
const actualizarCarrito = () => {
   
    contenedorCarrito.innerHTML = "" 

    //creando html para el detalle de lo agregado al carrito 
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio:$${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>
        `

        contenedorCarrito.appendChild(div)
        
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    //actualizar el icono carrito con las obras seleccionadas (4)
    contadorCarrito.innerText = carrito.length 
    //sumatoria de lo agregado al carrito (5)
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
    
}

//arte a pedido para aplicar fetch y json

 document.getElementById('jsonBTN').addEventListener('click', cargarJson);

 function cargarJson() {
   fetch (`pedido.json`)
   .then (function(res){
     return res.json();
   })
   .then (function(sinStock){
   let html ='';
   sinStock.forEach(function(pedido){
     html += `
     <img src=${pedido.cuadro} alt= "">
     <li> ${pedido.nombre} </li>
     `;
   })
   document.getElementById ('resultado').innerHTML= html;
   })
 }
