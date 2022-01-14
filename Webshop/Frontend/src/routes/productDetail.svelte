<script lang="ts">
    import { onMount } from 'svelte';

    import selectedProductStore from '../stores/selectedProductStore'
    import { get } from '../utils/useApi'

    let alt:string = 'Picture of the product'
    let pictureUrl:string
    let productInfo:any
    onMount(async () => {
        console.log()
        productInfo = await get(`/product/${$selectedProductStore.productId}`)
        console.log(productInfo.Picture)
        
    })
</script>

{#if productInfo}
    <section class="m-4">
        <h1>{productInfo.Name}</h1>
        <div class="flex flex-row justify-between pt-4">
            <div>
                <p>{productInfo.Description}</p>
            </div>
            <img
                class=" object-cover w-48 h-48"
                src= {productInfo.Picture}
                alt="Picture of {productInfo.Name}"
            />
        </div>
    </section>
    
{/if}