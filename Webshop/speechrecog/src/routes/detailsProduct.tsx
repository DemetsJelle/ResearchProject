import React, {ChangeEvent, useEffect, useState, MouseEvent} from 'react';
import { useParams } from "react-router-dom";

import API from '../utils/api'
import '../style/detailProduct.css'

function DetailsProduct(){
    let { productId } = useParams()
    const [productData, setProductData] = useState<any>()

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

    const extraInfoSplit = (info:string) => {
        let p1:string
        let p2:string
    
        
    }

    return (
        <main className="main">
            <h2>Detail</h2>

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
                                <svg xmlns="http://www.w3.org/2000/svg" width="34.355" height="30.348" viewBox="0 0 34.355 30.348">
                                    <path id="Icon_feather-heart" data-name="Icon feather-heart" d="M31.26,6.915a8.25,8.25,0,0,0-11.67,0L18,8.505l-1.59-1.59A8.252,8.252,0,1,0,4.74,18.585l1.59,1.59L18,31.845l11.67-11.67,1.59-1.59a8.25,8.25,0,0,0,0-11.67Z" transform="translate(-0.823 -2.997)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="3"/>
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
        </main>
    )
}

export default DetailsProduct;