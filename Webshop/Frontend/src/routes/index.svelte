<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from '../utils/useApi'
    import ProductComponent from '../components/productComponent.svelte'
    let allBrands:any[] = []
    let allCategories:any[] = []
    let allProducts:any[] = []

    let brandValue:any= ''
    let catValue:any = ''
    let filteredData:any[] = []
    let IsFiltered:boolean = false
    console.log(IsFiltered)

    onMount(async () =>{
        allBrands = await get('/brand/all')
        //console.log(allBrands)

        allCategories = await get('/category/all')
        //console.log(allCategories)

        allProducts = await get('/product/all')
        //console.log(allProducts)
    })

    const filter = () => {
        if (catValue !== "" || brandValue !== "") 
            IsFiltered = true
        else 
            IsFiltered = false

        console.log(`catValue ${catValue}`)
        console.log( `brandValue ${brandValue}`)

        if(catValue === '')
            filteredData = allProducts.filter(p => p.Brand.BrandId === brandValue)

        else if(brandValue === '')
            filteredData = allProducts.filter(p => p.Category.CategoryId === catValue)

        else if (brandValue !== '' && catValue !== '')
            filteredData = allProducts.filter(p => p.Category.CategoryId === catValue)
            filteredData = filteredData.filter(p => p.Brand.BrandId === brandValue)
        
        console.log(filteredData)

        
    }
    
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
            <select bind:value = {brandValue}>
                {#each allBrands as brands}
                    <option value = {brands.BrandId}>
                        {brands.Name}
                    </option>
                {/each}
            </select>
        </div>

        <div>
            <select bind:value = {catValue}>
                {#each allCategories as category}
                    <option value = {category.CategoryId}>
                        {category.Name}
                    </option>
                {/each}
            </select>
        </div>

        <div>
            <button
                on:click= {filter}
            >
                Zoek
            </button>
        </div>
    </div>
</section>

<!-- Main content -->
<section>
    {#if IsFiltered}
        <ProductComponent productData = {filteredData}/>
    {:else}
        <ProductComponent productData = {allProducts}/>
    {/if}
    
</section>