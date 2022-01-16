<script lang="ts">
    import { goto } from "$app/navigation";

    import selectedProductStore from '../stores/selectedProductStore'

    export let productData:any[]
    console.log(productData)

    const navigateToProductDetail = (id:string) => {
        console.log(id)
        selectedProductStore.set({
            productId: id
        })
        console.log($selectedProductStore.productId)
        goto('/productDetail')
    }
</script>

<section>
    {#each productData as product}
        <div class="m-4">
            <button
                on:click={() => {navigateToProductDetail(product.ProductId)}}
            >
                {product.Name}
            </button>
        </div>
    {/each}
</section>