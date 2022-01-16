import { writable } from "svelte/store";
import type firebase from "firebase/app"

export const shoppingListStore = writable<[{
    productId: string;
    picture: string;
    name: string;
    price: number;
    inStock: boolean
}]>([{
    productId: '',
    picture: '',
    name: '',
    price: 0,
    inStock: false
}])

export const shoppingListPriceStore = writable<{
    totalPrice: number
}>({
    totalPrice: 0
})

//const shoppingListStore = writable({items:[]})

export default{
    subscribe: shoppingListStore.subscribe,
    set: shoppingListStore.set
}
