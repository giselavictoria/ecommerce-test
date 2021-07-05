//Esto esta simulando mi base de datos
const productos = [
	{
		id: "1",
		nombre: "producto 1",
		precio: 5000,
		seccion: "masculina",
		imagen: "./img/ropa1.png",
		descripcion: "descripcion del producto",
		alt: "descripcion de la imagen",
		cantidad: 1,
	},
	{
		id: "2",
		nombre: "producto 2",
		precio: 6000,
		seccion: "masculina",
		imagen: "./img/ropa1.png",
		descripcion: "descripcion del producto",
		alt: "descripcion de la imagen",
		cantidad: 1,
	},
	{
		id: "3",
		nombre: "producto 3",
		precio: 7000,
		seccion: "masculina",
		imagen: "./img/ropa1.png",
		descripcion: "descripcion del producto",
		alt: "descripcion de la imagen",
		cantidad: 1,
	},
	{
		id: "4",
		nombre: "producto 4",
		precio: 8000,
		seccion: "femenina",
		imagen: "./img/ropa2.png",
		descripcion: "descripcion del producto",
		alt: "descripcion de la imagen",
		cantidad: 1,
	},
	{
		id: "5",
		nombre: "producto 5",
		precio: 3000,
		seccion: "femenina",
		imagen: "./img/ropa2.png",
		descripcion: "descripcion del producto",
		alt: "descripcion de la imagen",
		cantidad: 1,
	},
	{
		id: "6",
		nombre: "producto 6",
		precio: 1000,
		seccion: "femenina",
		imagen: "./img/ropa2.png",
		descripcion: "descripcion del producto",
		alt: "descripcion de la imagen",
		cantidad: 1,
	},
];

const productosTitle = [
	{
		seccion: "masculina",
		imagen: "./img/masculinatitle.png",
		alt: "descripcion de la imagen",
	},
	{
		seccion: "femenina",
		imagen: "./img/femeninatitle.png",
		alt: "descripcion de la imagen",
	},
];

//array donde almacenamos los productos que vamos seleccionando
let carrito = [];

/* Set the width of the side navigation to 250px */
const openNav = () => {
	document.getElementById("sideNavCarrito").style.width = "450px";
};

/* Set the width of the side navigation to 0 */
const closeNav = () => {
	document.getElementById("sideNavCarrito").style.width = "0";
};

//renderiza los titulos en el container
const containerTitle = document.querySelector("#containerTitle");
const renderTitle = pepito => {
	let htmlTitle = "";
	pepito.forEach(title => {
		htmlTitle += `<img src="${title.imagen}" class="imagen-title" alt="${title.alt}" />
    <div class="row" id="productosInner"></div>`;
	});
	containerTitle.innerHTML = htmlTitle;
};

// renderiza los productos en el inner section
const productosSection = document.querySelector("#productos");

//el parametro que se le pasa es o debe ser un array
const renderProducts = firulais => {
	const productosInner = document.querySelector("#productosInner");
	//Si el parametro está vacio o es undefined
	// if (!firulais || firulais.length === 0) {
	// 	productosInner.innerHTML = "<p>No hay productos :(</p>";
	// 	return;
	// }
	// productosInner.innerHTML = "";
	let html = "";

	firulais.forEach(product => {
		html += `
    <div class="col-md-4" >
    <div class="card">
    <img src="${product.imagen}" class="card-img-top" alt="${product.alt}" />
    <div class="card-body">
    <h5 class="card-title">${product.nombre}</h5>
    <p class="card-text">
    ${product.descripcion}
    </p>
    <button class="btn btn-primary btn-comprar" value="${product.id}">Add to Cart</button>
    </div>
  </div>
  </div>
      `;
	});
	productosInner.innerHTML = html;
};

// renderiza los productos segun el link que se toque de la navbar
const openLinks = evento => {
	console.log(
		"El id del producto capturado con el boton: ",
		evento.target.getAttribute("value")
	);
	const linkAAbrir = evento.target.getAttribute("value");

	const buscarSeccion = productos.filter(elemento => elemento.seccion === linkAAbrir);
	const buscarTitulo = productosTitle.filter(elemento => elemento.seccion === linkAAbrir);
	console.log("Este es el producto que estas buscando: ", buscarSeccion);
	//Aqui termina la logica para agregar al ARRAY del carrito
	//////////////////////////////////////////////////////////////////
	//Aqui empieza la logica para mostrar en el HTML
	hideSplash();
	renderTitle(buscarTitulo);
	renderProducts(buscarSeccion);
	const btnComprar = document.querySelectorAll(".btn-comprar");
	console.log(btnComprar);
	btnComprar.forEach(btn => btn.addEventListener("click", addToCart));
};

// renderiza en el carrito
const renderCart = array => {
	const cartSection = document.querySelector("#mySidenav");
	//Si el parametro está vacio o es undefined
	if (!array || array.length === 0) {
		cartSection.innerHTML = "<p>No has comprado nada! :(</p>";
		return;
	}
	cartSection.innerHTML = "";
	let html2 = "";
	array.forEach(product => {
		html2 += `
    <article class="articulo">
    <img src="${product.imagen}" class="imagen-product" alt="${product.alt}"
          <h2>${product.nombre}</h2>
          <p>${product.descripcion}</p>
          <p id="cantidadProducto">${product.cantidad}</p>
          <button class="btn btn-primary btn-delete" onclick="deleteFromCart('${product.id}')">X</button>
      </article>
      `;
	});
	cartSection.innerHTML = html2;
};

// agrega al carrito
const cantidadProductosCarrito = document.querySelector("#cantidadProductosCarrito");
let contadorProductosCarrito = 0;
const addToCart = evento => {
	console.log("El id del producto capturado con el boton: ", evento.target.value);
	const idDelProductoABuscar = evento.target.value;
	const buscarProductoEnDB = productos.find(
		elemento => elemento.id === idDelProductoABuscar
	);
	console.log("Este es el producto que estas buscando: ", buscarProductoEnDB);
	console.log("Antes de guardar en el carrito: ", carrito);
	contadorProductosCarrito++;
	carrito.push(buscarProductoEnDB);
	console.log("Despues de guardar en el carrito: ", carrito);
	//Aqui termina la logica para agregar al ARRAY del carrito
	//////////////////////////////////////////////////////////////////
	//Aqui empieza la logica para mostrar en el HTML
	cantidadProductosCarrito.innerHTML = contadorProductosCarrito;
	renderCart(carrito);
};

// borra del carrito
const deleteFromCart = id => {
	console.log("El id del producto a borrar: ", id);
	console.log("Carrito antes de eliminar el producto: ", carrito);
	const buscarProductoEnCarritoYBorrar = carrito.filter(producto => producto.id !== id);

	//Se modifica el carrito original con el nuevo array;
	contadorProductosCarrito--;
	carrito = buscarProductoEnCarritoYBorrar;
	//Aqui termina la logica de eliminar del carrito
	////////////////////////////////////////////////////////////////
	//Aqui empieza la logica del renderizado en el HTML
	cantidadProductosCarrito.innerHTML = contadorProductosCarrito;
	renderCart(carrito);
};

// muestra u oculta la home splash
const splash = document.querySelector("#splash");
const linkHome = document.querySelector("#linkHome");

const hideSplash = () => {
	splash.classList.add("oculta");
	productosSection.classList.remove("oculta");
};
const showHome = () => {
	splash.classList.remove("oculta");
	productosSection.classList.add("oculta");
};

// search bar
$("#inputBusqueda").change(e => {
	const btnComprar = document.querySelectorAll(".btn-comprar");
	console.log(btnComprar);
	btnComprar.forEach(btn => btn.addEventListener("click", addToCart));
	const inputProductoABuscar = e.target.value;
	console.log(inputProductoABuscar);
	const buscarinputEnDB = productos.find(
		elemento => elemento.nombre === inputProductoABuscar
	);

	console.log(buscarinputEnDB.seccion);
	if (buscarinputEnDB.seccion === "masculina") {
		const listadoMasculina = productos.filter(
			elemento => elemento.seccion === "masculina"
		);
		const buscarTituloSeccionMasculina = productosTitle.filter(
			elemento => elemento.seccion === "masculina"
		);
		hideSplash();
		renderTitle(buscarTituloSeccionMasculina);
		renderProducts(listadoMasculina);
	} else if (buscarinputEnDB.seccion === "femenina") {
		const listadoFemenina = productos.filter(elemento => elemento.seccion === "femenina");
		const buscarTituloSeccionFemenina = productosTitle.filter(
			elemento => elemento.seccion === "femenina"
		);
		hideSplash();
		renderTitle(buscarTituloSeccionFemenina);
		renderProducts(listadoFemenina);
	}
	$("#botonBusqueda").submit(e => {
		e.preventDefault();
		$("#inputBusqueda").trigger("change");
	});
});

window.onload = () => {
	renderCart(carrito);
	linkHome.addEventListener("click", showHome);
	const linksNavBar = document.querySelectorAll(".links");
	linksNavBar.forEach(link => link.addEventListener("click", openLinks));
};
