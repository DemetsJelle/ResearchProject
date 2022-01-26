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
            <div>
                <img></img>
                <p>{product.Name}</p>
            </div>
            <h2>{product.Price}</h2>
            <div>
                <button
                    onClick={decreaseAmount}
                >-
                </button>
                <p>{amount}</p>
                <button
                    onClick={increaseAmount}
                >+
                </button>
            </div>
            <h2>{total}</h2>
        </div>
    )
}