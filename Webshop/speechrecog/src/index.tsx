import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wishlist from './routes/wishlist';
import ShoppingCart from './routes/shoppingCart';
import DetailProduct from './routes/detailsProduct';
import CommandsPage from './routes/commandsPage';
import PaymentPage from './routes/payment'
import { RecoilRoot } from 'recoil';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="shoppingCart" element={
          <RecoilRoot>
            <ShoppingCart />
          </RecoilRoot>
        } />
        <Route path="detailsProduct/:productId" element={<DetailProduct />} />
        <Route path="commandPage" element={<CommandsPage />}/>
        <Route path="paymentPage" element={<PaymentPage />}/>
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
