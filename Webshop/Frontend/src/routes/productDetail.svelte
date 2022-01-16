<script lang="ts">
    import { onMount } from 'svelte';

    import selectedProductStore from '../stores/selectedProductStore'
    import { get, post } from '../utils/useApi'

    import authStore from '../stores/authStore'
import { goto } from '$app/navigation';

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

    const goBack = () => {
        goto('/')
    }
</script>

{#if productInfo}
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