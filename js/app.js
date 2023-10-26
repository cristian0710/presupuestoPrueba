const ingresos = [
    new Ingreso('sueldo', 13000),
    new Ingreso('venta Carro', 2500),
    new Ingreso('nuevo ingreso', 2500)
];

const egresos = [
    new Egreso('arriendo', 1200),
    new Egreso('servicios', 800),
    new Egreso('cuota moto', 7500)
];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for(let ingreso of ingresos){
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgresos = 0;
    for(let egreso of egresos){
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

let cargarCabecero = () => {
    let presupuesto = totalIngresos() - totalEgresos();
    let porcentajeEgreso =  totalEgresos()/totalIngresos();
    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuesto);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);        //Formato porcentaje
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());               //Formato Moneda
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());                 //Formato Moneda
};

let formatoMoneda = (valor) => {
    return valor.toLocaleString('es-US',{style:'currency', currency:'USD', minimumFractionDigits:2});
    // return valor.toLocaleString('es-ES',{style:'currency', currency:'EUR', minimumFractionDigits:2});
}

let formatoPorcentaje = (valor) => {
    return valor.toLocaleString('es-US',{style:'percent', minimumFractionDigits:2});
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for(let ingreso of ingresos){
        ingresosHTML += crearIngresoHTML(ingreso);
        console.log(ingresosHTML);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiarEstilos">
        <div class="elemento_descripcion">${ingreso.descripcion}</div>
            <div class="derecha limpiarEstilos">
                <div class="elemento_valor">${ingreso.valor}</div>
                    <div class="elemento_eliminar">
                        <button class="elemento_eliminar--btn">
                             <ion-icon name="close-circle-outline" onclick="eliminarIgreso(${ingreso.id})"></ion-icon> 
                        </button>
                    </div>
                </div>
            </div>
    `;
    return ingresoHTML;
}

const eliminarIgreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingreso.id === id);
    // funcion para eliminar un elemento de un array
    ingresos.splice(indiceEliminar, 1);
    // for(let ingreso of ingresos)
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let egresosHTML = '';
    for(let egreso of egresos){
        egresosHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresosHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">${formatoMoneda(egreso.valor)}</div>
            <div class="elemento_porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
                <div class="elemento_eliminar">
                    <button class="elemento_eliminar--btn">
                        <ion-icon name="close-circle-outline" onclick="eliminarEgreso(${egreso.id})"></ion-icon> 
                    </button>
                </div>
            </div>
        </div>
    `;
    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egresos => egresos.id === id);
    console.log(indiceEliminar);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}

const agregarDato = () => {
    let forma = document.forms['formulario'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];
    if(descripcion.value !== '' && valor.value !== ''){
        if(tipo.value === 'ingreso'){
            ingresos.push(new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        }else if(tipo.value === 'egreso'){
            egresos.push(new Egreso(descripcion.value, +valor.value));
            cargarCabecero();
            cargarEgresos();
        }
    }

}