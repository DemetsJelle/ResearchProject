<script lang="ts">
    import { shoppingListPriceStore, shoppingListStore } from '../stores/shoppingListStore'
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
        //console.log(cost)
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

    const removeFromList = () => {
        //console.log('clicked')  
        
        $shoppingListStore.forEach((value, index)=>{
            if(value.name === listItem.name) 
                $shoppingListStore.splice(index,1)
        })

        //console.log($shoppingListStore) 
    }
</script>

<section class="flex justify-center">
    <div class="w-1/2 mt-8">
        <div class="flex justify-between">
            <img
                class=" object-cover w-48 h-48"
                src= {listItem.picture}
                alt="Picture of {listItem.name}"
            />
            {#if price !== NaN}
                <p>{price}€</p>
            {/if}
            <div class=''>
                <button class="w-8 h-8 bg-gray-300" on:click={decrease}> - </button>
                <input class="w-4 text-center" type="text" bind:value={amount}/>
                <button  class="w-8 h-8 bg-gray-300" on:click={increase}> + </button>
            </div>
        </div>
        
        <div class="flex flex-row justify-between">
            <h2 class='mt-2'>{listItem.name}</h2>
            <button
                on:click={removeFromList}
            >
                <svg class ="w-6 h-6 fill-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 31.5 36">
                    <path id="Icon_awesome-trash" 
                        data-name="Icon awesome-trash"
                        d="M30.375,2.25H21.938L21.277.935A1.688,1.688,0,0,0,19.765,0H11.728a1.668,1.668,0,0,0-1.5.935L9.563,2.25H1.125A1.125,1.125,0,0,0,0,3.375v2.25A1.125,1.125,0,0,0,1.125,6.75h29.25A1.125,1.125,0,0,0,31.5,5.625V3.375A1.125,1.125,0,0,0,30.375,2.25ZM3.741,32.836A3.375,3.375,0,0,0,7.109,36H24.391a3.375,3.375,0,0,0,3.368-3.164L29.25,9h-27Z" 
                        transform="translate(0 0)"/>
                  </svg>
            </button>
        </div>
    </div>
</section>
