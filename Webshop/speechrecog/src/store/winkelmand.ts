import { createContext } from 'react';

interface winkelMand{
    productId: string;
    picture: string;
    name: string;
    price: number;
    inStock: boolean
}

export const winkelMandContext = createContext<winkelMand[]>([])