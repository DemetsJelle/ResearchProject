import React, {ChangeEvent, useState, useEffect, useContext} from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { totalPriceState } from '../routes/shoppingCart';
import '../style/shoppingCart.css'



export default function ShoppingListItem({product}:{product:any}){
    const[total, setTotal] = useState(0)
    const[amount, setAmount] = useState(1)

    // const totalPriceValue = useRecoilValue(totalPriceState);
    // const setTotalPriceValue = useSetRecoilState(totalPriceState);
    const[totalPriceValue, setTotalPriceValue] = useRecoilState(totalPriceState)

    useEffect(() => {
        console.log({totalPriceValue})
        console.log(product.Price)
        
        //const newTotal = totalPriceValue + product.Price
        setTotalPriceValue((prev) => {
            return(
                prev += product.Price
            )
        })
        //console.log(totalPriceValue)
    },[])

    useEffect(() => {
        console.log('eigen use effect ' + totalPriceValue)
    },[totalPriceValue])

    useEffect(() =>{
        let totalPrice:number = amount * Number(product.Price)
        setTotal(Math.round(totalPrice * 100)/100)
    },[amount])

    const increaseAmount = () => {
        setAmount(amount + 1)
        const newTotal = totalPriceValue + product.Price
        setTotalPriceValue(newTotal)
    }

    const decreaseAmount = () => {
        if(amount !== 0){
            setAmount(amount - 1)
            const newTotal = totalPriceValue - product.Price
            setTotalPriceValue(newTotal)
        }   
    }

    return(
        <div
            className="shoppingList_grid"
            key={product.ProductId}
        >
            <div className="grid_product">
                <img
                    src = {product.Picture}
                    alt = {`Image of ${product.Name}`}
                />
                <p>{product.Name}</p>
            </div>
            <h2 className="grid_price">€{product.Price}</h2>
            <div className="grid_amount">
                <button
                    className="grid_amount_btn"
                    onClick={decreaseAmount}
                >-
                </button>
                <p>{amount}</p>
                <button
                    className="grid_amount_btn"
                    onClick={increaseAmount}
                >+
                </button>
            </div>
            <h2 className="grid_price">€{total}</h2>
            <svg xmlns="http://www.w3.org/2000/svg" className="grid_remove" viewBox="0 0 21 27">
                <path id="Icon_material-delete" data-name="Icon material-delete" d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21Z" transform="translate(-7.5 -4.5)"/>
            </svg>

        </div>
    )
}