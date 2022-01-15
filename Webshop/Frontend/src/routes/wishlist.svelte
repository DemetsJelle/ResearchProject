<script lang="ts">
    import WishlistComponent from '../components/wishlistComponent.svelte';

    import { onMount } from 'svelte';
    
    import authStore from '../stores/authStore'
    import { get } from '../utils/useApi'

    let wishlist:any[]
    onMount(async () => {
        if($authStore.user !== undefined){
            console.log('in')
            wishlist = await get(`/wishlist/userwishlist/${$authStore.user.uid}`)
            console.log(wishlist)   
        }
    })
</script>

<section>
    {#if wishlist}
        {#each wishlist as item}
            <WishlistComponent productData = {item}/>
        {/each}
    {/if}
</section>