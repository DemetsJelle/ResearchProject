<script lang="ts">
    import authStore from '../stores/authStore'
    import loginCompStore from '../stores/loginCompStore'
    import { post } from '../utils/useApi'
    import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'

    let email: string
    let firstName: string
    let lastName: string
    let pw: string
    let cpw: string
    let registerClicked: boolean = false
    let errors: any = {}
  
    let result = null
  
    function showLoginForm() {
      let loginToggle = $loginCompStore.showLogin
      loginToggle = !loginToggle
      loginCompStore.set({
        showRegister: false,
        showLogin: loginToggle,
      })
    }
  
    const register = () => {
      registerClicked = true
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, pw)
        .then(userCredential => {
            const user = userCredential.user
            console.log(user)
            updateProfile(user, { displayName: `${firstName} ${lastName}` })
            .then(() => {
              const data: {
                id: string
                firstname: string
                lastname: string
                email: string
              } = {
                id: user.uid,
                firstname: firstName,
                lastname: lastName,
                email: email,
              }
                createUser(data)
            })
            .catch(error => {})
        })
        .catch(error => {
            const errorCode = error.code
            const errorMessage = error.message
            if (errorMessage == 'Firebase: Error (auth/email-already-in-use).') {
                errors.email = 'Email already in use'
            }
        })
    }
    
    async function createUser(data) {
      console.log(data)
        const res: any = await post('/user/createUser', data)
        registerClicked = false
        if (res.info === 'User already exists' || res.succes) {
          showRegisterForm()
        }
    }
  
    const showRegisterForm = () => {
      let registerToggle = $loginCompStore.showRegister
      registerToggle = !registerToggle
      loginCompStore.set({
        showRegister: registerToggle,
        showLogin: false,
      })
    }
  
    const onSubmit = () => {
        console.log('clicked')
      register()
    }
  </script>
  
  <div class="absolute top-0 left-0 h-full z-10 w-full">
    <div
      class="flex justify-center items-center w-screen h-screen bg-black bg-opacity-70 fixed"
    >
      <form
        on:submit|preventDefault={onSubmit}
        class="w-4/5 sm:w-3/5 md:w-3/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 3xl:w-1/5 z-10 bg-white p-8 flex flex-col"
        id="registerForm"
      >
        <div class="flex justify-between mb-4">
          <h1 class=" text-2xl text-forest-green">
            Registreren
          </h1>
          <button on:click={showRegisterForm} name="closeRegisterForm">
            <svg
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
          </button>
        </div>
  
        <label for="registerEmail" class="font-bold">
          Email
        </label>
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            bind:value={email}
            id="registerEmail"
            type="email"
            name="registerEmail"
            placeholder="name@acme.com"
            class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>
        {#if errors.email}
          <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
        {/if}
  
        <label for="firstName" class="font-bold"
          >Voornaam</label
        >
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            bind:value={firstName}
            type="text"
            id="firstName"
            name="firstName"
            placeholder=Voornaam
            class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>
        {#if errors.firstname}
          <p class="text-red-600 -mt-2 mb-2">{errors.firstname}</p>
        {/if}
  
        <label for="lastName" class="font-bold"
          >Achternaam</label
        >
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            bind:value={lastName}
            type="text"
            id="lastName"
            name="lastName"
            placeholder=Achternaam
            class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>
        {#if errors.lastname}
          <p class="text-red-600 -mt-2 mb-2">{errors.lastname}</p>
        {/if}
  
        <label for="pw" class="font-bold">Wachtwoord</label>
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            bind:value={pw}
            type="password"
            name="pw"
            id="pw"
            placeholder=Wachtwoord
            class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>
        {#if errors.pw}
          <p class="text-red-600 -mt-2 mb-2">{errors.pw}</p>
        {/if}
  
        <label for="cpw" class="font-bold"
          >Bevestig wachtwoord</label
        >
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            bind:value={cpw}
            type="password"
            name="cpw"
            id="cpw"
            placeholder= "Bevestig wachtwoord"
            class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>
        {#if errors.cpw}
          <p class="text-red-600 -mt-2 mb-2">{errors.cpw}</p>
        {/if}
        <button
            type="submit"
            name="submitRegister"
            class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white"
        >
            Registreer
        </button>
  
        <div class="mt-4 flex">
            <p>Al een account</p>
            <button
              on:click={showLoginForm}
              class="ml-1 font-bold text-forest-green"
              >Login</button
            >
        </div>

      </form>
    </div>
  </div>
  