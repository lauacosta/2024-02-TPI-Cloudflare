const URL_EVENTOS = "http://localhost:8000/api/escultores/";
const URL_PAIS = "http://localhost:8000/api/paises/";

// ------ Get pais del escultor ------
async function loadPais(url: string, idPais: number){
  try{
    const res = await fetch(`${url}${idPais}`);
    const pais = await res.json();
   
    return pais
  }catch(error){
    console.log(`Error al carga los paises: ${error}`);
  }
}

// ------ Get url de la foto del escultor ------
function urlFotoEscultor(url:string){
  const foto_url = url.slice(url.lastIndexOf("/") + 1)
  
 
  if (/\.[a-zA-Z]{1,5}$/.test(url)) {
    // TODO: no se porque esto no anda:
    // return `../../../server/src/perfiles/${foto_url}`
    return "../images/escultor-1.jpg"
  }else{
    return `https://drive.google.com/thumbnail?id=${foto_url}`
  }
 
}

// ------ Formatear correctamente el nombre ------
function formatearNombre(nombre: string, apellido: string){
  const nom = nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase();
  const ape = apellido.charAt(0).toUpperCase() + apellido.slice(1).toLowerCase();

  const nombreFormateado = `${nom} ${ape}`
  return nombreFormateado
}

// ------ Get escultores ------

async function loadEscultores(url: string) {
  try {
    const res = await fetch(url);
    const escultores = await res.json();
    console.log(escultores)
    
    
    const contenedor_escultores = document.querySelector(".grid-escultores")
   
    if (contenedor_escultores){
      for (const escultor of escultores){
        const article = document.createElement("article")

        // TODO: Falta agregar la clase hiddenImg para que tenga animacion, pero no se porque no funca, tengo que verlo
        article.classList.add('card-escultor')
        const foto = urlFotoEscultor(escultor.foto)
        const pais = await loadPais(URL_PAIS, escultor.pais_id)
        const NyA = formatearNombre(escultor.nombre, escultor.apellido)
        

        article.innerHTML = `
          <img
            src="${foto}"
            loading="lazy"
            alt="${NyA}"
            class="escultor-img" />

          <div class="nombre-origen">
            <div class="space">
              <h3 id="nombre-escultor">${NyA}</h3>
            </div>

            <p class="cursiva">${pais.nombre} </p>
          </div>

          <button class="btn-votar">
            <i class="material-icons-outlined">&#xe838;</i>
            Votar
          </button>
              
        `
        contenedor_escultores.appendChild(article);
      }
  
    }

    
   
  } catch (error) {
    console.log(`Error al carga los escultores: ${error}`);
  }
}

loadEscultores(URL_EVENTOS);
