import './scss/app.scss'
import {Sort} from "./components/Sort";
import {Header} from "./components/Header";
import {Categories} from "./components/Categories";
import {PizzaBlock} from "./components/PizzaBlock";

import {useEffect, useState} from "react";
function App() {
    const [items,setItems]=useState([])
    useEffect(()=>{
        fetch('https://630e6210109c16b9abfa526d.mockapi.io/items').then(res=>{
            return res.json()
        }).then(json=>{
            setItems(json);
        })
    },[])
    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories/>
                        <Sort/>
                    </div>
                    <h2 className="content__title">Все пиццы</h2>
                    <div className="content__items">
                        {
                            items.map((obj)=>{
                                return <PizzaBlock key={obj.id} {...obj}/>
                            })
                        }

                    </div>
                </div>
            </div>
        </div>

    );
}

export default App;
