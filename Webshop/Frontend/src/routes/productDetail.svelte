<script lang="ts">
    import { onMount } from 'svelte';

    import selectedProductStore from '../stores/selectedProductStore'
    import { get, post } from '../utils/useApi'

    import authStore from '../stores/authStore'

    let alt:string = 'Picture of the product'
    let pictureUrl:string
    let productInfo:any

    onMount(async () => {
        console.log()
        productInfo = await get(`/product/${$selectedProductStore.productId}`)
        console.log(productInfo.Picture)
        
    })

    const addToWishlist = async () => {
        const data:{
            userId:string,
            productId:string
        } = {
            userId: $authStore.user.uid,
            productId: productInfo.ProductId
        }
        const res:any  = await post('/wishlist',data)
        if (res.info === 'User already exists' || res.succes) {
          console.log('succesfully saved')
        }
    }
</script>

{#if productInfo}
    <section class="m-4">
        <div class="flex justify-between">
            <h1>{productInfo.Name}</h1>
            <button
                on:click={addToWishlist}
            >
                Add to wishlist
            </button>
        </div>
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
        <div class= "mt-8">
            <button
                on:click={addToWishlist}
            >
                Add to wishlist
            </button>
        </div>
    </section>
    
{/if}