const API_KEY = 'c5ef1b76f88f2933cd39ccfdbee6a481'; 
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const seriesGrid    = document.getElementById('series-grid');
const loadingDiv    = document.getElementById('loading');
const errorDiv      = document.getElementById('error');
const errorMessage  = document.getElementById('error-message');
const resultsTitle  = document.getElementById('results-title');
const resultsCount  = document.getElementById('results-count');
const searchInput   = document.getElementById('search');
const clearBtn      = document.getElementById('clear-search');
const retryBtn      = document.getElementById('retry-btn');
const themeToggle   = document.getElementById('theme-toggle');
const modal         = document.getElementById('serie-modal');
const modalBody     = document.getElementById('modal-body');
const modalClose    = document.getElementById('modal-close');
const modalOverlay  = document.getElementById('modal-overlay');


// ============================================================================
// UTILIDADES DE UI (DADO - no modificar)
// ============================================================================
const mostrarLoading = () => {
    loadingDiv.style.display = 'flex';
    errorDiv.style.display = 'none';
    seriesGrid.innerHTML = '';
};

const ocultarLoading = () => {
    loadingDiv.style.display = 'none';
};

const mostrarError = (mensaje) => {
    ocultarLoading();
    errorMessage.textContent = mensaje;
    errorDiv.style.display = 'flex';
    seriesGrid.innerHTML = '';
};


// ============================================================================
// DARK MODE (DADO - no modificar)
// ============================================================================
const aplicarTema = (tema) => {
    document.documentElement.setAttribute('data-theme', tema);
    themeToggle.textContent = tema === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('theme', tema);
};

const cargarTema = () => {
    const guardado = localStorage.getItem('theme');
    const preferido = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    aplicarTema(guardado || preferido);
};

themeToggle.addEventListener('click', () => {
    const actual = document.documentElement.getAttribute('data-theme');
    aplicarTema(actual === 'dark' ? 'light' : 'dark');
});

cargarTema();

const obtenerSeries = async()=>{
    const url = `${BASE_URL}/tv/popular?api_key=${API_KEY}&language=es-ES`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    console.log("Obtener Series");
    return datos.results;
}

const crearTarjeta=(serie) =>{
    const{name, first_air_date, vote_average,poster_path} = serie;
    const año = first_air_date;
    const imagen = poster_path ? `${IMAGE_URL}${poster_path}`:'';
    const rating = vote_average ? vote_average.toFixed(1):'N/A';
    return `
        <article class="series-card">
            <div class="serie-card__poster">
                <img class="serie-card__image" src = "${imagen}" alt="${name}">
                <span class="serie-card__rating">${rating}</span>
            </div>
            <div class="serie-card__content">
                <h3 class="serie-card__title">${name}</h3>
                <p class="serie-card__year">${año}</p>
            </div>
        </article>
    `;
}
/*const busqueda = async()=>{
    const url = `${BASE_URL}search/tv?query=api_key=${API_KEY}&language=es-ES`
}*/
const iniciar = async()=>{
    console.log('Mostrar series');
    mostrarLoading();
    try{
        const series = await obtenerSeries();
        console.log(`${series.length} series obtenidas`)
        ocultarLoading();
        seriesGrid.innerHTML=series.map(crearTarjeta).join('');
        console.log('Primera serie renderizada');
    }catch(error){
        console.log('Eroor', error);
        let mensaje ='No se pudo cargar peliculas';
        if(error.message.includes('401')){
            mensaje = 'API Key invalida, verifica tu clave';
        }else if(error.message.includes('fetch')){
            mensaje = 'Error de red';
        }else if(error.message.includes('429')){
            mensaje = 'Existe demasiadas peticiones. Espera un momento';
        }
        mostrarError();
    }
    
    
    //const primera = peliculas[0];
    //console.log('Primera pelicula',primera);
    
}



iniciar();

























// ############################################################################
// #                                                                          #
// #                          TU CÓDIGO AQUÍ                    #
// #                                                                          #
// ############################################################################
 



/*const API_KEY = 'c5ef1b76f88f2933cd39ccfdbee6a481';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const moviesgrid = document.getElementById('movies-grid');

const obtenerPeliculas = async()=>{
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`;
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    return datos.results;
}

const crearTarjeta=(pelicula) =>{
    const{title, release_date, vote_average,poster_path} = pelicula;
    const año = release_date ? release_date.split('-')[0]:'N/A';
    const imagen = poster_path ? `${IMAGE_URL}${poster_path}`:'';
    const rating = vote_average ? vote_average.toFixed(1):'N/A';
    return `
        <article class="movie-card">
            <div class="movie-card__poster">
                <img class="movie-card__image" src = "${imagen}" alt="${title}">
                <span class="movie-card__rating">${rating}</span>
            </div>
            <div class="movie-card__content">
                <h3 class="movie-card__title">${title}</h3>
                <p class="movie-card__year">${año}</p>
            </div>
        </article>
    `;
}

const loadingDiv=document.getElementById('loading');
const erroDiv = document.getElementById('error');
const errorMessage = document.getElementById('error-message');

const mostrarLoading=()=>{
    loadingDiv.style.display='flex';
    erroDiv.style.display='none';
    moviesgrid.innerHTML='';
}

const ocultarLoading=()=>{
    loadingDiv.style.display='none';
}

const mostrarError=(mensaje)=>{
    ocultarLoading();
    errorMessage=mensaje;
    erroDiv.style.display='flex';
    moviesgrid.innerHTML='';
}


const iniciar = async()=>{
    console.log('Mostrar peliculas');
    mostrarLoading();
    try{
        const peliculas = await obtenerPeliculas();
        console.log(`${peliculas.length} peliculas obtenidas`)
        ocultarLoading();
        moviesgrid.innerHTML=peliculas.map(crearTarjeta).join('');
        console.log('Primera pelicula renderizada');
    }catch(error){
        console.log('Eroor', error);
        let mensaje ='Nose pudo cargar peliculas';
        if(error.message.includes('401')){
            mensaje = 'API Key invalida, verifica tu clave';
        }else if(error.message.includes('fetch')){
            mensaje = 'Error de red';
        }else if(error.message.includes('429')){
            mensaje = 'Existe demasiadas peticiones. Espera un momento';
        }
        mostrarError();
    }
    
    
    //const primera = peliculas[0];
    //console.log('Primera pelicula',primera);
    
}

iniciar();

*/


/*
const probarApi = async() =>{
    const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=es-ES`;
    console.log('Url de la peticion', url);
    const respuesta = await fetch(url);
    const datos = await respuesta.json();
    console.log('Respuesta completa', datos);
    console.log('Peliculas', datos.results);
    console.log('Total de resultados', datos.total_results);
}
probarApi();*/
