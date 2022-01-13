<script lang="ts">

    export let productData:any[]
    console.log(productData)
</script>

<section>
    {#each productData as product}
        <div class="m-4">
            <h1>{product.Name}</h1>
        </div>
    {/each}
</section>