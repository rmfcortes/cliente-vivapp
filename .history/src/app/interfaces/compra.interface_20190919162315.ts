export interface Chofer {
    nombre: string;
    telefono: string;
    foto: string;
    lat: number;
    lng: number;
    id: string;
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
    usuario: string;
    createdAt: number;
}

export interface ProductoPedido {
    cantidad: number;
    id: string;
}

export interface Producto {
    cantidad?: number;
    foto: string;
    id: string;
    nombre: string;
    precio: number;
    unidad: string;
}

