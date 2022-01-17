<script lang="ts">

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

    let paywall:boolean

    function showPaywall() {
      paywall = !paywall
      // let paywallToggle = $paywallCompStore.showPaywall
      // paywallToggle = !paywallToggle
      // paywallCompStore.set({
      //   showPaywall: paywallToggle,
      // })
  }

</script>

<section class="">
    <!-- STATUSBALK -->
    <section>
        
    </section>

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
          <button
            on:click ={showPaywall}
          >
              Pay
          </button>
      </div>      
  </section>

  {#if paywall}
  <div class="absolute top-0 left-0 h-full z-10 w-full">
    <div
      class="flex justify-center items-center w-screen h-screen bg-black bg-opacity-70 fixed"
    >
      <form
        class="w-4/5 sm:w-3/5 md:w-3/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 3xl:w-1/5 z-10 bg-white p-8 flex flex-col"
      >
        <div class="flex justify-between mb-4">
          <h1 class=" text-xl md:text-2xl text-forest-green">
            Payment Method
          </h1>
          <svg
            on:click={showPaywall}
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 fill-current text-forest-green cursor-pointer"
            viewBox="0 0 32 32"
          >
            <path
              id="Icon_material-close"
              data-name="Icon material-close"
              d="M39.5,10.723,36.277,7.5,23.5,20.277,10.723,7.5,7.5,10.723,20.277,23.5,7.5,36.277,10.723,39.5,23.5,26.723,36.277,39.5,39.5,36.277,26.723,23.5Z"
              transform="translate(-7.5 -7.5)"
            />
          </svg>
        </div>
        <img
          src="/FreePlasticCreditDebitCardMockup.png"
          class=" w-3/4 mx-auto my-4"
          alt="Debit credit card"
        />
        <label for="ccn" class="font-bold">CardNr</label>
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            bind:value={number}
            on:input
            id="ccn"
            inputmode="numeric"
            type="tel"
            maxlength="19"
            placeholder="xxxx xxxx xxxx xxxx"
            class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>
  
        <label for="name" class="font-bold">Cardholder</label>
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            
            id="name"
            placeholder="ex: John Smith"
            class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>

        <div class="grid grid-cols-2 gap-4">
          <div>
            <label for="expiry" class="font-bold">Expiry date</label>
            <div class="border-b text-dim-gray mb-2 border-current">
              <input

                type="text"
                id="expiry"
                placeholder="MM/YY"
                maxlength="5"
                class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
              />
            </div>

          </div>
          <div>
            <label for="securityCode" class="font-bold"
              >Password</label
            >
            <div class="border-b text-dim-gray mb-2 border-current">
              <input
                maxlength="3"
                type="password"
                id="securityCode"
                placeholder="CVC"
                class="w-full py-1 focus:outline-none focus:ring focus:ring-forest-green text-sm md:text-md"
              />
            </div>

          </div>
        </div>

          <button
            type="submit"
            class="flex mx-auto mt-2 p-4 justify-center items-center font-bold text-2xl text-white bg-forest-green rounded-xl hover:bg-cyprus-green"
          >
            Continue
          </button>
      </form>
    </div>
  </div>
  {/if}
</section>

