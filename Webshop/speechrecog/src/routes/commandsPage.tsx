import React, {ChangeEvent, useEffect, useState, MouseEvent} from 'react';
import '../style/commandsPage.css';
import { commandsListHome } from '../App'
import { commandsListShoppingCart } from '../routes/shoppingCart'
import { commandsDetail } from '../routes/detailsProduct'
import { commandsWishlist } from '../routes/wishlist'
import { commandsPayment } from '../routes/payment'

export default function CommandsPage(){
    const goBack = () => {
        window.location.href=`/`
    }

    return(
        <main className="App">
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

            <div className="commands_container">
                <h1 className="commands_page_title">Stembediening Overzichtpagina</h1>
                <div className='commands_text_container'>
                    <h2 className="commands_purpose_title">Filter commando's</h2>
                    {commandsListHome.filter(c => c.doel === 'filter').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}



                    <h2 className="commands_purpose_title">Informatie commando's</h2>
                    {commandsListHome.filter(c => c.doel === 'info').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
    

                    <h2 className="commands_purpose_title">winkelmand commando's</h2>
                    {commandsListHome.filter(c => c.doel === 'afrekenen').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
   


                    <h2 className="commands_purpose_title">verlanglijst commando's</h2>
                    {commandsListHome.filter(c => c.doel === 'verlanglijst').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>     

                <h1  className="commands_page_title">Stembediening product informatie pagina</h1>
                <div className='commands_text_container'>
                    <h2 className="commands_purpose_title">Winkelmand commando's</h2>
                    {commandsDetail.filter(c => c.doel === 'afrekenen').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <h2 className="commands_purpose_title">Verlanglijst commando's</h2>
                    {commandsDetail.filter(c => c.doel === 'verlanglijst').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <h2 className="commands_purpose_title">Overige commando's</h2>
                    {commandsDetail.filter(c => c.doel === 'navigatie').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <h1  className="commands_page_title">Stembediening winkelkar pagina</h1>
                <div className='commands_text_container'>
                    <h2 className="commands_purpose_title">Winkelmand commando's</h2>
                    {commandsListShoppingCart.filter(c => c.doel === 'afrekenen').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <h2 className="commands_purpose_title">Overige commando's</h2>
                    {commandsListShoppingCart.filter(c => c.doel === 'navigatie').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                <h1>Stembediening Verlanglijstpagina</h1>
                <div className='commands_text_container'>
                    <h2 className="commands_purpose_title">Winkelmand commando's</h2>
                    {commandsWishlist.filter(c => c.doel === 'afrekenen').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <h2 className="commands_purpose_title">Informatie commando's</h2>
                    {commandsWishlist.filter(c => c.doel === 'info').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <h2 className="commands_purpose_title">Overige commando's</h2>
                    {commandsWishlist.filter(c => c.doel === 'navigatie').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                
                <h1  className="commands_page_title">Stembediening bestellen pagina</h1>
                <div className='commands_text_container'>
                    <h2 className="commands_purpose_title">Invul commando's</h2>
                    {commandsPayment.filter(c => c.doel === 'invullen').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}

                    <h2 className="commands_purpose_title">Overige commando's</h2>
                    {commandsPayment.filter(c => c.doel === 'navigatie').map(c => (
                        <div>
                            {c.voorbeeld.map(v => (
                                <div className="command_textC">
                                    <div className="command_text_command">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="command_text_icon" viewBox="0 0 24.75 36">
                                            <path id="Icon_awesome-microphone" data-name="Icon awesome-microphone" d="M12.375,24.75A6.75,6.75,0,0,0,19.125,18V6.75a6.75,6.75,0,0,0-13.5,0V18A6.75,6.75,0,0,0,12.375,24.75ZM23.625,13.5H22.5a1.125,1.125,0,0,0-1.125,1.125V18a9.01,9.01,0,0,1-9.9,8.956,9.273,9.273,0,0,1-8.1-9.357V14.625A1.125,1.125,0,0,0,2.25,13.5H1.125A1.125,1.125,0,0,0,0,14.625v2.824A12.762,12.762,0,0,0,10.688,30.224v2.4H6.75A1.125,1.125,0,0,0,5.625,33.75v1.125A1.125,1.125,0,0,0,6.75,36H18a1.125,1.125,0,0,0,1.125-1.125V33.75A1.125,1.125,0,0,0,18,32.625H14.063V30.251A12.387,12.387,0,0,0,24.75,18V14.625A1.125,1.125,0,0,0,23.625,13.5Z"/>
                                        </svg>
                                        <p>{v}</p>
                                    </div>
                                    <div className="command_text_uitleg">
                                        <p>{c.uitleg}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </main>
    )
}