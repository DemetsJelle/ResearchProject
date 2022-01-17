<script lang="ts">

    let delivery:boolean = true
    let pickup:boolean = false

    let email:string
    let firstname:string
    let lastname:string
    let street:string
    let number:number
    let code:number
    let city:string
    let country:string
    let telephone:string
    let company:string
    let btwNumber:string

</script>

<section class="w-screen h-screen bg-black text-white">
    <!-- STATUSBALK -->
    <section>
        
    </section>

    
    <section class="p-4">
        <h1 class="my-4">Methods</h1>
        <div class="flex items-center mt-2">
            <input class="mr-2" type="radio" id="delivery" name="type" on:click={() => {delivery = !delivery;}}/>
            <label for="delivery">Delivery</label>
        </div>
        <div class="flex items-center mt-2">
            <input class="mr-2" type="radio" id="pickup" name="type" on:click={() => {pickup = !pickup;}}/>
            <label for="pickup">Pick-up</label>
        </div>
            
    </section>
    {#if delivery}
        <section class='w-1/2 p-4'>
            <h1 class="p-4 font-bold">Adress</h1>
            <div class="flex">
                <div class="p-4">
                    <label for="firstname" class="font-bold">
                        FirstName
                    </label>
                      <div class="border-b text-dim-gray mb-2 border-current">
                        <input
                          bind:value={firstname}
                          id="firstname"
                          name="firstname"
                          type="text"
                          placeholder="Firstname"
                          class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
                        />
                      </div>
                </div>

                <div class="p-4">
                    <label for="firstname" class="font-bold">
                        LastName
                      </label>
                      <div class="border-b text-dim-gray mb-2 border-current">
                        <input
                          bind:value={lastname}
                          id="lastname"
                          name="lastname"
                          type="text"
                          placeholder="name@acme.com"
                          class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
                        />
                      </div>
                </div>
            </div>

            <div class="flex">
                <div class="p-4">
                    <label for="street" class="font-bold">
                        Street
                    </label>
                      <div class="border-b text-dim-gray mb-2 border-current">
                        <input
                          bind:value={street}
                          id="street"
                          name="street"
                          type="text"
                          placeholder="Street name"
                          class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
                        />
                      </div>
                </div>

                <div class="p-4">
                    <label for="number" class="font-bold">
                        Number
                      </label>
                      <div class="border-b text-dim-gray mb-2 border-current">
                        <input
                          bind:value={number}
                          id="number"
                          name="number"
                          type="text"
                          placeholder="1"
                          class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
                        />
                      </div>
                </div>
            </div>

            <div class="flex">
                <div class="p-4">
                    <label for="code" class="font-bold">
                        Code
                    </label>
                      <div class="border-b text-dim-gray mb-2 border-current">
                        <input
                          bind:value={code}
                          id="code"
                          name="code"
                          type="text"
                          placeholder="9770"
                          class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
                        />
                      </div>
                </div>

                <div class="p-4">
                    <label for="city" class="font-bold">
                        City
                      </label>
                      <div class="border-b text-dim-gray mb-2 border-current">
                        <input
                          bind:value={city}
                          id="city"
                          name="city"
                          type="text"
                          placeholder="Kruisem"
                          class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
                        />
                      </div>
                </div>

                <div class="p-4">
                    <label for="country" class="font-bold">
                        Country
                      </label>
                      <div class="border-b text-dim-gray mb-2 border-current">
                        <input
                          bind:value={country}
                          id="country"
                          name="country"
                          type="text"
                          placeholder="1"
                          class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
                        />
                      </div>
                </div>
            </div>

            <div class="p-4">
                <label for="phone" class="font-bold">
                    Phone number
                  </label>
                  <div class="border-b text-dim-gray mb-2 border-current">
                    <input
                      bind:value={telephone}
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="0490434204"
                      class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
                    />
                  </div>
            </div>

            <div class="flex">
                <div class="p-4">
                    <label for="company" class="font-bold">
                        Company
                    </label>
                      <div class="border-b text-dim-gray mb-2 border-current">
                        <input
                          bind:value={company}
                          id="company"
                          name="company"
                          type="text"
                          placeholder=""
                          class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
                        />
                      </div>
                </div>

                <div class="p-4">
                    <label for="sat" class="font-bold">
                        SAT-number
                      </label>
                      <div class="border-b text-dim-gray mb-2 border-current">
                        <input
                          bind:value={btwNumber}
                          id="sat"
                          name="sat"
                          type="text"
                          placeholder=""
                          class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
                        />
                      </div>
                </div>
            </div>

            <div class="flex justify-center">
                <button>
                    Pay
                </button>
            </div>
            
        </section>
    {/if}
</section>

