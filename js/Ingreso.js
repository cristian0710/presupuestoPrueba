class Ingreso extends Dato{
    static contadorIgresos = 0;
    constructor(descripcion, valor){
        super(descripcion, valor);
        this._id = ++Ingreso.contadorIgresos;
    }
    get id(){
        return this._id;
    }
}