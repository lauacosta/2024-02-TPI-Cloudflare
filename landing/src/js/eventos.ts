const URL_EVENTOS = "http://localhost:8000/api/eventos/";

function formatearFecha(fechaString:string) {
  const [year, month, day] = fechaString.split("-").map(Number);;

  const fecha = new Date(year, month - 1, day); 
  
  const opciones: Intl.DateTimeFormatOptions = { day: "2-digit", month: "short" };
  return fecha.toLocaleDateString("es-ES", opciones);
}

// ------ TODO: Elegir imagen, esto es solamente provisorio ahsta que gonza agregue las imagenes en la BD ------
const imagenes = [
  "../images/Eventos/ConcursoInternacionalDeEsculturas.jpg",
  "../images/Eventos/ConferenciasYcharlas.jpg",
  "../images/Eventos/EspectáculosMusicaEnVivo.jpg",
  "../images/Eventos/ExposicionesDeArte.jpg",
  "../images/Eventos/IntervencionesUrbanas.jpg",
  "../images/Eventos/RecorridosGuiado.jpg",
  "../images/Eventos/TalleresYCapacitacion.jpg",
  "../images/Eventos/ExhibicionesDeRealidadVirtual.jpg",
  "../images/Eventos/PerformanceEnVivo.jpg",
  "../images/Eventos/FestivalGastronomico.jpg",
  "../images/Eventos/ProyeccionesDeCine.jpg",
  "../images/Eventos/PremiaciónyClausura.jpg",
  "../images/Eventos/ActividadesParaNiños.jpg",
  "../images/Eventos/ArtistasInvitadosInternacionales.jpg",
  "../images/Eventos/FeriaDeArtesania.jpg"

]

function elegirImagen(nombreImg:string){
  const indice = imagenes.findIndex((ruta) => ruta.includes(nombreImg.split(" ")[0]));
  console.log(imagenes[indice])
  return imagenes[indice]
}

// ------ Get eventos ------

async function loadEventos(url: string) {
  try {
    const res = await fetch(url);
    const eventos = await res.json();
    console.log(eventos)
    
    const contendor_eventos = document.querySelector(".events-gallery")

    if (contendor_eventos){
      for(const evento of eventos){
        const card = document.createElement('div');
        card.classList.add('event-card');
        
        
        // card.style.backgroundImage = `url('${elegirImagen(evento.nombre)}')`

        card.innerHTML = `
            <img class="card-img-evento" loading="lazy" src="${elegirImagen(evento.nombre)}" alt="${evento.nombre}">
            <div class="card-content">
              <h2>${evento.nombre}</h2>
              <div>
                <i class="material-icons-outlined">&#xebcc;</i>
                <p>${formatearFecha(evento.fecha_inicio)} - \u200B<span>${formatearFecha(evento.fecha_fin)}</ span></p>
              </div>
            </div>
            <button class="btn-secundarioV3">Ver detalles</button>
      `;
      contendor_eventos.appendChild(card);
      }
    }
   
  } catch (error) {
    console.log(`Error al carga los eventos: ${error}`);
  }
}

loadEventos(URL_EVENTOS);
