//Creacion de array con los productos disponibles.
const productos = [
    { id: 1, nombre: 'Samsung S24 Ultra', precio: 1000 },
    { id: 2, nombre: 'Samsung Tab 9', precio: 1200 },
    { id: 3, nombre: 'Samsung SmartWatch', precio: 400 },
    { id: 4, nombre: 'TV Samsung 50"', precio: 500 }
];

// Array del carrito
let carrito = [];

//Funciones

// Función para mostrar los productos disponibles
function mostrarProductos() {
    let productosDisponibles = "Productos disponibles:\n";
    productos.forEach(producto => {
        productosDisponibles += `ID: ${producto.id}, Nombre: ${producto.nombre}, Precio: $${producto.precio}\n`;
    });
    return productosDisponibles;
}

// Función para agregar productos al carrito
function agregarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        console.log(`Agregado: ${producto.nombre}`);
    } else {
        console.log("Producto no encontrado");
    }
}

// Menú de opciones para interactuar con el carrito
function menu() {
    let opcion;
    do {
        opcion = parseInt(prompt("Seleccione una opción:\n1. Agregar producto\n2. Mostrar carrito\n3. Vaciar carrito\n4. Salir"));
        switch (opcion) {
            case 1:
                const productosDisponibles = mostrarProductos();
                const idAgregar = parseInt(prompt(`${productosDisponibles}Ingrese el ID del producto a agregar:\n`));
                agregarProducto(idAgregar);
                break;
            case 2:
                mostrarCarrito();
                break;
            case 3:
                vaciarCarrito();
                break;
            case 4:
                console.log("Gracias por su compra");
                break;
            default:
                console.log("Opción no válida");
        }
    } while (opcion !== 4);
}

// Inicia el menú
menu();
