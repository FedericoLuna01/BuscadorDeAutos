// variables
const marca = document.querySelector('#marca');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const year = document.querySelector('#year');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');



const resultado = document.querySelector('#resultado');



const max = new Date().getFullYear();
const min = max -10;


// objeto con la busqueda
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}

// eventos
document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos(autos);

    // llenar la opcion de años
    llenarSelect();
});


// event listener para los select
marca.addEventListener('change', e => { // change reacciona cuando se cambia un select
    datosBusqueda.marca = e.target.value;

    filtrarAuto();
});

year.addEventListener('change', e => {
    datosBusqueda.year = parseInt(e.target.value);

    filtrarAuto();
});

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;

    filtrarAuto();
});

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;

    filtrarAuto();
});

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = e.target.value;
});

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
});

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda)

});



// funciones
function mostrarAutos(autos) {
    limpiarHTML();

    autos.forEach( auto => {
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} puertas - Transmision ${transmision} - Precio: ${precio} - Color: ${color}
        `;
        resultado.appendChild(autoHTML);
    });
    
};


function limpiarHTML(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }

}


function llenarSelect() {
    for (let i = max; i >= min; i--) {
        const opcion = document.createElement('OPTION');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);
    }

}


// filtra en base a la busqueda
function filtrarAuto() {
    const resultado = autos.filter(filtrarMarca)
                            .filter(filtrarYear)
                            .filter(filtrarMinimo)
                            .filter(filtrarMaximo);
     
    if (resultado.length) {
        mostrarAutos(resultado);
    } else {
        noResultado();
    }
}

function noResultado() {

    limpiarHTML()

    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No hay resultados'
    resultado.appendChild(noResultado)
}

function filtrarMarca(auto) {
    if (datosBusqueda.marca) {
        return auto.marca === datosBusqueda.marca
    }
    return auto;
}

function filtrarYear(auto) {
    if (datosBusqueda.year) {
        return auto.year === datosBusqueda.year
    }
    return auto;
}

function filtrarMinimo(auto) {
    if (datosBusqueda.minimo) {
        return auto.precio >= datosBusqueda.minimo
    }
    return auto;
}

function filtrarMaximo(auto) {
    const { maximo } = datosBusqueda
    if (maximo) {
        return auto.precio <= maximo
    }
    return auto;
}