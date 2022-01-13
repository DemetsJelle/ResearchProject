<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from '../utils/useApi'

    onMount(async () =>{
        const allBrands = await get('/brand/all')
        console.log(allBrands)

        const allCategories = await get('/category/all')
        console.log(allCategories)

        const allProducts = await get('products/all')
        console.log(allProducts)

        
    })

</script>

<svelte:head>
    <h1 class="text-4xl text-center my-8">Test</h1>
</svelte:head>

<!-- Zoekbalk -->
<section>

</section>

<!-- Main content -->
<secion>

</secion>