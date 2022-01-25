import React, {ChangeEvent, useEffect, useState, MouseEvent} from 'react';
import { useParams } from "react-router-dom";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

import API from '../utils/api'
import '../style/detailProduct.css'

function DetailsProduct(){
    let { productId } = useParams()
    const [productData, setProductData] = useState<any>()
    const [showTranscript, setshowTranscript] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [micState, setMicState] = useState<boolean>(false)
    const [inWishlist, setInWishlist] = useState<boolean>(false)

    useEffect(() =>{
        getData();
    },[])

    const getData = async () => {
        try{
            let data = await API.get(`product/${productId}`)
            console.log(data.ExtraInfo)
            setProductData(data)
        }catch(e){
            console.log(e)
        }
    }

    useEffect(() => {
        if(productData !== undefined){
            console.log(productData)
            const test = localStorage.getItem(`${productData.ProductId}`)
            if(test){
                setInWishlist(true)
                console.log(test)
            }
        }
    },[productData])

    const commands = [
        {
            command: ['terug'],
            callback: () => goBack(),
            doel:'filter',
            voorbeeld:["zoek 'boxy ski jas'","search 'boxy ski jas'"],
            uitleg: "Zoeken naar boxy ski jas"
        },
        {
            command: ['toevoegen aan winkelmand','winkelmand'],
            callback: () => addToShoppingList(),
            doel:'filter',
            voorbeeld:["zoek 'boxy ski jas'","search 'boxy ski jas'"],
            uitleg: "Zoeken naar boxy ski jas"
        },
    ]

    const goBack = () => {
        window.location.href=`/`
    }

    const addToShoppingList = () => {
        console.log('clicked')
        if(inWishlist === true){
            localStorage.removeItem(productData.ProductId)
            setInWishlist(false)
        }
        else{
            localStorage.setItem(`${productData.ProductId}`, JSON.stringify(productData))
            setInWishlist(true)
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
        <main className="main">
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


            <div className="container">
                {productData &&
                    <section className="productOverview_container">
                        <img 
                            className="productOverview_picture"
                            src = {productData.Picture}
                            alt = {`Image of ${productData.Name}`}
                        />
                        <section className="productOverview_productInfo">
                            <h2 className="productOverview_name">{productData.Name}</h2>
                            <h2 className="productOverview_price">€{productData.Price}</h2>
                            <p className="productOverview_disc">{productData.Description}</p>
                            <div className="productOverview_size">
                                <p>Maat:</p>
                                <select className="sizes">
                                    {productData.Sizes.map((size:any) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="productOverview_buttons">
                                <div className="productOverview_cartC">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30">
                                        <path id="Icon_material-shopping-cart" data-name="Icon material-shopping-cart" d="M10.5,27a3,3,0,1,0,3,3A3,3,0,0,0,10.5,27ZM1.5,3V6h3L9.9,17.385,7.875,21.06A2.9,2.9,0,0,0,7.5,22.5a3.009,3.009,0,0,0,3,3h18v-3H11.13a.371.371,0,0,1-.375-.375l.045-.18L12.15,19.5H23.325a2.986,2.986,0,0,0,2.625-1.545L31.32,8.22a1.465,1.465,0,0,0,.18-.72A1.5,1.5,0,0,0,30,6H7.815L6.405,3Zm24,24a3,3,0,1,0,3,3A3,3,0,0,0,25.5,27Z" transform="translate(-1.5 -3)" fill="#368ade"/>
                                    </svg>
                                    <button className="productOverview_cart">Toevoegen aan winkelmand</button>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={addToShoppingList} className="wishlist_icon" viewBox="0 0 34.355 30.348">
                                    <path id="Icon_feather-heart" data-name="Icon feather-heart" d="M31.26,6.915a8.25,8.25,0,0,0-11.67,0L18,8.505l-1.59-1.59A8.252,8.252,0,1,0,4.74,18.585l1.59,1.59L18,31.845l11.67-11.67,1.59-1.59a8.25,8.25,0,0,0,0-11.67Z" transform="translate(-0.823 -2.997)" fill={inWishlist? "#368ADE" : "none"} stroke={inWishlist ? "#368ADE" : "#368ade"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                                </svg>

                            </div>
                        </section>
                    </section>
                }
            </div>

            <section>
                <h1 className="productVoordelen_title">PRODUCTVOORDELEN</h1>
                <div className="productVoordelen_container">
                <div className="test3">
                    {productData && productData.ExtraInfo.map((i:string) => (
                        Object.entries(i).map((x) =>(
                            <div className="productVoordelen_item">
                                <p className="item-a">{x[0]}</p>
                                <p></p>
                                <p className="item-b">{x[1]}</p>
                            </div>
                        ))
                    ))}
                </div>
                </div>
            </section>


            <div className="voiceControl">
                {showTranscript && 
                <div className="showTranscript">
                    <p className="showTranscript_text">Zeg iets als:</p>
                    <div className="showTranscript_example_container">
                    <h2 className="showTranscript_example">'Zoek jassen van Protest'</h2>
                    <svg xmlns="http://www.w3.org/2000/svg" className="showTranscript_icon" viewBox="0 0 33 33">
                        <g id="Group_5" data-name="Group 5" transform="translate(343.828 489.635)">
                        <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M6,12A3.273,3.273,0,0,0,9.273,8.727V3.273a3.273,3.273,0,0,0-6.545,0V8.727A3.273,3.273,0,0,0,6,12Zm5.455-5.455h-.545a.545.545,0,0,0-.545.545V8.727a4.369,4.369,0,0,1-4.8,4.342A4.5,4.5,0,0,1,1.636,8.533V7.091a.545.545,0,0,0-.545-.545H.545A.545.545,0,0,0,0,7.091V8.46a6.188,6.188,0,0,0,5.182,6.194v1.164H3.273a.545.545,0,0,0-.545.545v.545a.545.545,0,0,0,.545.545H8.727a.545.545,0,0,0,.545-.545v-.545a.545.545,0,0,0-.545-.545H6.818V14.667A6.006,6.006,0,0,0,12,8.727V7.091A.545.545,0,0,0,11.455,6.545Z" transform="translate(-333.328 -477.998)"/>
                        <path id="Path_4" data-name="Path 4" d="M33,18A15,15,0,1,1,18,3,15,15,0,0,1,33,18Z" transform="translate(-345.328 -491.135)" fill="none" stroke="#000" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                        <ellipse id="Ellipse_1" data-name="Ellipse 1" cx="3" cy="2.875" rx="3" ry="2.875" transform="translate(-330.328 -484.373)"/>
                        </g>
                    </svg>
                    </div>
                    <p className="showTranscript_transcript">{transcript}</p>
                    {isLoading &&
                    <div className="ballsContainer">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    }
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

export default DetailsProduct;