<script lang="ts">
    import { getAuth } from 'firebase/auth'
    import { onMount } from 'svelte';
    import { get } from '../utils/useApi'
    
    import { goto } from '$app/navigation';

    import ProductComponent from '../components/productComponent.svelte'
    import LoginComponent from '../components/loginComponent.svelte';
    import RegisterComponent from '../components/registerComponent.svelte'

    import loginCompStore from '../stores/loginCompStore'
    import authStore from '../stores/authStore'

    let allBrands:any[] = []
    let allCategories:any[] = []
    let allProducts:any[] = []

    let showLogin:boolean = false

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

    const showLoginForm = () => {
        let loginToggle = $loginCompStore.showLogin
        loginToggle = !loginToggle

        loginCompStore.set({
            showRegister: false,
            showLogin: loginToggle,
        })
    }

    const logOut = () => {
        const auth = getAuth()
        auth.signOut()
    }
    
    const gotoWishlist = () => {
        console.log('pressed')
        goto('/wishlist')
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
            <select bind:value = {brandValue} on:change={filter}>
                {#each allBrands as brands}
                    <option value = {brands.BrandId}>
                        {brands.Name}
                    </option>
                {/each}
            </select>
        </div>

        <div>
            <select bind:value = {catValue} on:change={filter}>
                {#each allCategories as category}
                    <option value = {category.CategoryId}>
                        {category.Name}
                    </option>
                {/each}
            </select>
        </div>

        <div>
            {#if $authStore.isLoggedIn}
                <button
                    on:click={logOut}
                    class="font-bold text-xl text-forest-green pl-4 pr-6"
                    >{$authStore.user.displayName}</button
                >
            {:else}
                <button
                    on:click= {showLoginForm}
                >
                    Login
                </button>
            {/if}
        </div>

        <div>
            <button
                on:click={gotoWishlist}
            >
                Wishlist
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

    {#if $loginCompStore.showLogin} 
        <LoginComponent/>
    {:else if $loginCompStore.showRegister}
        <RegisterComponent/>
    {/if}
    
</section>