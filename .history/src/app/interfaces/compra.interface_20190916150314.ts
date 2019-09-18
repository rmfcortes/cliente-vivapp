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
    pedido: Pedido[];
    id: string;
}

export interface Pedido {
    cantidad: number;
    nombre: string;
    precio: number;
}

export interface Producto {
    foto: string;
    id: string;
    nombre: string;
    precio: number;
    unidad: string;
}

