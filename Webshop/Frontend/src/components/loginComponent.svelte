<script lang="ts">
    import { fade } from 'svelte/transition'
    import loginCompStore from '../stores/loginCompStore'
    import { get, post } from '../utils/useApi'
    import {getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, } from 'firebase/auth'

    let validationError: boolean = true
    let email: string = ''
    let pw: string = ''
    let loginClicked: boolean = false
  
    let errors: any = {}

    const auth = getAuth()

    const CreateUser = async (data) => {
      console.log('-----------------------')
      console.log(data)
      const res: any = await post('/user/createUser', data)
      if (res.info === 'User already exists' || res.succes) {
          showLoginForm()
      }
    }

    const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider()
      signInWithPopup(auth, provider).then(userCrendtial => {
        const user = userCrendtial.user
        const name = user.displayName.split(' ')
        const data: {
          id: string
          firstname: string
          lastname: string
          email: string
        } = {
          id: user.uid,
          firstname: name[0],
          lastname: name[1],
          email: user.email
        }
        CreateUser(data)
      })
    } catch (error) {}
  }

  const loginWithEmail = () => {
    loginClicked = true
    signInWithEmailAndPassword(auth, email, pw)
      .then(userCredential => {
        const user = userCredential.user
        if (user.email !== undefined) {
          email = ''
          pw = ''
          showLoginForm()
        }
      })
      .catch(error => {
        loginClicked = false
        //const errorCode = error.code
        const errorMessage = error.message
        errors.login = 'Email or password are incorrect'
        if (error.message === 'Firebase: Error (auth/wrong-password).')
          errors.login = 'Email or password are incorrect'
        if (
          error.message ===
          'Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).'
        )
          errors.login =
            'Account temporarily disabled due to many failed attempts'
      })
  }

  const showLoginForm = () => {
    let loginToggle = $loginCompStore.showLogin
    loginToggle = !loginToggle
    loginCompStore.set({
      showRegister: false,
      showLogin: loginToggle,
    })
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
    loginWithEmail()
  }

</script>
  
  <div class="absolute top-0 left-0 h-full z-10 w-full">
    <div
      class="flex justify-center items-center w-screen h-screen bg-black bg-opacity-70 fixed"
    >
      <form
        on:submit|preventDefault={onSubmit}
        class="w-4/5 sm:w-3/5 md:w-3/5 lg:w-2/5 xl:w-2/5 2xl:w-2/5 3xl:w-1/5 z-10 bg-white p-8 flex flex-col"
        id="loginForm"
        in:fade
        out:fade
      >
      <div class="flex justify-between mb-4">
        <h1 class=" text-2xl text-forest-green">Login</h1>
        <button on:click={showLoginForm} name="closeLoginForm">
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
        <label for="loginEmail" class="font-bold">
          Email
        </label>
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            bind:value={email}
            id="loginEmail"
            name="loginEmail"
            type="text"
            placeholder="name@acme.com"
            class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>
        {#if errors.email}
          <p class="text-red-600 -mt-2 mb-2">{errors.email}</p>
        {/if}
  
        <label for="loginPw" class="font-bold"
          >Wachtwoord</label
        >
        <div class="border-b text-dim-gray mb-2 border-current">
          <input
            bind:value={pw}
            type="password"
            name="loginPw"
            id="loginPw"
            placeholder='niks'
            class="w-full focus:outline-none py-1 focus:ring focus:ring-forest-green text-sm md:text-md"
          />
        </div>
        {#if errors.pw}
          <p class="text-red-600 -mt-2 mb-2">{errors.pw}</p>
        {/if}
          <button class="text-left">
            Forgot Password
          </button>
          <button
            type="submit"
            class="bg-forest-green rounded-full p-2 mt-4 font-bold text-2xl text-white"
          >
            login
          </button>
          {#if errors.login}
            <p class="text-red-600 mt-2 mb-2">{errors.login}</p>
          {/if}
          <div class="mt-4">
            <button type="button" on:click|preventDefault={loginWithGoogle}>
              sign in with google
            </button>
          </div>
          <div class="mt-4 flex">
            <p>Maak een account</p>
            <button
              on:click={showRegisterForm}
              class="ml-1 font-bold text-forest-green"
              >Registreer</button
            >
          </div>
      </form>
    </div>
  </div>
  