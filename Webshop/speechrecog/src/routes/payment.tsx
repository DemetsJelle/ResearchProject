import React, {ChangeEvent,useState, useEffect} from 'react';
import '../style/payment.css'

import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export const commandsPayment = [
    {
        doel:'invullen',
        voorbeeld:['voornaam "Jelle"'],
        uitleg: "voornaam invullen"
    },
    {
        doel:'invullen',
        voorbeeld:['achternaam "Demets"'],
        uitleg: "Achternaam invullen"
    },
    {
        doel:'invullen',
        voorbeeld:['email "jelle.demets@outlook.be"'],
        uitleg: "Email adres invullen"
    },
    {
        doel:'invullen',
        voorbeeld:['straat "Marksesteenweg"'],
        uitleg: "Straat invullen"
    },
    {
        doel:'invullen',
        voorbeeld:['nummer "58"'],
        uitleg: "Huisnummer invullen"
    },
    {
        doel:'invullen',
        voorbeeld:['stad "Kortrijk"'],
        uitleg: "Stad invullen"
    },
    {
        doel:'invullen',
        voorbeeld:['postcode "8500"'],
        uitleg: "postcode invullen"
    },
    {
        doel:'navigatie',
        voorbeeld: ['terug'],
        uitleg: "Terug keren naar de vorige pagina"
    },
    {
        doel:'invullen',
        voorbeeld:['betalen met "paypal"','betalen met "mastercard"','betalen met "cash"'],
        uitleg: "Betaal methode aanduiden"
    }
    
]

export default function PaymentPage(){
    const search = window.location.search;
    const params = new URLSearchParams(search); 
    const micStateFromURL:any = params.get('mic'); 

    const [voornaam, setVoornaam] = useState<string>('')
    const [achternaam, setAchternaam] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [straat, setStraat] = useState<string>('')
    const [nummer, setNummer] = useState<number>()
    const [postcode, setPostcode] = useState<number>()
    const [stad, setStad] = useState<string>('')

    const [micState, setMicState] = useState<boolean>(false)
    const [showTranscript, setshowTranscript] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showInfo, setShowInfo] = useState<boolean>(false)
    const [latestCommando, setLatestCommando] = useState<any>('');
    const [showLatestCommando, setShowLatestCommando] = useState<boolean>(true);

    const [paypal, setPaypal] = useState<boolean>(false)
    const [mc, setMc] = useState<boolean>(false)
    const [cash, setCash] = useState<boolean>(false)

    useEffect(() => {
        if(micStateFromURL === 'true') {
            startListening()
        }
    }, [])

    useEffect(() => {
        console.log(latestCommando)
        if(latestCommando === '')
          setShowLatestCommando(false)
        else{
          setShowLatestCommando(true)
        }
      }, [latestCommando])

    const getVoornaam = (event: ChangeEvent<HTMLInputElement>) => {
        setVoornaam(event.target.value)
    }

    const getAchternaam = (event: ChangeEvent<HTMLInputElement>) => {
        setAchternaam(event.target.value)
    }

    const getEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    const getStraat = (event: ChangeEvent<HTMLInputElement>) => {
        setStraat(event.target.value)
    }

    const getNummer = (event: ChangeEvent<HTMLInputElement>) => {
        setNummer(Number(event.target.value))
    }

    const getStad = (event: ChangeEvent<HTMLInputElement>) => {
        setStad(event.target.value)
    }

    const getPostcode = (event: ChangeEvent<HTMLInputElement>) => {
        setPostcode(Number(event.target.value))
    }

    const commands = [
        {
            command:['voornaam :x'],
            callback:(spokenText:any) => {setVoornaam(spokenText); setLatestCommando(`Voornaam ingevuld met "${spokenText}"`); resetTranscript()},
        },
        {
            command:['achternaam *'],
            callback:(spokenText:any) => {setAchternaam(spokenText); setLatestCommando(`Achternaam ingevuld met "${spokenText}"`); resetTranscript()},
        },
        {
            command:['e-mail :x'],
            callback:(spokenText:any) => {setEmail(spokenText); setLatestCommando(`Email ingevuld met "${spokenText}"`); resetTranscript() },
        },
        {
            command:['straat *'],
            callback:(spokenText:any) => {setStraat(spokenText); setLatestCommando(`Straat ingevuld met "${spokenText}"`); resetTranscript() },
        },
        {
            command:['nummer :x'],
            callback:(spokenText:any) => {setNummer(spokenText); setLatestCommando(`Nummer ingevuld met "${spokenText}"`); resetTranscript() },
        },
        {
            command:['stad *'],
            callback:(spokenText:any) => {setStad(spokenText); setLatestCommando(`Stad ingevuld met "${spokenText}"`); resetTranscript() },
        },
        {
            command:['postcode :x'],
            callback:(spokenText:any) => {setPostcode(spokenText); setLatestCommando(`Postcode ingevuld met "${spokenText}"`); resetTranscript() },
        },
        {
            command: ['terug'],
            callback:() => goBack(true)
        },
        {
            command:['betalen (met) :x'],
            callback:(spokenText:any) => {setPaymentMethod(spokenText); setLatestCommando(`Betaal methode: "${spokenText}" geselecteerd`); resetTranscript() }
        },
        {
            command: ['(ga naar) verlanglijst'],
            callback: () => navigateToWihsList(true),
        },
        {
            command: ['(ga naar) winkelmand'],
            callback: () => navigateToCheckOut(true),
        },
        {
            command: ['(ga naar) overzicht','(ga naar) home'],
            callback: () => navigateHome(true),
        },
        
    ]

    const setPaymentMethod = (spokenText:any) => {
        setPaypal(false)
        setCash(false)
        setMc(false)

        switch(spokenText.toLowerCase()){
            case 'paypal':
                setPaypal(true)
                break
            
            case 'cash':
                setCash(true)
                break
            
            case 'mastercard':
                setMc(true)
                break
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

    const goBack = (mic:any) => {
        window.location.href=`/shoppingCart?mic=${mic}`
    }

    const navigateHome = (mic:any) => {
        window.location.href=`/?mic=${mic}`
    }

    const navigateToInfoPage = (mic:any) => {
        window.location.href=`/commandPage?mic=${mic}`
    }

    const navigateToCheckOut = (mic:any) => {
        window.location.href=`/shoppingCart?mic=${mic}`
    }

    const navigateToWihsList = (mic:any) => {
        window.location.href=`/wishlist?mic=${mic}`
    }

    const openInfo = () => {
        setShowInfo(!showInfo)
    }
    
    const selectPaypal = () => {
        setPaypal(true)
        setMc(false)
        setCash(false)
    }

    const selectCash = () => {
        setPaypal(false)
        setMc(false)
        setCash(true)
    }

    const selectMc = () => {
        setPaypal(false)
        setMc(true)
        setCash(false)
    }

    return(
        <main className="App">
            <div className="header">
                <div className="header_nav">
                <div 
                    className="header_nav_icons"
                    onClick={() => navigateHome(false)}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="logo" viewBox="0 0 50.416 56">
                    <g id="Group_68" data-name="Group 68" transform="translate(0 -0.01)">
                        <g id="MCT" transform="translate(0 0.01)">
                        <path id="Path_80" data-name="Path 80" d="M35.979,45.21l-9.095,5.016L17.79,45.21V55.7l5.451,3.13a7.278,7.278,0,0,0,7.287,0l5.451-3.14Z" transform="translate(-1.676 -3.805)"/>
                        <path id="Path_81" data-name="Path 81" d="M46.943,11.347,28.653.923a6.953,6.953,0,0,0-6.89,0L3.473,11.347A6.794,6.794,0,0,0,0,17.242V38.109A6.794,6.794,0,0,0,3.473,44l3.184,1.845V18.4A1.464,1.464,0,0,1,7.4,17.119a1.5,1.5,0,0,1,1.489,0l16.32,9.1,16.311-9.1a1.5,1.5,0,0,1,1.489,0A1.464,1.464,0,0,1,43.75,18.4V45.821l3.184-1.845a6.8,6.8,0,0,0,3.482-5.867V17.242a6.794,6.794,0,0,0-3.473-5.895Z" transform="translate(0 -0.01)"/>
                        </g>
                    </g>
                    </svg>
                </div>

                
                <div>
                    <h1 className="header_pageTitle">Betaling</h1>
                </div>

                <div className='header_nav_icons'>
                    <div 
                        className="icon_container"
                        onClick={() => navigateToCheckOut(false)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 40.5 36">
                            <path id="Icon_awesome-shopping-cart" data-name="Icon awesome-shopping-cart" d="M37.133,21.186,40.457,6.561A1.688,1.688,0,0,0,38.812,4.5H11.194L10.55,1.349A1.687,1.687,0,0,0,8.9,0H1.688A1.687,1.687,0,0,0,0,1.688V2.813A1.687,1.687,0,0,0,1.688,4.5H6.6L11.54,28.648a3.938,3.938,0,1,0,4.714.6H31a3.936,3.936,0,1,0,4.472-.732l.388-1.707a1.688,1.688,0,0,0-1.646-2.061H15.336l-.46-2.25H35.488A1.687,1.687,0,0,0,37.133,21.186Z"/>
                        </svg>
                        <p className="none">Winkelmand</p>
                    </div>

                    <div
                        className="icon_container"
                        onClick={() => navigateToWihsList(false)}
                    >
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 34.355 30.348">
                        <path id="Icon_feather-heart" data-name="Icon feather-heart" d="M31.26,6.915a8.25,8.25,0,0,0-11.67,0L18,8.505l-1.59-1.59A8.252,8.252,0,1,0,4.74,18.585l1.59,1.59L18,31.845l11.67-11.67,1.59-1.59a8.25,8.25,0,0,0,0-11.67Z" transform="translate(-0.823 -2.997)" fill="#368ADE" stroke="#368ADE" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                    </svg>
                    <p className="none">Verlanglijst</p>
                    </div>
                </div>
                </div>
            </div>

            <div className="header_info"
                onClick={openInfo}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="info_icon" viewBox="0 0 33 33">
                <g id="Group_6" data-name="Group 6" transform="translate(343.828 489.635)">
                    <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M6,12A3.273,3.273,0,0,0,9.273,8.727V3.273a3.273,3.273,0,0,0-6.545,0V8.727A3.273,3.273,0,0,0,6,12Zm5.455-5.455h-.545a.545.545,0,0,0-.545.545V8.727a4.369,4.369,0,0,1-4.8,4.342A4.5,4.5,0,0,1,1.636,8.533V7.091a.545.545,0,0,0-.545-.545H.545A.545.545,0,0,0,0,7.091V8.46a6.188,6.188,0,0,0,5.182,6.194v1.164H3.273a.545.545,0,0,0-.545.545v.545a.545.545,0,0,0,.545.545H8.727a.545.545,0,0,0,.545-.545v-.545a.545.545,0,0,0-.545-.545H6.818V14.667A6.006,6.006,0,0,0,12,8.727V7.091A.545.545,0,0,0,11.455,6.545Z" transform="translate(-333.328 -477.998)" fill="#fff"/>
                    <path id="Path_4" data-name="Path 4" d="M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z" transform="translate(-345.328 -491.135)" fill="none" stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                    <path id="Path_5" data-name="Path 5" d="M3,0A2.939,2.939,0,0,1,6,2.875,2.939,2.939,0,0,1,3,5.75,2.939,2.939,0,0,1,0,2.875,2.939,2.939,0,0,1,3,0Z" transform="translate(-330.328 -484.373)" fill="#fff"/>
                </g>
                </svg>
            </div>

            {showInfo && 
                <div className="showInfo">
                    <div className="showInfo_item">
                        <div className="showInfo_title_container">
                        <div></div>
                        <h1 className="showInfo_title">Spraakbediening</h1>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={openInfo} className='showInfo_icon' viewBox="0 0 21 21">
                            <path id="Icon_material-close" data-name="Icon material-close" d="M28.5,9.615,26.385,7.5,18,15.885,9.615,7.5,7.5,9.615,15.885,18,7.5,26.385,9.615,28.5,18,20.115,26.385,28.5,28.5,26.385,20.115,18Z" transform="translate(-7.5 -7.5)"/>
                        </svg>

                        </div>
                        <h2 className="showInfo_item_title">Tekstvak invullen</h2>
                        <div className="showInfo_item_command">
                            <div className="test">
                                <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                                <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                </svg>
                                <p>Naam "Jelle"</p>
                            </div>
                        </div>
                        <div className="showInfo_item_command">
                            <div className="test">
                                <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                                <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                </svg>
                                <p>Stad "Kortrijk"</p>
                            </div>
                        </div>
                    </div>

                    <div className="showInfo_item">
                        <h2 className="showInfo_item_title">Betalings methode kiezen</h2>
                        <div className="showInfo_item_command">
                        <div className="test">
                            <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                            </svg>
                            <p>betalen met "Paypal"</p>
                        </div>
                        </div>
                    </div>

                    <div className="showInfo_item">
                        <h2 className="showInfo_item_title">Navigatie</h2>
                        <div className="showInfo_item_command">
                        <div className="test">
                            <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                            </svg>
                            <p>Terug</p>
                        </div>
                        </div>
                    </div>

                    <div className="showInfo_btnC">
                        <div className="showInfo_btn">
                        <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_btn_icon" viewBox="0 0 36 29.25">
                            <path id="Icon_awesome-list" data-name="Icon awesome-list" d="M5.625,25.875h-4.5A1.125,1.125,0,0,0,0,27v4.5a1.125,1.125,0,0,0,1.125,1.125h4.5A1.125,1.125,0,0,0,6.75,31.5V27A1.125,1.125,0,0,0,5.625,25.875Zm0-22.5h-4.5A1.125,1.125,0,0,0,0,4.5V9a1.125,1.125,0,0,0,1.125,1.125h4.5A1.125,1.125,0,0,0,6.75,9V4.5A1.125,1.125,0,0,0,5.625,3.375Zm0,11.25h-4.5A1.125,1.125,0,0,0,0,15.75v4.5a1.125,1.125,0,0,0,1.125,1.125h4.5A1.125,1.125,0,0,0,6.75,20.25v-4.5A1.125,1.125,0,0,0,5.625,14.625ZM34.875,27h-22.5a1.125,1.125,0,0,0-1.125,1.125v2.25A1.125,1.125,0,0,0,12.375,31.5h22.5A1.125,1.125,0,0,0,36,30.375v-2.25A1.125,1.125,0,0,0,34.875,27Zm0-22.5h-22.5A1.125,1.125,0,0,0,11.25,5.625v2.25A1.125,1.125,0,0,0,12.375,9h22.5A1.125,1.125,0,0,0,36,7.875V5.625A1.125,1.125,0,0,0,34.875,4.5Zm0,11.25h-22.5a1.125,1.125,0,0,0-1.125,1.125v2.25a1.125,1.125,0,0,0,1.125,1.125h22.5A1.125,1.125,0,0,0,36,19.125v-2.25A1.125,1.125,0,0,0,34.875,15.75Z" transform="translate(0 -3.375)"/>
                        </svg>
                        <button onClick={() => navigateToInfoPage(false)} className="showInfo_allCommands_btn">Alle commando's</button>
                        </div>
                    </div>
                </div>
            }

            {showLatestCommando && 
                <div className="latestCommandSection">
                <div className="latestCommand_container">
                    <p> </p>
                    <h1 className="latestCommand_text">{latestCommando}</h1>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setShowLatestCommando(false)} className="latestCommand_icon" viewBox="0 0 21 21">
                        <path id="Icon_material-close" data-name="Icon material-close" d="M28.5,9.615,26.385,7.5,18,15.885,9.615,7.5,7.5,9.615,15.885,18,7.5,26.385,9.615,28.5,18,20.115,26.385,28.5,28.5,26.385,20.115,18Z" transform="translate(-7.5 -7.5)"/>
                    </svg>
                </div>
                </div>
            }

            <div>
                <div className="goBack_container" onClick={() => goBack(false)}>
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

            <div className="form_container">
                <div className="form_textC">
                    <h1 className="form_interTitle">Gebruikers info</h1>
                    <div className="form_divs">
                        <div className='input_container u-1-of-2'>
                            <label>Voornaam</label>
                            <input type="text" 
                                className="input_from" 
                                placeholder="Jon" 
                                value={voornaam}
                                onInput={(event: ChangeEvent<HTMLInputElement>) => {
                                    getVoornaam(event);
                                }}
                            />
                        </div>
                        <div className='input_container u-1-of-2'>
                            <label>Achternaam</label>
                            <input type="text" 
                                className="input_from" 
                                placeholder="Doe" 
                                value={achternaam}
                                onInput={(event: ChangeEvent<HTMLInputElement>) => {
                                    getAchternaam(event);
                                }}
                            />
                        </div>
                    </div>
                    <div style={{display:'flex'}}>
                        <div className="input_container">
                            <label>Email</label>
                            <input type="email" 
                                className="input_from" 
                                placeholder="voornaam.achernaam@email.com" 
                                value={email}
                                onInput={(event: ChangeEvent<HTMLInputElement>) => {
                                    getEmail(event);
                                }}
                            />
                        </div>
                    </div>
                    <div className="form_divs">
                        <div className='input_container u-2-of-3'>
                            <label>Straat</label>
                            <input type="text" 
                                className="input_from" 
                                placeholder="Duifhuisstraat" 
                                value={straat}
                                onInput={(event: ChangeEvent<HTMLInputElement>) => {
                                    getStraat(event);
                                }}
                            />
                        </div>
                        <div className="input_container u-1-of-3">
                            <label>Nr</label>
                            <input type="text" 
                                className="input_from" 
                                placeholder="42" 
                                value={nummer}
                                onInput={(event: ChangeEvent<HTMLInputElement>) => {
                                    getNummer(event);
                                }}    
                            />
                        </div>
                    </div>

                    <div className="form_divs">
                        <div className='input_container u-2-of-3'>
                            <label>Stad</label>
                            <input type="text" 
                                className="input_from" 
                                placeholder="Kruissem" 
                                value={stad}
                                onInput={(event: ChangeEvent<HTMLInputElement>) => {
                                    getStad(event);
                                }}
                            />
                        </div>
                        <div className='input_container u-1-of-3'>
                            <label>Postcode</label>
                            <input type="text" 
                                className="input_from" 
                                placeholder="9770" 
                                value={postcode}
                                onInput={(event: ChangeEvent<HTMLInputElement>) => {
                                    getPostcode(event);
                                }}
                            />
                        </div>
                    </div>

                    <h1 className="form_interTitle">Betalings methode</h1>

                    <div className='payment_container'>
                        <div className={mc ? "payment_btn active_state": "payment_btn" } onClick={selectMc} >
                            <svg xmlns="http://www.w3.org/2000/svg" className={mc ? "icon_active_state": "btn_icon" } viewBox="0 0 40.5 31.5">
                                <path id="Icon_awesome-cc-mastercard" data-name="Icon awesome-cc-mastercard" d="M33.954,28.849a.788.788,0,1,1-.787-.823A.786.786,0,0,1,33.954,28.849ZM12.1,28.027a.825.825,0,1,0,.766.823A.778.778,0,0,0,12.1,28.027Zm8.262-.021a.652.652,0,0,0-.668.612h1.343A.646.646,0,0,0,20.363,28.005Zm7.58.021a.823.823,0,1,0,.788.823A.778.778,0,0,0,27.942,28.027Zm7.446,1.835c0,.021.021.035.021.077,0,.021-.021.035-.021.077a.247.247,0,0,0-.035.056.091.091,0,0,1-.077.035c-.021.021-.035.021-.077.021a.139.139,0,0,1-.077-.021c-.021,0-.035-.021-.056-.035s-.035-.035-.035-.056a.128.128,0,0,1-.021-.077c0-.035,0-.056.021-.077a.132.132,0,0,1,.035-.077.247.247,0,0,1,.056-.035.128.128,0,0,1,.077-.021c.035,0,.056,0,.077.021s.056.021.077.035S35.367,29.827,35.388,29.862Zm-.155.1c.035,0,.035-.021.056-.021a.086.086,0,0,0,0-.112c-.021,0-.035-.021-.077-.021H35.1v.246h.056v-.1h.021l.077.1h.056l-.077-.091ZM40.5,5.7v24.75a3.376,3.376,0,0,1-3.375,3.375H3.375A3.376,3.376,0,0,1,0,30.445V5.7A3.376,3.376,0,0,1,3.375,2.32h33.75A3.376,3.376,0,0,1,40.5,5.7Zm-36,9.816a9.734,9.734,0,0,0,15.117,8.114,10.486,10.486,0,0,1,0-16.207A9.734,9.734,0,0,0,4.5,15.511Zm15.75,7.65a9.735,9.735,0,0,0,0-15.293A9.735,9.735,0,0,0,20.25,23.161ZM10.245,28.526a.985.985,0,0,0-1.034-1.034,1,1,0,0,0-.9.457.932.932,0,0,0-.858-.457.893.893,0,0,0-.745.38v-.309H6.131v2.58h.577c0-1.329-.176-2.123.633-2.123.717,0,.577.717.577,2.123h.555c0-1.287-.176-2.123.633-2.123.717,0,.577.7.577,2.123h.577V28.526Zm3.157-.963h-.555v.309a1.013,1.013,0,0,0-.823-.38,1.359,1.359,0,0,0,0,2.714.975.975,0,0,0,.823-.38v.323H13.4Zm2.848,1.8c0-1.055-1.61-.577-1.61-1.069,0-.4.837-.337,1.3-.077l.232-.457c-.661-.429-2.123-.422-2.123.577s1.61.584,1.61,1.055c0,.443-.949.408-1.455.056l-.246.443C14.745,30.424,16.249,30.312,16.249,29.362Zm2.489.654-.155-.478c-.267.148-.858.309-.858-.288V28.083h.921v-.52h-.921v-.788h-.577v.788h-.534v.513h.534V29.25c0,1.237,1.216,1.013,1.589.766Zm.935-.942h1.934c0-1.139-.52-1.589-1.223-1.589a1.266,1.266,0,0,0-1.28,1.357,1.4,1.4,0,0,0,2.377,1l-.267-.422c-.548.45-1.378.408-1.54-.345Zm4.155-1.512a.825.825,0,0,0-1.069.309v-.309h-.577v2.58h.577V28.688a.587.587,0,0,1,.9-.591l.169-.534Zm.745,1.287c0-.8.816-1.062,1.455-.591L26.3,27.8a1.392,1.392,0,1,0,0,2.109l-.267-.457C25.383,29.911,24.574,29.637,24.574,28.849Zm4.69-1.287h-.577v.309a1.278,1.278,0,1,0,0,1.955v.323h.577V27.563Zm2.37,0a.845.845,0,0,0-1.069.309v-.309h-.555v2.58h.555V28.688a.59.59,0,0,1,.9-.591l.169-.534Zm2.834-1.048h-.555v1.357a1.278,1.278,0,1,0,0,1.955v.323h.555ZM35,21.234v.323h.056v-.323h.134v-.056h-.323v.056H35Zm.464,8.7a.214.214,0,0,0-.021-.112c-.021-.021-.035-.056-.056-.077s-.056-.035-.077-.056c-.035,0-.077-.021-.112-.021a.747.747,0,0,1-.1.021.367.367,0,0,0-.077.056.11.11,0,0,0-.056.077.214.214,0,0,0-.021.112.2.2,0,0,0,.021.1.11.11,0,0,0,.056.077.244.244,0,0,0,.077.056.191.191,0,0,0,.1.021.214.214,0,0,0,.112-.021c.021-.021.056-.035.077-.056s.035-.056.056-.077A.2.2,0,0,0,35.466,29.939Zm.225-8.768h-.1l-.112.246-.112-.246h-.1v.38h.056v-.288l.112.246h.077l.1-.246v.288h.077ZM36,15.511a9.734,9.734,0,0,0-15.117-8.1,10.486,10.486,0,0,1,0,16.207A9.734,9.734,0,0,0,36,15.511Z" transform="translate(0 -2.32)"/>
                            </svg>
                            <p className="button_form">Mastercard</p>
                        </div>
                        <div className={paypal ? "payment_btn active_state": "payment_btn" } onClick={selectPaypal}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={paypal ? "icon_active_state": "btn_icon" } viewBox="0 0 26.994 31.887">
                                <path id="Icon_awesome-paypal" data-name="Icon awesome-paypal" d="M7.833,20.805c-.246,1.35-1.223,7.643-1.512,9.422-.021.127-.07.176-.211.176H.865a.854.854,0,0,1-.851-.977L4.134,3.277A1.428,1.428,0,0,1,5.541,2.088c10.709,0,11.609-.26,14.344.8,4.226,1.638,4.613,5.59,3.094,9.865-1.512,4.4-5.1,6.293-9.851,6.349-3.052.049-4.887-.492-5.295,1.7ZM25.109,10.688c-.127-.091-.176-.127-.211.091a16.456,16.456,0,0,1-.619,2.363c-2.805,8-10.582,7.305-14.379,7.305a.707.707,0,0,0-.766.661C7.545,30.98,7.228,33.04,7.228,33.04a.749.749,0,0,0,.745.907h4.465A1.261,1.261,0,0,0,13.662,32.9c.049-.38-.077.429,1.012-6.42.323-1.547,1.005-1.385,2.06-1.385,4.992,0,8.888-2.025,10.048-7.9.457-2.447.323-5.02-1.673-6.511Z" transform="translate(-0.006 -2.06)"/>
                            </svg>
                            <p className="button_form">Paypal</p>
                        </div>
                        <div className={cash ? "payment_btn active_state": "payment_btn" } onClick={selectCash}>
                            <svg xmlns="http://www.w3.org/2000/svg" className={cash ? "icon_active_state": "btn_icon" } viewBox="0 0 23.091 15.424">
                                <path id="Icon_payment-cash" data-name="Icon payment-cash" d="M29.541,17.116V31.007a.99.99,0,0,1-.226.541.737.737,0,0,1-.541.226H7.216a.735.735,0,0,1-.541-.226.986.986,0,0,1-.226-.541V17.116a.988.988,0,0,1,.226-.541.738.738,0,0,1,.541-.226H28.774a.74.74,0,0,1,.541.226.993.993,0,0,1,.226.541ZM28.007,27.129V20.995a2.95,2.95,0,0,1-2.165-.9,3,3,0,0,1-.9-2.21H11.049a3,3,0,0,1-.9,2.21,2.952,2.952,0,0,1-2.165.9v6.134a2.955,2.955,0,0,1,2.165.9,3.007,3.007,0,0,1,.9,2.21H24.94a3,3,0,0,1,.9-2.21,2.954,2.954,0,0,1,2.165-.9Zm-6.179-3.067a7.9,7.9,0,0,1-.226,1.714,5.78,5.78,0,0,1-.722,1.624,3.92,3.92,0,0,1-1.218,1.218,3.312,3.312,0,0,1-3.337,0A3.907,3.907,0,0,1,15.109,27.4a5.765,5.765,0,0,1-.722-1.624,7.866,7.866,0,0,1-.226-1.714,7.873,7.873,0,0,1,.226-1.714,5.762,5.762,0,0,1,.722-1.624,3.92,3.92,0,0,1,1.218-1.218,3.312,3.312,0,0,1,3.337,0,3.939,3.939,0,0,1,1.218,1.218,5.782,5.782,0,0,1,.722,1.624,7.9,7.9,0,0,1,.226,1.714Zm-6.134,3.067h4.6V26H18.762V20.589H17.409l-1.8,1.669.947.947a7.384,7.384,0,0,0,.631-.676h.045V26H15.695v1.128Z" transform="translate(-6.449 -16.35)"/>
                            </svg>
                            <p className="button_form">Contant</p>
                        </div>
                    </div>
                    <div className="afreken_container">
                        <div className="afrekenBtn">
                            <svg xmlns="http://www.w3.org/2000/svg" className='btn_icon' viewBox="0 0 13.503 23.616">
                                <path id="Icon_ionic-ios-arrow-forward" data-name="Icon ionic-ios-arrow-forward" d="M20.679,18,11.742,9.07a1.681,1.681,0,0,1,0-2.384,1.7,1.7,0,0,1,2.391,0L24.258,16.8a1.685,1.685,0,0,1,.049,2.327L14.14,29.32a1.688,1.688,0,0,1-2.391-2.384Z" transform="translate(-11.246 -6.196)"/>
                            </svg>

                            <p>Afrekenen</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="voiceControl">
                {showTranscript && 
                <div className="showTranscript">
                    <p className="showTranscript_text">Zeg iets als:</p>
                    <p className="showTranscript_example">'Zoek jassen van Protest'</p>
                    <h3 className="showTranscript_transcript">{transcript}</h3>
                    {isLoading &&
                    <div className="ballsContainer">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    }
                    <button 
                    className="showTranscript_all_commandos"
                    onClick={navigateToInfoPage} 
                    >
                    alle commando's
                    </button>
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