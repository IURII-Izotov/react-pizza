import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";

type pizzaObjType = {
    imageUrl:string,
    title:string,
    price:number
}

export const FullPizza:React.FC = () => {
    const [pizza,setPizza]=useState<pizzaObjType>()
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        async function fetchPizza(){
            try {
                const {data}= await axios(`https://630e6210109c16b9abfa526d.mockapi.io/items/${id}`);
                setPizza(data);
            }catch (e) {
                console.log('Такой пиццы нет ОЩИБКА:' + e)
                navigate('/');
            }

        }
        fetchPizza();
    }, []);
    if (!pizza){
        return <>
            <h1>Идет загрузка...</h1>
            </>
    }
    return (
        <div>
            <img src={pizza.imageUrl} alt=""/>
            <h2>{pizza.title}</h2>
            <h4>{pizza.price} P</h4>
        </div>
    );
};
