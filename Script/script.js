
// enumerado del selector 
const selectorEnum = {
    estudiante : 1,
    trainne : 2,
    junior : 3
}

// porcentajes de descuento
const descuento = {
    estudiante : 0.8,
    trainne : 0.5,
    junior : 0.15
}

// valor de la entrada
const valorTicket = 200;

// lugares donde insertar las alertas de validacion
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const alertPlaceholder2 = document.getElementById('liveAlertPlaceholder2');
const alertPlaceholder3 = document.getElementById('liveAlertPlaceholder3');

// elementos que voy a utilizar del DOM
let estudiante = document.querySelector('.estudiante');
let trainne = document.querySelector('.trainee');
let junior = document.querySelector('.junior');
let selector = document.querySelector('select');
let cantidad = document.querySelector('.cantidad');
let totalAPagar = document.querySelector('.total-a-pagar')
let botonBorrar = document.querySelector('.borrar');
let resumen = document.querySelector('.resumen');
let nombre = document.querySelector('.nombre');
let apellido = document.querySelector('.apellido');
let correo = document.querySelector('.correo');

// EVENTOS
estudiante.addEventListener('click', ()=>{
    selector.value = selectorEnum.estudiante;
});
trainne.addEventListener('click', ()=>{
    selector.value = selectorEnum.trainne;
});
junior.addEventListener('click', ()=>{
    selector.value = selectorEnum.junior;
});

cantidad.addEventListener('change',() =>{
    validarNumeroNegativos();
    validarNumerosReales();
});


botonBorrar.addEventListener('click',() => {
    borrar();
    cantidad.value = 0;
});

document.querySelector("form").addEventListener('submit', (e)=>{
    e.preventDefault();
    borrar();
    cambiarPrecio();
});

nombre.addEventListener('input', (e) => {
    validarSoloLetras(e.data,nombre);
});

apellido.addEventListener('input', (e) =>{
    validarSoloLetras(e.data,apellido);
});

correo.addEventListener('change',() =>{
    validarCorreo();
});

// validaciones
function validarSoloLetras(letra,input){
    const pattern = new RegExp('^[A-ZÁÉÍÓÚÑ ]+$', 'i');
    if (!pattern.test(letra)){
        input.value = input.value.replace(letra.toString(),'');
        alert('caracter invalido!','warning',alertPlaceholder2);
        eleminarAlerta(alertPlaceholder2);
   }
}

function validarCorreo(){
    if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(correo.value)){
        correo.value = '';
        alert('direccion de correo invalida!','warning',alertPlaceholder3);
        eleminarAlerta(alertPlaceholder3);
    }
}

function validarNumeroNegativos(){
    if(cantidad.value < 0){
        cantidad.value = 0;
        alert('no se admiten numeros negativos!', 'warning',alertPlaceholder)
        eleminarAlerta(alertPlaceholder);
    }
}

function validarNumerosReales(){
    if (!Number.isInteger(Number(cantidad.value))) {
        alert('solo se admiten numeros enteros!', 'warning',alertPlaceholder)
        cantidad.value = 0;
        eleminarAlerta(alertPlaceholder);
    } else if(cantidad.value == ''){
        alert('solo se admiten caracteres numericos validos!', 'warning',alertPlaceholder)
        cantidad.value = 0;
        eleminarAlerta(alertPlaceholder);
    }
}

function borrar(){
    totalAPagar.value = totalAPagar.value.slice(0,16); // limpio el value haciendo un slice desde la posicion 0 hasta el "$"
}

// creacion del mensaje de validacion
const alert = (message, type, lugar) => {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    lugar.append(wrapper)
}

// cambiar el precio segun la variacion del campo Categoria
function cambiarPrecio(){
    totalAPagar.value += calcular(selector.value); // seteo el value con el calculo del total a pagar
}

// calcular el precio
function calcular(selector){
    if(selector == selectorEnum.estudiante){
        return (valorTicket * cantidad.value) - (valorTicket * cantidad.value) * descuento.estudiante;
    } else if( selector == selectorEnum.trainne){
        return (valorTicket * cantidad.value) - (valorTicket * cantidad.value) * descuento.trainne;
    } else if (selector == selectorEnum.junior){
        return (valorTicket * cantidad.value) - (valorTicket * cantidad.value) * descuento.junior;
    }
}

//eliminar automaticamente los carteles de validacion insertado despues de 2 segundos 
function eleminarAlerta(lugar){
    setTimeout(() =>{
        lugar.removeChild(lugar.lastChild);
    },2000);
}