<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from '../utils/useApi'

    let allBrands:any[] = []
    let allCategories:any[] = []
    let allProducts:any[] = []

    onMount(async () =>{
        allBrands = await get('/brand/all')
        console.log(allBrands)

        allCategories = await get('/category/all')
        console.log(allCategories)

        allProducts = await get('/product/all')
        console.log(allProducts)
    })

</script>

<svelte:head>
    <h1 class="text-4xl text-center my-8">Test</h1>
</svelte:head>

<!-- Zoekbalk -->
<section>
    <div class='m-4 flex justify-between'>
        <div>
            <h1>LOGO</h1>
        </div>

        <div>
            <select name="brands" id="brands">
                {#each allBrands as brands}
                    <option value = {brands.BrandId}>
                        {brands.Name}
                    </option>
                {/each}
            </select>
        </div>

        <div>
            <select name="categories" id="categories">
                {#each allCategories as category}
                    <option value = {category.CategoryId}>
                        {category.Name}
                    </option>
                {/each}
            </select>
        </div>
    </div>
</section>

<!-- Main content -->
<secion>
    {#each allProducts as product}
        <div class="m-4">
            <h1>{product.Name}</h1>
        </div>
    {/each}
</secion>