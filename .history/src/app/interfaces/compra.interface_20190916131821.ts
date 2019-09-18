export interface Pedido {
    precio: number;
    cantidad: number;
    nombre: string;
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

export interface PedidoActivo {
    direccion: Direccion;
    pedido: Pedido;
    id: string;
}
