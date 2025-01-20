document.addEventListener('DOMContentLoaded', function() {
    creargaleria();
});

function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    
    if (!header || !sobreFestival) return;  // Verifica que los elementos existan

    window.addEventListener('scroll', function() {
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed');
             
        } else {
            header.classList.remove('fixed');
            
        }
    });
}

document.addEventListener('DOMContentLoaded', navegacionFija);


function creargaleria() {
    const cantidadImagenes = 16;
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= cantidadImagenes; i++) {
        const imagen = document.createElement('IMG');
        imagen.src = `src/img/gallery/full/${i}.jpg`;
        imagen.alt = `Imagen de la galería ${i}`;

        // Al hacer clic en la imagen se llama a mostrarImagen
        imagen.onclick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('IMG');
    imagen.src = `src/img/gallery/full/${i}.jpg`;
    imagen.alt = `Imagen de la galería ${i}`;

    // Crear el modal
    const modal = document.createElement('DIV');
    modal.classList.add('modal');

    // Crear el botón de cerrar
    const cerrarModalboton = document.createElement('BUTTON');
    cerrarModalboton.textContent = 'X';
    cerrarModalboton.classList.add('boton-cerrar');
    cerrarModalboton.onclick = function(event) {
        event.stopPropagation(); // Evita que el clic en el botón se propague al modal
        cerrarModal();
    }

    // Evitar que el clic en la imagen cierre el modal
    imagen.onclick = function(event) {
        event.stopPropagation(); // Evitar que el clic en la imagen cierre el modal
    }

    // Agregar el botón de cerrar y la imagen al modal
    modal.appendChild(cerrarModalboton);
    modal.appendChild(imagen);

    // Solo el botón "X" cierra el modal
  

    // Agregar el modal al body
    const body = document.querySelector('body');
    body.classList.add('overflow-hiden');
    body.appendChild(modal);
}

function cerrarModal() {
    const modal = document.querySelector('.modal');
    modal.classList.add('fade-out');
    setTimeout(() => {
        modal?.remove();
        const body = document.querySelector('body');
        body.classList.remove('overflow-hiden');
    }, 500);
}

function resaltarEnlaces() {
    document.addEventListener('scroll', function() {
  
      const sections = document.querySelectorAll('section');
      const navLinks = document.querySelectorAll('.navegacion-principal a');
      
      let actual = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
          actual = section.id;
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + actual) {
          link.classList.add('active');
        } 
      });
  
    });
  }
  function resaltarEnlaces() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navegacion-principal a');
    
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const section = entry.target;
        const link = document.querySelector(`.navegacion-principal a[href="#${section.id}"]`);
        
        if (entry.isIntersecting) {
          console.log(`Sección visible: ${section.id}`);
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }, {
      threshold: 0.3 // Cambia a la mitad de la sección visible
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
  }
  
  document.addEventListener('DOMContentLoaded', function () {
    console.log('DOM completamente cargado');
    resaltarEnlaces();
  });
  
  