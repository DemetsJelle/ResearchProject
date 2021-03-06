import React, {useEffect, useState} from 'react';
import '../style/wishlist.css'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export const commandsWishlist = [
    {
        doel:'navigatie',
        voorbeeld:["terug"],
        uitleg: "Terug gaan naar de vorige pagina"
    },
    {
        doel:'info',
        voorbeeld:["selecteer Raptor 60"],
        uitleg: "Meer informatie zien over het product"
    },
    {
        doel:'afrekenen',
        voorbeeld:["voeg 'lenado ski jas' toe aan winkelmand",'"lenado ski jas" toevoegen aan winkelmand'],
        uitleg: "Product aan winkelmand toevoegen toevoegen"
    },
    {
        doel:'afrekenen',
        voorbeeld:['verwijder "lenado ski jas"','"lenado ski jas" verwijderen'],
        uitleg: "Product uit de verlanglijst halen"
    },
]

function Wishlist(){
    const search = window.location.search;
    const params = new URLSearchParams(search); 
    const micStateFromURL:any = params.get('mic'); 

    const [wishlist, setWishlist] = useState<any[]>()
    const [showTranscript, setshowTranscript] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [micState, setMicState] = useState<boolean>(false)
    const [inWishlist, setInWishlist] = useState<boolean>(false)

    const [showInfo, setShowInfo] = useState<boolean>(false)
    const [latestCommando, setLatestCommando] = useState<any>('');
    const [showLatestCommando, setShowLatestCommando] = useState<boolean>(true);

    useEffect(() =>{
        const list:any = localStorage.getItem('wishlist')
        const parsedList = JSON.parse(list)
        setWishlist(parsedList)
        console.log(parsedList)

        if(micStateFromURL === 'true') {
            startListening()
        }
    },[])

    useEffect(() => {
        console.log(latestCommando)
        if(latestCommando === '')
          setShowLatestCommando(false)
        else{
          setShowLatestCommando(true)
        }
      }, [latestCommando])

    const commands = [
        {
            command: ['terug'],
            callback: () => goBack(true),
        },
        {
            command: ['selecteer *'],
            callback: (spokenText:any) => {selectProduct(spokenText,true)},
        },
        {
            command: ['* toevoegen aan winkelmand','voeg * toe aan winkelmand',],
            callback: (spokenText:any) => {addToShoppingCart(spokenText); resetTranscript()},
        },
        {
            command: ['verwijder *','* verwijderen'],
            callback: (spokenText:any) => {removeFromWishlist(spokenText); resetTranscript()},
        },
        {
            command: ['(ga naar) winkelmand'],
            callback: () => {navigateToShoppingCart(true)},
        },
        {
            command: ['(ga naar) bestellen'],
            callback: () => {navigateToPayment(true)},
        },
        {
            command: ['(ga naar) home','(ga naar) overzicht'],
            callback: () => {navigateHome(true)},
        },
    ]

    const goBack = (mic:any) => {
        window.location.href=`/?mic=${mic}`
    }

    const navigateToCheckOut = (mic:any) => {
        window.location.href=`/shoppingCart?mic=${mic}`
    }

    const navigateToInfoPage = (mic:any) => {
        window.location.href=`/commandPage?mic=${mic}`
    }

    const navigateToDetail = (productId:any,mic:any) => {
        window.location.href=`/detailsProduct/${productId}?mic=${mic}`
    }

    const navigateToShoppingCart = (mic:any) => {
        window.location.href=`/shoppingCart?mic=${mic}`
    }

    const navigateToPayment = (mic:any) => {
        window.location.href=`/paymentPage?mic=${mic}`
    }

    const navigateHome = (mic:any) => {
        window.location.href=`/?mic=${mic}`
    }

    const selectProduct = (spokenText:any,mic:any) => {
        const filteredData = wishlist!.filter(function (eachItem){
            return eachItem["Name"].toLowerCase().includes(spokenText.toLowerCase())
        })

        window.location.href=`/detailsProduct/${filteredData[0].ProductId}?mic=${mic}`
    }

    const addToShoppingCart = (spokenText:any) => {
        const filteredData = wishlist!.filter(function (eachItem){
            return eachItem["Name"].toLowerCase().includes(spokenText.toLowerCase())
        })
        const holder:any[] = []
        const list = localStorage.getItem('shoppingCart')
        if(list){
            const parsedList:any = JSON.parse(list)
            parsedList.forEach((i:any) => {
                holder.push(i)   
            })
            holder.push(filteredData[0])
            localStorage.setItem('shoppingCart', JSON.stringify(holder))
            setLatestCommando(`${filteredData[0].Name} aan winkelmand toegevoegd`)
        }
    }

    const removeFromWishlist = (spokenText:any) => {
        localSWishlist = []
        console.log(spokenText)
        console.log(wishlist)
        const list = wishlist?.filter(function (eachItem){
            return eachItem["Name"].toLowerCase().includes(spokenText.toLowerCase())
        })

        console.log(list)

        if(list){
            wishlist?.forEach((item:any) => {
                if(item.ProductId !== list[0].ProductId){
                    localSWishlist.push(item)
                }
            })
        }
        setWishlist(localSWishlist)
        localStorage.setItem('wishlist', JSON.stringify(localSWishlist))
        setLatestCommando(`${list![0].Name} uit verlanglijst verwijderd`)
    }

    const openInfo = () => {
        setShowInfo(!showInfo)
    }

    let localSWishlist:any[] = []
    const removeItemFromWishlist = (productId:any) => {
        localSWishlist = []
        const list:any = localStorage.getItem('wishlist')
        if(list){
            const parsedList = JSON.parse(list)
            parsedList.forEach((item:any) => {
                if(item.ProductId !== productId)
                    localSWishlist.push(item)
            })
        }
        setWishlist(localSWishlist)
        localStorage.setItem('wishlist', JSON.stringify(localSWishlist))
    }

    const localSShoppingCart:any[] = []
    const addToShoppingList = (newItem:any) =>{
        const list:any = localStorage.getItem('shoppingCart')
        if(list){
            const parsedList = JSON.parse(list)
            parsedList.forEach((item:any) => {
                localSShoppingCart.push(item)
            })
        }
        localSShoppingCart.push(newItem)
        localStorage.setItem('shoppingCart', JSON.stringify(localSShoppingCart))
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
                    <h1 className="header_pageTitle">Verlanglijst</h1>
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
                        <h2 className="showInfo_item_title">Toevoegen aan winkelmand</h2>
                        <div className="showInfo_item_command">
                        <div className="test">
                            <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                            </svg>
                            <p>toevoegen aan winkelmand'</p>
                        </div>
                            
                        </div>
                    </div>

                    <div className="showInfo_item">
                        <h2 className="showInfo_item_title">Toevoegen aan verlanglijst</h2>
                        <div className="showInfo_item_command">
                        <div className="test">
                            <svg xmlns="http://www.w3.org/2000/svg" className="showInfo_icon" viewBox="0 0 24.75 36">
                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                            </svg>
                            <p>toevoegen aan verlanglijst</p>
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

            <div className="wishlist_grid">
                {wishlist && wishlist.map(item => {
                    return(
                        <div className="wishlist_item_container" key={item.ProductId}>
                            <img
                                onClick={() => navigateToDetail(item.ProductId, false)}
                                className="wishlist_item_img"
                                src = {item.Picture}
                                alt =  {`Image of ${item.Name}`}
                            />

                            <div className="wishlist_item_buttonC">
                                <svg xmlns="http://www.w3.org/2000/svg" className="cart_icon" viewBox="0 0 30 30">
                                    <path id="Icon_material-shopping-cart" data-name="Icon material-shopping-cart" d="M10.5,27a3,3,0,1,0,3,3A3,3,0,0,0,10.5,27ZM1.5,3V6h3L9.9,17.385,7.875,21.06A2.9,2.9,0,0,0,7.5,22.5a3.009,3.009,0,0,0,3,3h18v-3H11.13a.371.371,0,0,1-.375-.375l.045-.18L12.15,19.5H23.325a2.986,2.986,0,0,0,2.625-1.545L31.32,8.22a1.465,1.465,0,0,0,.18-.72A1.5,1.5,0,0,0,30,6H7.815L6.405,3Zm24,24a3,3,0,1,0,3,3A3,3,0,0,0,25.5,27Z" transform="translate(-1.5 -3)"/>
                                </svg>
                                <button onClick={() => addToShoppingList(item)} className="wishlist_item_button_cart">Winkelmand</button>
                            </div>

                            <div 
                                className="wishlist_item_text"  
                            >
                                <h1 
                                    className="wishlist_item_name"
                                    onClick={() => navigateToDetail(item.ProductId,false)}  
                                >
                                    {item.Name}</h1>
                                <div className="wishlist_item_priceC">
                                    <p className="wishlist_item_price">???{item.Price}</p>
                                    <div 
                                        className="wishlist_item_removebtn"
                                        onClick={() => removeItemFromWishlist(item.ProductId)}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="wishlist_item_icon" viewBox="0 0 21 27">
                                            <path id="Icon_material-delete" data-name="Icon material-delete" d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21Z" transform="translate(-7.5 -4.5)"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    )
                })}
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

export default Wishlist;