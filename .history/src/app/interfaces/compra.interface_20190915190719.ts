export interface Pedido {
    precio: number;
    cantidad: number;
}

export interface Chofer {
    nombre: string;
    telefono: string;
    foto: string;
    lat: number;
    lng: number;
}

export interface Direccion {
    direccion: string;
    lat: number;
    lng: number;
}
