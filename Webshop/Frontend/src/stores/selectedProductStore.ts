import { writable } from "svelte/store";
import type firebase from "firebase/app"

const selectedProductStore = writable<{
    productId: string;
}>({
    productId:''
});

export default{
    subscribe: selectedProductStore.subscribe,
    set: selectedProductStore.set
}