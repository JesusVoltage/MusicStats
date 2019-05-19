export class User {

    constructor(_id='', nombre='' , apellidos=''){
        this._id = _id;
        this.nombre = nombre;
        this.apellidos = apellidos;
    }

    _id: string;
    nombre: string;
    apellidos: string;
}
