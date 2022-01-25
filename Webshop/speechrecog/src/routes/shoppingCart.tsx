import { parse } from 'path/posix';
import React, {ChangeEvent, useEffect, useState, MouseEvent} from 'react';

function ShoppingCart(){

    const [shoppingCart, setShoppingCart] = useState<any[]>()
    useEffect(() =>{
        const list:any = localStorage.getItem('shoppingCart')
        const parsedList = JSON.parse(list)
        setShoppingCart(parsedList)
        console.log(parsedList)
    },[])

    return (
        <main style={{ padding: "1rem 0" }}>
            <h2>ShoppingList</h2>

            <div>
                {shoppingCart && shoppingCart.map(item => {
                    return(
                        <div
                            key={item.ProductId}
                        >
                            <p>{item.Name}</p>
                        </div>
                    )
                })
                    
                }
            </div>
        </main>
    )
}

export default ShoppingCart;