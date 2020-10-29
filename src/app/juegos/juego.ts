import { Companias } from '../companias/companias'
export class Juego {
    idJuego: number;
    titulo: string;
    fechaLanzamiento: string;
    precio: number;
    pegi: number;
    categoria: string;
    companies: Companias[];
}
