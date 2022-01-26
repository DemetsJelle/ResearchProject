import { parse } from 'path/posix';
import React, {ChangeEvent, useEffect, useContext, useState, createContext} from 'react';
import { atom, useRecoilState} from 'recoil'
import '../style/shoppingCart.css'
import ShoppingListItem from '../components/shoppingListItemComponent';


export const totalPriceState = atom({
    key:"totalPrice",
    default:0
})

function ShoppingCart(){
    const [shoppingCart, setShoppingCart] = useState<any[]>()
    const [totalPrice, setTotalPrice] = useRecoilState(totalPriceState)


    useEffect(() =>{
        const list:any = localStorage.getItem('shoppingCart')
        const parsedList = JSON.parse(list)
        setShoppingCart(parsedList)
        console.log(parsedList)
    },[])

    const goBack = () => {
        window.location.href=`/`
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

            <div className="shoppingList_grid_container">
                {shoppingCart && shoppingCart.map(item => {
                    return(
                        <ShoppingListItem key={item.ProductId} product={item} />
                    )
                })}
            </div>
            <div>
                <p>{totalPrice}</p>
            </div>
        </main>
    )
}

export default ShoppingCart;