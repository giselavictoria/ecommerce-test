let productos;
$.ajax({
	type: "GET",
	url: "https://fakestoreapi.com/products",
})
	.done(data => {
		console.log(data);
		productos = data;
		return productos;
	})
	.fail(error => {
		console.log(error);
	});

$.ajax({
	type: "POST",
	url: "https://fakestoreapi.com/products",
	data: JSON.stringify({
		title: "test product",
		price: 13.5,
		description: "lorem ipsum set",
		image: "https://i.pravatar.cc",
		category: "electronic",
	}),
	headers: {
		"Content-type": "application/json; charset=UTF-8",
	},
})
	.done(data => {
		console.log(data);
	})
	.fail(error => {
		console.log(error);
	});

const productosTitle = [
	{
		seccion: "men's clothing",
		imagen: "./img/masculinatitle.png",
		alt: "descripcion de la imagen",
	},
	{
		seccion: "women's clothing",
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
    <img src="${product.image}" class="card-img-top" alt="" />
    <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">
    ${product.price}
    </p>
    <button class="btn btn-primary btn-comprar" value="${product.id}" onclick="addToCart('${product.id}')">Add to Cart</button>
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
	console.log(linkAAbrir);

	const buscarSeccion = productos.filter(elemento => elemento.category === linkAAbrir);
	const buscarTitulo = productosTitle.filter(elemento => elemento.seccion === linkAAbrir);
	console.log("Este es el producto que estas buscando: ", buscarSeccion);
	//Aqui termina la logica para agregar al ARRAY del carrito
	//////////////////////////////////////////////////////////////////
	//Aqui empieza la logica para mostrar en el HTML
	hideSplash();
	renderTitle(buscarTitulo);
	renderProducts(buscarSeccion);
	// const btnComprar = document.querySelectorAll(".btn-comprar");
	// console.log(btnComprar);
	// btnComprar.forEach(btn => btn.addEventListener("click", addToCart));
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
    <img src="${product.image}" class="imagen-product" alt="${product.alt}"
          <h2>${product.title}</h2>
          <p>${product.description}</p>
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
const addToCart = id => {
	/*console.log("El id del producto capturado con el boton: ", evento.target.value);*/
	/*const idDelProductoABuscar = evento.target.value;*/
	const buscarProductoEnDB = productos.find(elemento => elemento.id === id);
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
	const inputProductoABuscar = e.target.value;
	console.log(inputProductoABuscar);
	const buscarinputEnDB = productos.find(
		elemento => elemento.nombre === inputProductoABuscar
	);

	console.log(buscarinputEnDB.seccion);
	if (buscarinputEnDB.seccion === "men's clothing") {
		const listadoMasculina = productos.filter(
			elemento => elemento.seccion === "men's clothing"
		);
		const buscarTituloSeccionMasculina = productosTitle.filter(
			elemento => elemento.seccion === "men's clothing"
		);
		hideSplash();
		renderTitle(buscarTituloSeccionMasculina);
		renderProducts(listadoMasculina);
	} else if (buscarinputEnDB.seccion === "women's clothing") {
		const listadoFemenina = productos.filter(
			elemento => elemento.seccion === "women's clothing"
		);
		const buscarTituloSeccionFemenina = productosTitle.filter(
			elemento => elemento.seccion === "women's clothing"
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
