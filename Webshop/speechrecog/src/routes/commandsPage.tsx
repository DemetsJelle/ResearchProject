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

    const navigateToWihsList = () => {
        window.location.href=`/wishlist`
    }

    const navigateToCheckOut = () => {
        window.location.href=`/shoppingCart`
    }

    return(
        <main className="App">

            <div className="header">
                <div className="header_nav">
                    <div className="header_nav_icons">
                        <svg xmlns="http://www.w3.org/2000/svg" className="logo" viewBox="0 0 50.416 56">
                        <g id="Group_68" data-name="Group 68" transform="translate(0 -0.01)">
                            <g id="MCT" transform="translate(0 0.01)">
                            <path id="Path_80" data-name="Path 80" d="M35.979,45.21l-9.095,5.016L17.79,45.21V55.7l5.451,3.13a7.278,7.278,0,0,0,7.287,0l5.451-3.14Z" transform="translate(-1.676 -3.805)"/>
                            <path id="Path_81" data-name="Path 81" d="M46.943,11.347,28.653.923a6.953,6.953,0,0,0-6.89,0L3.473,11.347A6.794,6.794,0,0,0,0,17.242V38.109A6.794,6.794,0,0,0,3.473,44l3.184,1.845V18.4A1.464,1.464,0,0,1,7.4,17.119a1.5,1.5,0,0,1,1.489,0l16.32,9.1,16.311-9.1a1.5,1.5,0,0,1,1.489,0A1.464,1.464,0,0,1,43.75,18.4V45.821l3.184-1.845a6.8,6.8,0,0,0,3.482-5.867V17.242a6.794,6.794,0,0,0-3.473-5.895Z" transform="translate(0 -0.01)"/>
                            </g>
                        </g>
                        </svg>
                    </div>

                    <div className='header_nav_icons'>
                        <div 
                            className="icon_container"
                            onClick={navigateToCheckOut}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 40.5 36">
                                <path id="Icon_awesome-shopping-cart" data-name="Icon awesome-shopping-cart" d="M37.133,21.186,40.457,6.561A1.688,1.688,0,0,0,38.812,4.5H11.194L10.55,1.349A1.687,1.687,0,0,0,8.9,0H1.688A1.687,1.687,0,0,0,0,1.688V2.813A1.687,1.687,0,0,0,1.688,4.5H6.6L11.54,28.648a3.938,3.938,0,1,0,4.714.6H31a3.936,3.936,0,1,0,4.472-.732l.388-1.707a1.688,1.688,0,0,0-1.646-2.061H15.336l-.46-2.25H35.488A1.687,1.687,0,0,0,37.133,21.186Z"/>
                            </svg>
                            <p>Winkelmand</p>
                        </div>

                        <div
                            className="icon_container"
                            onClick={navigateToWihsList}
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon" viewBox="0 0 34.355 30.348">
                            <path id="Icon_feather-heart" data-name="Icon feather-heart" d="M31.26,6.915a8.25,8.25,0,0,0-11.67,0L18,8.505l-1.59-1.59A8.252,8.252,0,1,0,4.74,18.585l1.59,1.59L18,31.845l11.67-11.67,1.59-1.59a8.25,8.25,0,0,0,0-11.67Z" transform="translate(-0.823 -2.997)" fill="#368ADE" stroke="#368ADE" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3"/>
                        </svg>
                        <p>Verlanglijst</p>
                        </div>
                    </div>
                </div>
            </div>

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