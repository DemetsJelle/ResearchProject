<script lang="ts">
    import { shoppingListPriceStore } from '../stores/shoppingListStore'
    import { onMount } from "svelte";
    
    export let listItem

    let amount:number = 0
    let price:number
    let cost:number 

    onMount(async () => {
        calculatePrice()
    })
    const increase = () => {
        amount = amount + 1
        calculatePrice()
        console.log(cost)
        $shoppingListPriceStore.totalPrice  = $shoppingListPriceStore.totalPrice + cost
    }

    const decrease = () => {
        amount = amount - 1
        if(amount < 0 )
            amount = 0
        calculatePrice()
        $shoppingListPriceStore.totalPrice  = $shoppingListPriceStore.totalPrice - cost
    }

    const calculatePrice = () => {
        cost = listItem.price
        price = Number(cost) * Number(amount)
    }
</script>

<section class="flex justify-center">
    <div class="w-1/2 mt-8 flex justify-between">
        <div>
            <img
                class=" object-cover w-48 h-48"
                src= {listItem.picture}
                alt="Picture of {listItem.name}"
            />
            <h2 class='mt-2'>{listItem.name}</h2>
        </div>
        {#if price !== NaN}
            <p>{price}€</p>
        {/if}
        <div class=''>
            <button class="w-8 h-8 bg-gray-300" on:click={decrease}> - </button>
            <input class="w-4 text-center" type="text" bind:value={amount}/>
            <button  class="w-8 h-8 bg-gray-300" on:click={increase}> + </button>
        </div>
    </div>
    
</section>