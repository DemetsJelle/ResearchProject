<script>
    import { Client, Segment } from "@speechly/browser-client";
 
    let microphone = false
    let speech
 
    const client = new Client({
        appId:'someId',
        language: 'en-US'
    });
    client.initialize();
 
    const speak = () => {
         microphone = !microphone
 
         if(microphone)
             client.startContext();
         else
             client.stopContext();
    }
 
    client.onSegmentChange((segment) => {
         console.log('Received new segment from the API:', segment.intent, segment.entities, segment.words, segment.isFinal)
     })
 </script>
 
 <section>
     <button
         on:click = {speak}
     >
         MICROPHONE
     </button>
 </section>