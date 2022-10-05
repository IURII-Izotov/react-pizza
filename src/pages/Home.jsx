import {Categories} from "../components/Categories";

import {Skelenon} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import {useEffect, useState} from "react";
import {Sort} from "../components/Sort";
import {Pagination} from "../components/Pagination";
import * as React from "react";

export const Home =({searchValue})=>{
    const [items,setItems]=useState([])
    const [isLoading,setIsLoading]= useState(true)
    const [categoryId, setCategoryId] = useState(0);
    const [sortType,setSortType] =useState({
        name:'популярности', sortProperty:'rating'
    })
    const [currentPage, setCurrentPage] = useState(0);
    useEffect(()=>{
        setIsLoading(true)
        const order =sortType.sortProperty.replace('-','');
        const category = categoryId > 0 ? 'category=' + categoryId : '';
        const sortBy = sortType.sortProperty[0] == '-'? 'desc':'asc';
        fetch(`https://630e6210109c16b9abfa526d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${order}&order=${sortBy}&search=${searchValue}`).then(res=>{
            return res.json()
        }).then(json=>{
            setItems(json);
            setIsLoading(false);
        })
    },[categoryId,sortType,searchValue,currentPage])

    const onClickCategory =(categoryId)=>{
        setCategoryId(categoryId)
    }
    const onClickSort = (name)=>{
        setSortType(name)
    }

    return(
        <>
            <div className="content__top">
                <Categories categoryId ={categoryId}
                            onClickCategory ={onClickCategory}
                />
                <Sort sortType = {sortType} onClickSort ={onClickSort} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {   isLoading
                    ? [...new Array(8)].map((_,index)=> <Skelenon key={index} />)
                    : items.map((obj)=><PizzaBlock key={obj.id} {...obj}/>)
                }

            </div>
            <Pagination onChangePage={number =>setCurrentPage(number)}/>
        </>
    )
}