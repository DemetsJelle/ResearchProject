import React, {ChangeEvent, useState, useEffect, useContext} from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { totalPriceState } from '../routes/shoppingCart';
import '../style/shoppingCart.css'



export default function ShoppingListItem(props:any){
    const[total, setTotal] = useState(0)
    const[amount, setAmount] = useState(1)

    const[totalPriceValue, setTotalPriceValue] = useRecoilState(totalPriceState)

    useEffect(() => {
        setTotalPriceValue((prev) => {
            return(
                prev += props.product.Price
            )
        })
    },[])

    useEffect(() => {
        if(props.voiceSelected){
            console.log(props.voiceSelected)
            if(props.voiceSelected.Name === props.product.Name)
                setAmount(amount + 1)
        }
    },[props.voiceSelected])

    useEffect(() =>{
        let totalPrice:number = amount * Number(props.product.Price)
        setTotal(Math.round(totalPrice * 100)/100)
    },[amount])

    const increaseAmount = () => {
        setAmount(amount + 1)
        const newTotal = totalPriceValue + props.product.Price
        setTotalPriceValue(newTotal)
    }

    const decreaseAmount = () => {
        if(amount !== 0){
            setAmount(amount - 1)
            const newTotal = totalPriceValue - props.product.Price
            setTotalPriceValue(newTotal)
        }   
    }

    const listArray:any[] = []
    const removeItem = () => {
        const list:any = localStorage.getItem('shoppingCart')
        if(list){
            const parsedList:any = JSON.parse(list)
            parsedList.forEach((item:any) =>{
                if(item.ProductId !== props.product.ProductId){
                    listArray.push(item)
                }
            })
            props.list(listArray)
            const newTotal = totalPriceValue - (props.product.Price* amount)
            setTotalPriceValue(newTotal)
            localStorage.setItem('shoppingCart',JSON.stringify(listArray))
        }
    }

    return(
        <div
            className="shoppingList_grid"
            key={props.product.ProductId}
        >
            <div className="grid_product">
                <img
                    src = {props.product.Picture}
                    alt = {`Image of ${props.product.Name}`}
                />
                <p>{props.product.Name}</p>
            </div>
            <h2 className="grid_price">€{props.product.Price}</h2>
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
            <svg onClick={removeItem} xmlns="http://www.w3.org/2000/svg" className="grid_remove" viewBox="0 0 21 27">
                <path id="Icon_material-delete" data-name="Icon material-delete" d="M9,28.5a3.009,3.009,0,0,0,3,3H24a3.009,3.009,0,0,0,3-3v-18H9ZM28.5,6H23.25l-1.5-1.5h-7.5L12.75,6H7.5V9h21Z" transform="translate(-7.5 -4.5)"/>
            </svg>

        </div>
    )
}