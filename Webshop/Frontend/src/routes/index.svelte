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
    let allGenders:any[] = []

    let showLogin:boolean = false

    let brandValue:string = ''
    let catValue:string = ''
    let genderValue:string = ''
    let searchTerm:string = ''

    let filteredData:any[] = []
    let IsFiltered:boolean = false
    let lastFilter:string =''


    onMount(async () =>{
        allBrands = await get('/brand/all')

        allCategories = await get('/category/all')

        allProducts = await get('/product/all')

        allGenders = await get('/product/all/genders')
    })

    const filter = () => {
        //Enkel categorie
        if(catValue !== '' && brandValue === '' && genderValue === ''){
            filteredData = allProducts.filter(p => p.Category.CategoryId === catValue)
            IsFiltered = true
        }
        //Enkel brand
        else if(catValue === '' && brandValue !== '' && genderValue === ''){
            filteredData = allProducts.filter(p => p.Brand.BrandId === brandValue)
            IsFiltered = true
        }
        //Enkel gender
        else if(catValue === '' && brandValue === '' && genderValue !== ''){
            filteredData = allProducts.filter(p => p.Gender === genderValue)
            IsFiltered = true
        }
        //Categorie en brand
        else if (catValue !== '' && brandValue !== '' && genderValue === ''){
            filteredData = allProducts.filter(p => p.Category.CategoryId === catValue)
            filteredData = filteredData.filter(p => p.Brand.BrandId === brandValue)
        }
        //Categorie en gender
        else if (catValue !== '' && brandValue === '' && genderValue !== ''){
            filteredData = allProducts.filter(p => p.Category.CategoryId === catValue)
            filteredData = filteredData.filter(p => p.Gender === genderValue)
        }
        //Brand en gender
        else if (catValue === '' && brandValue !== '' && genderValue !== ''){
            filteredData = allProducts.filter(p => p.Brand.BrandId === brandValue)
            filteredData = filteredData.filter(p => p.Gender === genderValue)
        }
        //Alles
        else if (catValue !== '' && brandValue !== '' && genderValue !== ''){
            filteredData = allProducts.filter(p => p.Category.CategoryId === catValue)
            filteredData = filteredData.filter(p => p.Brand.BrandId === brandValue)
            filteredData = filteredData.filter(p => p.Gender === genderValue)
        }
        //Text search
        else if(searchTerm !== ''){
            console.log(searchTerm)
            catValue = ''
            brandValue = ''
            genderValue = ''
            filteredData = allProducts.filter(function(eachItem){
                return eachItem['Name'].toLowerCase().includes(searchTerm.toLowerCase())
            })
            IsFiltered = true
        }
        else {
            IsFiltered = false
        }
        
        //console.log(filteredData) 
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
        goto('/wishlist')
    }

    const gotoShoppingCart = () => {
        goto('/shoppinglist')
    }
</script>

<svelte:head>
    <h1 class="text-4xl text-center my-8">Test</h1>
</svelte:head>

<!-- Zoekbalk -->
<section>
    <div class='m-4 flex justify-between'>
        <div>
            <select bind:value = {brandValue} on:change={filter}>
                <option value = ''>
                        
                </option>
                {#each allBrands as brands}
                    <option value = {brands.BrandId}>
                        {brands.Name}
                    </option>
                {/each}

            </select>
        </div>

        <div>
            <select bind:value = {catValue} on:change={filter}>
                <option value = ''>
                        
                </option>
                {#each allCategories as category}
                    <option value = {category.CategoryId}>
                        {category.Name}
                    </option>
                {/each}
            </select>
        </div>

        <div>
            <select bind:value = {genderValue} on:change={filter}>
                <option value = ''>
                        
                </option>
                {#each allGenders as gender}
                    <option value = {gender.Gender}>
                        {gender.Gender}
                    </option>
                {/each}
            </select>
        </div>

        <div>
            <input type='text' 
                placeholder='item name' 
                bind:value ={searchTerm}
                on:input = {filter}    
            />
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
    </div>
    <div class="flex m-4">
        <div class="mr-4">
            <button
                on:click={gotoWishlist}
            >
                Wishlist
            </button>
        </div>

        <div>
            <button
                on:click={gotoShoppingCart}
            >
                Shoppingcart
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