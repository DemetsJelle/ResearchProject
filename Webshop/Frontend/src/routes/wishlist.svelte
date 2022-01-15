<script lang="ts">
    import { onMount } from 'svelte';
    
    import authStore from '../stores/authStore'
    import { get } from '../utils/useApi'

    let wishlist:any
    onMount(async () => {
        if($authStore.user.uid)
        {
            wishlist = await get(`/wishlist/userwishlist/${$authStore.user.uid}`)
            console.log(wishlist)   
        }
    })
</script>