import React, {ChangeEvent, useEffect, useState, MouseEvent} from 'react';
import '../style/wishlist.css'

function Wishlist(){
    const [wishlist, setWishlist] = useState<any[]>()

    useEffect(() =>{
        const list:any = localStorage.getItem('wishlist')
        const parsedList = JSON.parse(list)
        setWishlist(parsedList)
        console.log(parsedList)
    },[])

    const goBack = () => {
        window.location.href=`/`
    }

    const localSWishlist:any[] = []
    const removeItemFromWishlist = (productId:any) => {
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

    const navigateToDetail = (productId:any) => {
        window.location.href=`/detailsProduct/${productId}`
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

            <div className="wishlist_grid">
                {wishlist && wishlist.map(item => {
                    return(
                        <div className="wishlist_item_container">
                            <img
                                onClick={() => navigateToDetail(item.ProductId)}
                                className="wishlist_item_img"
                                src = {item.Picture}
                                alt =  {`Image of ${item.Name}`}
                            />

                            <div className="wishlist_item_buttonC">
                                <svg xmlns="http://www.w3.org/2000/svg" className="cart_icon" viewBox="0 0 30 30">
                                    <path id="Icon_material-shopping-cart" data-name="Icon material-shopping-cart" d="M10.5,27a3,3,0,1,0,3,3A3,3,0,0,0,10.5,27ZM1.5,3V6h3L9.9,17.385,7.875,21.06A2.9,2.9,0,0,0,7.5,22.5a3.009,3.009,0,0,0,3,3h18v-3H11.13a.371.371,0,0,1-.375-.375l.045-.18L12.15,19.5H23.325a2.986,2.986,0,0,0,2.625-1.545L31.32,8.22a1.465,1.465,0,0,0,.18-.72A1.5,1.5,0,0,0,30,6H7.815L6.405,3Zm24,24a3,3,0,1,0,3,3A3,3,0,0,0,25.5,27Z" transform="translate(-1.5 -3)" fill="#368ade"/>
                                </svg>
                                <button onClick={() => addToShoppingList(item)} className="wishlist_item_button_cart">Winkelmand</button>
                            </div>

                            <div 
                                className="wishlist_item_text"
                                onClick={() => navigateToDetail(item.ProductId)}    
                            >
                                <h1 className="wishlist_item_name">{item.Name}</h1>
                                <div className="wishlist_item_priceC">
                                    <p className="wishlist_item_price">€{item.Price}</p>
                                    <div className="wishlist_item_removebtn">
                                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => removeItemFromWishlist(item.ProductId)} className="wishlist_item_icon" viewBox="0 0 21 27">
                                            <path id="Icon_material-delete" data-name="Icon material-delete" d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21Z" transform="translate(-7.5 -4.5)"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    )
                })}
            </div>
        </main>
    )
}

export default Wishlist;