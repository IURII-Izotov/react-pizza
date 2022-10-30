import './scss/app.scss'
import {Header} from "./components/Header";
import {Home} from "./pages/Home";
import {NotFound} from "./pages/NotFound";
import {
    Routes,
    Route,
} from "react-router-dom";

import * as React from "react";
import {Cart} from "./pages/Cart";
import {useSelector} from "react-redux";
import {CartEmpty} from "./components/CartEmpty";


function App() {
    const {items}= useSelector((state)=> state.cart )
    const totalCount = items.reduce((sum,item)=>{
        return item.count + sum
    },0)
    return (
        <div className="wrapper">
                <Header />
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={ <Home /> } />
                            <Route path="/cart" element={totalCount!==0 ? <Cart/>:<CartEmpty/>} />
                            <Route path="*" element={<NotFound/>} />
                        </Routes>
                    </div>
                </div>
        </div>

    );
}

export default App;
