import React, {ChangeEvent, useEffect, useState, MouseEvent} from 'react';
import { useParams } from "react-router-dom";

import API from '../utils/api'
import '../style/detailProduct.css'

function DetailsProduct(){
    let { productId } = useParams()
    const [productData, setProductData] = useState<any>()

    let extraInfo:string[] = []
    let test

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
                            <h2 className="productOverview_naam">{productData.Name}</h2>
                            <div className="product_price_container">
                                <p>Prijs:</p>
                                <h2 className="product_price">{productData.Price}</h2>
                            </div>
                            <p>{productData.Description}</p>
                            <div>
                                <p>Maat:</p>
                                <select>
                                    {productData.Sizes.map((size:any) => (
                                        <option key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <button>Toevoegen aan winkelmand</button>
                            <div></div>
                        </section>
                    </section>
                }
            </div>

            <section>
                <h1 className="productVoordelen_title">PRODUCTVOORDELEN</h1>
                <div className="productVoordelen_container">

                    {productData && productData.ExtraInfo.map((i:string) => (
                        Object.entries(i).map((x) =>(
                            <div className="productVoordelen_item">
                                <p className="test2">{x[0]}</p>
                                <p className="test3">{x[1]}</p>
                            </div>
                        ))
                    ))}
                </div>
            </section>
        </main>
    )
}

export default DetailsProduct;