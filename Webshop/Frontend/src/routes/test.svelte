<script lang="ts">
    import { onMount } from "svelte";
    import { SpeechClient } from "@google-cloud/speech"
    
    const encoding = 'LINEAR16',
        sampleRateHertz = 16000,
        languageCode = 'en-US'

    let speak:boolean = false

    onMount(async () => {
        speechSynthesis.onvoiceschanged = () => {
            console.log(speechSynthesis.getVoices(), " voices");
        }        
    })

</script>

<section>
    <button class="m-4"
        
    >
        Start
    </button>
</section>