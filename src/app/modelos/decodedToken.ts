export class decodedToken{
    aud:string;
    exp:number;
    iat:string;
    idRol:string;
    iss:string;
    jti:string;
    usuario:string;


    constructor(){
        this.aud= '';
        this.exp= 0;
        this.iat= '';
        this.idRol= '';
        this.iss= '';
        this.jti= '';
        this.usuario= '';
        }
}
