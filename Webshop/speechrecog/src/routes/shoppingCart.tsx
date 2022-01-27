import { parse } from 'path/posix';
import React, {ChangeEvent, useEffect, useContext, useState, createContext} from 'react';
import { atom, useRecoilState} from 'recoil'
import '../style/shoppingCart.css'
import ShoppingListItem from '../components/shoppingListItemComponent';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import wishlist from './wishlist';

export const totalPriceState = atom({
    key:"totalPrice",
    default:0
})

export const commandsListShoppingCart = [
  {
      doel:'navigatie',
      voorbeeld:["terug"],
      uitleg: "Terug keren naar de vorige pagina."
  },
  {
    doel:'afrekenen',
    voorbeeld: ['"2" stuks "boxy ski jas"','"2" keer "boxy ski jas"'],
    uitleg: "De hoeveelheid van een bepaald product aanpassen."
    
  },
  {
    doel:'afrekenen',
    voorbeeld:['verwijder "boxy ski jas"'],
    uitleg: "Een bepaald product verwijderen."
  }
]

function ShoppingCart(){
    const [showTranscript, setshowTranscript] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [micState, setMicState] = useState<boolean>(false)
    const [shoppingCart, setShoppingCart] = useState<any[]>()
    const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState)

    useEffect(() => {
        console.log('aangepast')
    }, [shoppingCart])

    useEffect(() =>{
        const list:any = localStorage.getItem('shoppingCart')
        const parsedList = JSON.parse(list)
        setShoppingCart(parsedList)
        console.log(parsedList)
    },[])

    const goBack = () => {
        window.location.href=`/`
    }

    const commands = [
        {
            command: ['terug'],
            callback: () => goBack(),
            doel:'navigatie',
            voorbeeld:["terug"],
            uitleg: "Terug keren naar de vorige pagina"
        },
        {
          command: [':amount stuks *',':amount keer *'],
          callback: (amount:any,spokenName:any) => addOne(amount,spokenName),
        },
        {
          command:'verwijder *',
          callback: (spokenName:any) => removeItem(spokenName)
        }
    ]

    const [voiceSelected, setVoiceSelected] = useState<{product:any, amount:any, remove:boolean}>({product:'', amount:'', remove:false})
    const addOne = (amount:any,spokenText:string) =>{
      console.log(spokenText)
      const list = shoppingCart?.filter(function(eachItem){
        return eachItem['Name'].toLowerCase().includes(spokenText.toLowerCase())
      })
      console.log(list)
      if(list){
        setVoiceSelected((prev) => {
          return{
            ...prev,
            product: list[0],
            amount: checkAmount(amount),
          }
        })
        console.log(voiceSelected)
      }
    }

    const removeItem = (spokenText:any) => {
      console.log(spokenText)
      const list = shoppingCart?.filter(function(eachItem){
        return eachItem['Name'].toLowerCase().includes(spokenText.toLowerCase())
      })
      if(list){
        setVoiceSelected((prev) => {
          return{
            ...prev,
            product: list[0],
            remove: true,
          }
        })
        console.log(voiceSelected)
      }
    }

    const checkAmount = (amount:any) => {
      const numbers = {
        'een':1,
        'één':1,
        'twee':2,
        'drie':3,
        'vier':4,
        'vijf':5,
        'zes':6,
        'zeven':7,
        'acht':8,
        'negen':9,
        1:1,
        2:2,
        3:3,
        4:4,
        5:5,
        6:6,
        7:7,
        8:8,
        9:9
      }
      for(const[key, value] of Object.entries(numbers)) {
        if(key === amount){
          console.log(value)
          return value
        }
      }
      
    }

    const { transcript, listening, resetTranscript, browserSupportsSpeechRecognition, interimTranscript } = useSpeechRecognition({ commands });

    if (!browserSupportsSpeechRecognition) {
        return <span>Browser doesn't support speech recognition.</span>;
      }
    
      const startListening = () => {
        //setIsLoading(true)
        setMicState(!micState)
        setshowTranscript(!showTranscript)
    
        if(micState === true)
          SpeechRecognition.stopListening();
          
        else if(micState === false)
          SpeechRecognition.startListening({continuous: true});
          setIsLoading(true);
    
        resetTranscript()
      }

    return (
        <main className='main'>
            <div>
                <div className="goBack_container" onClick={goBack}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="goBack_icon" viewBox="0 0 24.743 23.34">
                        <path id="Icon_ionic-md-arrow-round-back" data-name="Icon ionic-md-arrow-round-back" d="M28.223,15.75H13.177l5.836-5.583a2.326,2.326,0,0,0,0-3.178,2.079,2.079,0,0,0-3.038,0L6.258,16.411a2.142,2.142,0,0,0-.633,1.575v.028a2.142,2.142,0,0,0,.633,1.575l9.71,9.422a2.079,2.079,0,0,0,3.037,0,2.326,2.326,0,0,0,0-3.178L13.17,20.25H28.216A2.2,2.2,0,0,0,30.368,18,2.178,2.178,0,0,0,28.223,15.75Z" transform="translate(-5.625 -6.33)" fill="#368ade"/>
                    </svg>
                    <p>vorige</p>
                </div>
                <div className="goBack_container goBack_command">
                    <svg xmlns="http://www.w3.org/2000/svg" className="productSection_afkorting_icon" viewBox="0 0 24.75 36">
                        <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                    </svg>
                    <p>terug</p>
                </div>
            </div>


           <div className="grid_container">
                <div className="shoppingList_grid whitespace ">
                    <p>Product</p>
                    <p>Eenheidsprijs</p>
                    <p>Aantal</p>
                    <p>Totale prijs</p>
                </div>
                <div className="shoppingList_grid_container">
                    {shoppingCart && shoppingCart.map(item => {
                        return(
                            <ShoppingListItem key={item.ProductId} product={item} list={setShoppingCart} voiceSelected={voiceSelected}/>
                        )
                    })}
                </div>
           </div>
            <div className="checkout_container">
                <div className="totalPrice_container">
                    <p>Totaalprijs:</p>
                    <p className="totalPrice_text">{totalPrice}</p>
                </div>
                <div className="checkout_btn_container">
                    <svg xmlns="http://www.w3.org/2000/svg" className="btn_icon" viewBox="0 0 30 24">
                        <path id="Icon_material-payment" data-name="Icon material-payment" d="M30,6H6A2.977,2.977,0,0,0,3.015,9L3,27a2.99,2.99,0,0,0,3,3H30a2.99,2.99,0,0,0,3-3V9A2.99,2.99,0,0,0,30,6Zm0,21H6V18H30Zm0-15H6V9H30Z" transform="translate(-3 -6)"/>
                    </svg>
                    <button className="checkout_btn">Verder naar bestellen</button>
                </div>
            </div>

            <div className="voiceControl">
              {showTranscript && 
                <div className="showTranscript">
                  <p className="showTranscript_text">Zeg iets als:</p>
                  {/* <div className="showTranscript_example_container">
                    <h2 className="showTranscript_example">'Zoek jassen van Protest'</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="showTranscript_icon" viewBox="0 0 33 33">
                      <g id="Group_5" data-name="Group 5" transform="translate(343.828 489.635)">
                        <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M6,12A3.273,3.273,0,0,0,9.273,8.727V3.273a3.273,3.273,0,0,0-6.545,0V8.727A3.273,3.273,0,0,0,6,12Zm5.455-5.455h-.545a.545.545,0,0,0-.545.545V8.727a4.369,4.369,0,0,1-4.8,4.342A4.5,4.5,0,0,1,1.636,8.533V7.091a.545.545,0,0,0-.545-.545H.545A.545.545,0,0,0,0,7.091V8.46a6.188,6.188,0,0,0,5.182,6.194v1.164H3.273a.545.545,0,0,0-.545.545v.545a.545.545,0,0,0,.545.545H8.727a.545.545,0,0,0,.545-.545v-.545a.545.545,0,0,0-.545-.545H6.818V14.667A6.006,6.006,0,0,0,12,8.727V7.091A.545.545,0,0,0,11.455,6.545Z" transform="translate(-333.328 -477.998)"/>
                        <path id="Path_4" data-name="Path 4" d="M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z" transform="translate(-345.328 -491.135)" fill="none" stroke="#000" sstrokeLinecap="round" trokeLinejoin="round" strokeWidth="3"/>
                        <ellipse id="Ellipse_1" data-name="Ellipse 1" cx="3" cy="2.875" rx="3" ry="2.875" transform="translate(-330.328 -484.373)"/>
                      </g>
                    </svg>
                  </div> */}
                  <p className="showTranscript_example">'Zoek jassen van Protest'</p>
                  <h3 className="showTranscript_transcript">{transcript}</h3>
                  {isLoading &&
                    <div className="ballsContainer">
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  }
                  <button className="showTranscript_all_commandos">alle commando's</button>
                </div>
              }
              <button className="speechButton"
                onClick={startListening}
              >
                {
                  micState ?  
                    <div className="boxContainer">
                      <div className="box box1"></div>
                      <div className="box box2"></div>
                      <div className="box box3"></div>
                      <div className="box box4"></div>
                      <div className="box box5"></div>
                  </div> :
                  <svg xmlns="http://www.w3.org/2000/svg" className="speechButton_icon" viewBox="0 0 24.75 36"fill="#368ADE" >
                    <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                  </svg>
                }
              </button>
            </div>
        </main>
    )
}

export default ShoppingCart;