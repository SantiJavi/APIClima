let container = document.querySelector('.container');
let resultado = document.querySelector('#resultado');
let formulario = document.querySelector('#formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

function buscarClima(e) {
    e.preventDefault();
    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;


    if (ciudad == '' && pais == '') {
        mostrarError('Ambos campos son obligatorios');
        return;
    };
    consultarApi(ciudad, pais);
}


function mostrarError(mensaje) {
    const alerta = document.querySelector('.bg-red-100');
    //si el selector me retorna vacio entonces pongo una alerta
    // de lo contrario no me muestres mas
    if (!alerta) {
        const alerta = document.createElement('div');
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-nd', 'mx-auto', 'mt-6', 'text-center');
        alerta.innerHTML = `
             <strong class="font-bold">Error</strong>
             <span class="block">${mensaje}</span>
             `;
        container.appendChild(alerta);
        setTimeout(() => {
            alerta.remove();
        }, 5000);
    }
}

//Consultar API
function consultarApi(ciudad, pais) {
    const appId = '9b4c2300a4c8790a3e93270783a1a400';
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`
    spinner();

    fetch(url)

    .then(respuesta => respuesta.json())
        .then(datos => {
            limpiarHtml();
            if (datos.cod == '404') {
                mostrarError('Ciudad no encontrada');
                return;
            }

            mostrarClima(datos);


        });
}

function mostrarClima(datos) {
    let { name, main: { temp, temp_max, temp_min } } = datos;
    let centigrados = kelvinCentigrados(temp);
    let tempMax = kelvinCentigrados(temp_max);
    let tempMin = kelvinCentigrados(temp_min);
    //Nombre de la ciudad
    let ciudad = document.createElement('p');
    ciudad.innerHTML = `Ciudad: ${name}`
    ciudad.classList.add('font-bold', 'text-6l');


    //Creacion del numero que muestra el clima actual
    let actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');
    //temperatura maxima

    let maxima = document.createElement('p');
    maxima.innerHTML = `Temperatura maxima: ${tempMax} &#8451;`;
    maxima.classList.add('font-bold');

    //temperatura minima 
    let minima = document.createElement('p');
    minima.innerHTML = `Temperatura minima: ${tempMin} &#8451;`;
    minima.classList.add('font-bold');


    let resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');
    resultadoDiv.appendChild(ciudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(maxima);
    resultadoDiv.appendChild(minima);
    resultado.appendChild(resultadoDiv);
}

function spinner() {
    limpiarHtml();
    let divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');
    divSpinner.innerHTML = `
    <div class="sk-circle1 sk-circle"></div>
    <div class="sk-circle2 sk-circle"></div>
    <div class="sk-circle3 sk-circle"></div>
    <div class="sk-circle4 sk-circle"></div>
    <div class="sk-circle5 sk-circle"></div>
    <div class="sk-circle6 sk-circle"></div>
    <div class="sk-circle7 sk-circle"></div>
    <div class="sk-circle8 sk-circle"></div>
    <div class="sk-circle9 sk-circle"></div>
    <div class="sk-circle10 sk-circle"></div>
    <div class="sk-circle11 sk-circle"></div>
    <div class="sk-circle12 sk-circle"></div>    
    `;
    resultado.appendChild(divSpinner);
}




function kelvinCentigrados(grados) {
    return parseInt(grados - 273.15);
}

function limpiarHtml() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}