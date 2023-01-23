const $carrito = document.querySelector('#carrito');
const $listCursos = document.querySelector('#lista-cursos');
const $contenedorCarrito = document.querySelector('#lista-carrito tbody');
const $vaciarCarrito = document.querySelector('#vaciar-carrito');
let articulosÇarrito = [];

$listCursos.addEventListener("click", agregarCursos);
$carrito.addEventListener("click", eliminarCarrito);
$vaciarCarrito.addEventListener("click", vaciarMyCarrito);

function vaciarMyCarrito(){
    articulosÇarrito = [];
    limpiarHtml();
}

function eliminarCarrito(e){
    if(e.target.classList.contains('borrar-curso')){
        const myArticulo = e.target.getAttribute('data-id');
        articulosÇarrito = articulosÇarrito.filter(articulos => myArticulo !== articulos.id);
        carritoHtml();
    }
    console.log(articulosÇarrito);
}


function agregarCursos(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement.parentElement;
        lectorDatos(cursoSeleccionado);
    }
}

function lectorDatos(cursos){
    const infoCurso = {
        image: cursos.querySelector('.imagen-curso').src,
        titulo: cursos.querySelector('h4').textContent,
        precio: cursos.querySelector('.precio .u-pull-right').textContent,
        id: cursos.querySelector('a').getAttribute('data-id'),
        cantidad: 1,
    } 

    const existe = articulosÇarrito.some(articulo => articulo.id === infoCurso.id);
    if(existe){
        const cursos = articulosÇarrito.map(articulo => {
            if(articulo.id === infoCurso.id){
                articulo.cantidad++;
                return articulo;
            }
            else{
                return articulo;
            }
        });
        articulosÇarrito = cursos;
    }
    else{
        articulosÇarrito = [...articulosÇarrito, infoCurso];
    }

    console.log(articulosÇarrito);

    carritoHtml();
}

function carritoHtml(){
    limpiarHtml();
    articulosÇarrito.forEach(articulo => {
        const { image, titulo, precio, cantidad, id} = articulo;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${image}" class="img-carrito">
            </td>
            <td>
                ${titulo}
            </td>
            <td>
                ${precio}
            </td>
            <td>
                ${cantidad}
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `;
        $contenedorCarrito.appendChild(row);
    })
}

function limpiarHtml(){
    while($contenedorCarrito.firstChild !== null){
        $contenedorCarrito.removeChild($contenedorCarrito.firstChild);
    }
}


const producto = {
    nombre: 'leche',
    precio: 10,
    fecha: '10/12/2022'
}

const countri = ['french', 'spain', 'mexico'];

const countriString = JSON.stringify( countri );

const prodcutoString = JSON.stringify( producto );

localStorage.setItem('countri', countriString);
const newCountri = localStorage.getItem('countri');

console.log(JSON.parse(newCountri));