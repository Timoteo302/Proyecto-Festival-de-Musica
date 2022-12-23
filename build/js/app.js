
//generando galeria solamente con JS
//NOTA IMPORTANTE LOS NOMBRES DE LAS FOTOS SON
//CONSECUTIVOS, 1.WEBP, 2.WEBP, 3.WEBP, ETC.

document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
    // scrollNav();
    navegacionFija();
}

//para el scroll suavizado
// function scrollNav() {
//     const enlaces = document.querySelectorAll('.navegacion-principal a');

//     enlaces.forEach( enlace => {
//         enlace.addEventListener('click', (e) =>{
//             e.preventDefault(); 

//             const seccionScroll = e.target.attributes.href.value;
//             const seccion = document.querySelector(seccionScroll);

//             seccion.scrollIntoView({behavior: "smooth"})
//         })
//     })
// }
//fin de scroll suavizado


//detectar-scroll-navegacion-fija
function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    /*Seleccionamos un elemento tambien, el cual demos
    scroll hasta ese elemento, se ejecte el codigo. */

    const body = document.querySelector('body');

    window.addEventListener('scroll', ()=>{
        // console.log(sobreFestival.getBoundingClientRect());

        if( sobreFestival.getBoundingClientRect().bottom < 80){
            // console.log('ya psamos el elemento');
            
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else{
            // console.log('aun no');

            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');

        }
    })

}

//fin-de-detectar-scroll-navegacion-fija



function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i=1; i<=12; i++){
        const imagen = document.createElement('picture');

        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        imagen.addEventListener('click', ()=>{
            mostrarImagen(i);
        });

        galeria.appendChild(imagen);
    }
}


function mostrarImagen(id){
    const imagen = document.createElement('picture');

    imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img loading="lazy" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

    /*Esta variable llamada overlay es para que cuando
    presione la imagen se ponga un fondo medio oscuro
    y se vea mucho mejor. */
    //Crea el Overlay con la imagen
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    /*esto es para que cuando le de click en cualquier lugar
    de la pantalla ya se fuera de la foto o en la X se salga
    la foto. */
    overlay.addEventListener('click', ()=>{
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');

        overlay.remove();
    })


    //Boton para cerrar el modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');

    cerrarModal.addEventListener('click', ()=>{
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');

        overlay.remove();

    })

    overlay.appendChild(cerrarModal);


    //esto es para que se agreguen las imagenes, hay
    //que agregar la clase overlay al body.
    //Añadir al html
    const body = document.querySelector('body');
    body.appendChild(overlay);

    //para no poder dar scroll una vez que presione la img
    body.classList.add('fijar-body');

    
}