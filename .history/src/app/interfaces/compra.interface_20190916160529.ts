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

export interface Pedido {
    direccion: Direccion;
    productos: ProductoPedido[];
    id: string;
}

export interface ProductoPedido {
    cantidad: number;
    id: string;
    precio: number;
}

export interface Producto {
    cantidad?: number;
    foto: string;
    id: string;
    nombre: string;
    precio: number;
    unidad: string;
}

