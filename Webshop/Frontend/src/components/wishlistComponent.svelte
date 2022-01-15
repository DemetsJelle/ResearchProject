<script lang="ts">
    import { goto } from "$app/navigation";
    import selectedProductStore from '../stores/selectedProductStore'
    
    export let productData:any

    const navigateToProductDetail = (id:string) => {
        console.log(id)
        selectedProductStore.set({
            productId: id
        })
        console.log($selectedProductStore.productId)
        goto('/productDetail')
    }

</script>

<div class="m-4">
    <button
        class="text-black"
        on:click={() => {navigateToProductDetail(productData.Product.ProductId)}}
    >
        {productData.Product.Name}
    </button>
</div>