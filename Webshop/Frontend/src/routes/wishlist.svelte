<script lang="ts">
    import WishlistComponent from '../components/wishlistComponent.svelte';

    import { onMount } from 'svelte';
    
    import authStore from '../stores/authStore'
    import { get } from '../utils/useApi'
    import { goto } from '$app/navigation';

    let wishlist:any[]
    onMount(async () => {
        if($authStore.user !== undefined){
            console.log('in')
            wishlist = await get(`/wishlist/userwishlist/${$authStore.user.uid}`)
            console.log(wishlist)   
        }
    })

    const goBack = () => {
        goto('/')
    }

    const goToPayment = () => {
        goto('/betaling')
    }
</script>

<section>
    <section
        class="m-4 pb-4 flex justify-between hover:cursor-pointer hover:font-bold"
        on:click={goBack}
    >
        <div class="flex">
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
        </div>
        <div>
            <button
                on:click={goToPayment}
            >
                Betalen
            </button>
        </div>
    </section>
    {#if wishlist}
        {#each wishlist as item}
            <WishlistComponent productData = {item}/>
        {/each}
    {/if}
</section>