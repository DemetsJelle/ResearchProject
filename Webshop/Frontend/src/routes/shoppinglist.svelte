<script lang="ts">
    import { goto } from '$app/navigation';

    import { shoppingListPriceStore, shoppingListStore } from '../stores/shoppingListStore'

    import ShoppingListComponent from '../components/shoppinglistComponent.svelte'
    
    import { onMount } from 'svelte';

    const goBack = () => {
        goto('/')
    }
</script>

<section class="w-screen h-screen bg-black text-white">
    <section class="m-4 ">
        <section>
            <section
                class="pb-4 flex hover:cursor-pointer hover:font-bold"
                on:click={goBack}
            >
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 my-auto"
                viewBox="0 0 20.828 37.657"
                >
                    <path
                        id="chevron-down"
                        d="M6,9,22,25,38,9"
                        transform="translate(27 -3.172) rotate(90)"
                        fill="none"
                        stroke="#686868"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="4"
                    />
                </svg>
        
                <p class="">Go back</p>
            </section>
            <h1>ShoppingList</h1>
        </section>
        
        <section class="m-4">
            {#each $shoppingListStore as item}
                {#if item.productId !== ''}
                    <ShoppingListComponent listItem = {item}/>
                {/if}
            {/each}
        </section>
    
        <div class= 'm-auto border-t-2 border-gray-400 w-1/2 my-4'></div>
        <section class="w-1/4 m-auto">
            <h1>Order overview</h1>
            <div class = 'flex flex-row justify-between my-2'>
                <h2>Total</h2>
                <p>{$shoppingListPriceStore.totalPrice.toFixed(2)}</p>
            </div>
        </section>
        
    </section>
</section>