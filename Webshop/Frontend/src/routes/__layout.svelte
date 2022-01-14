<script lang="ts">
    import { initializeApp } from 'firebase/app'
    import { getAuth, User } from 'firebase/auth'
    import authStore from '../stores/authStore'
    import { onMount } from 'svelte'

    onMount(() => {
        const firebaseConfig = {
            apiKey: "AIzaSyAInXpDLN3LxRZtxgewX9AEr3wrqmzq994",
            authDomain: "researchproject-c8f81.firebaseapp.com",
            projectId: "researchproject-c8f81",
            storageBucket: "researchproject-c8f81.appspot.com",
            messagingSenderId: "33470927218",
            appId: "1:33470927218:web:749219df2d656472d9cdeb"
        }
        initializeApp(firebaseConfig)
        
        getAuth().onAuthStateChanged((user:User) => {
            console.log("im fired")
            authStore.set({
                    isLoggedIn: user !== null,
                    user,
                    firebaseControlled: true,
                })
                console.log($authStore.isLoggedIn)
        })
    })

</script>

<slot></slot>

<style>
    @tailwind base;
    @tailwind components;
    @tailwind utilities;
</style>