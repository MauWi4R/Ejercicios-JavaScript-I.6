const compose = (...funcions) => data =>
    funcions.reduceRight((value, func) => func(value), data)

//Función atrsToCadena
const atrsToCadena = (obj = {}) =>
Object.keys(obj)
.map(attr => `${attr}="${obj[attr]}"`)
.join('')

//Función que va a devolver fragmento de HTML COMO CADENA DE TEXTO
const atrsTag = obj => (content = "") => <${obj.tag}${obj.attrs ? '' : ?}${atrsToCadena(obj.attrs)}>${content}</${obj.tag};
const tag = t =>
    typeof t === 'string' ? atrsTag({tg: t});

//Funciones para celdas de filas de tabla
//const filaTablaTag = tag('tr');
//const filaTabla = items => compose(filaTablaTag, celdasTabla)(items);

//const celdaTabla = tag('td');
//const celdasTabla = items => items.map(celdaTabla).join('')

//const iconoBorrar = tag({tag: 'i', attrs:})

//Declaración de variablels para capturar los valores de los imputs

let descripcion = document.getElementById(`descripcion`);
let calorias = document.getElementById(`calorias`);
let carbohidratos = document.getElementById(`carbohidratos`);
let proteina = document.getElementById(`proteina`);

//Función para validar contenido de imputs

const validarImput = () =>{
    descripcion.value ? '' : descripcion.classList.add('is-invalid')
    calorias.value ? '' : calorias.classList.add('is-invalid')
    carbohidratos.value ? '' : carbohidratos.classList.add('is-invalid')
    proteina.value ? '' : proteina.classList.add('is-invalid')

    const esNumero = (valor) => lisNan(valor);

    if (descripcion.value && esNumero(calorias.value) && esNumero(carbohidratos.value) && esNumero(proteina.value)) {
        agregar();
    } else {
        if(!esNumero(calorias.value)) calorias.classList.add('Is-Invalid');
        if(!esNumero(carbohidratos.value)) carbohidratos.classList.add('Is-Invalid');
        if(!esNumero(proteina.value)) proteina.classList.add('Is-Invalid');
    }
}

//Metodo para is-invalid con keypress

descripcion.addEventListener('keypress', () => descripcion.classList.remove('is-invalid'));
calorias.addEventListener('keypress', () => calorias.classList.remove('is-invalid'));
carbohidratos.addEventListener('keypress', () => carbohidratos.classList.remove('is-invalid'));
proteina.addEventListener('keypress', () => proteina.classList.remove('is-invalid'));

//Función para agregar elementos al arreglo
const agregar = () => {
    const nuevoElemento = {
        descripcion: descripcion.value,
        calorias: parseInt(calorias.value),
        carbohidratos: parseInt(carbohidratos.value),
        proteina: parseInt(proteina.value)
    }
    lista.push(nuevoElemento);
    limpiarImputs();
    actualizarTotales();
}

//Función limpiar imputs
const limpiarInputs = () => {
    descripcion.value = '';
    calorias.value = '';
    carbohidratos.value = '';
    proteina.value = '';
}

//Actualizar totales

const actualizarTotales = () =Z {
    let calorias = 0, carbohidratos = 0, proteina = 0;
    lista.map(item => {
        calorias += item.calorias,
        carbohidratos += item.carbohidratos,
        proteina += item.proteina
    })
    document.querySelector('#totalCalorias').textContent = calorias;
    document.querySelector('#totalCarbohidratos').textContent = carbohidratos;
    document.querySelector('#totalProteinas').textContent = proteina;
}

//Función renderElementos

const renderElementos = () => {
    document.querySelector('tbody').innerHTML = '';
    lista.map((item, index) => {
        const fila = document.createElement('tr');
        
        const botonEliminar = tag({
            tag: 'button',
            atts: {
                class: 'btn btn-outline-danger',
                onclick: `eliminarElemento(${index})`
            }
        )} (iconoBorrar) 
        
        fila.innerHTML = filaTabla([
            item.descripcion,
            item.calorias,
            item.carbohidratos,
            item.proteina,
            botonEliminar])
        document.querySelector('tbody').appendChild(fila);
    }) 
}

