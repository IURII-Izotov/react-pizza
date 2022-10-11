import {Categories} from "../components/Categories";

import {Skelenon} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import {useContext, useEffect, useState} from "react";
import {Sort} from "../components/Sort";
import {Pagination} from "../components/Pagination";
import * as React from "react";
import {SearchContext} from "../App";
import { useSelector, useDispatch } from 'react-redux'
import {setCategoryId, setSort} from "../redux/slices/filterSlice";

export const Home =()=>{
    const [items,setItems]=useState([])
    const [isLoading,setIsLoading]= useState(true)
    const dispatch =useDispatch(setSort);
    const {categoryId,sort} = useSelector(state => state.filter)
    const [currentPage, setCurrentPage] = useState(1);
    const {searchValue} = useContext(SearchContext)
    useEffect(()=>{
        setIsLoading(true)
        const order =sort.sortProperty.replace('-','');
        const category = categoryId > 0 ? 'category=' + categoryId : '';
        const sortBy = sort.sortProperty[0] == '-'? 'desc':'asc';
        fetch(`https://630e6210109c16b9abfa526d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${order}&order=${sortBy}&search=${searchValue}`).then(res=>{
            return res.json()
        }).then(json=>{
            setItems(json);
            setIsLoading(false);
        })
    },[categoryId,sort.sortProperty,searchValue,currentPage])

    const onClickCategory =(categoryId)=>{
        console.log(categoryId)
        dispatch(setCategoryId(categoryId))
        // setCategoryId(categoryId)
    }
    const onClickSort = (name)=>{
        dispatch(name)
    }

    return(
        <>
            <div className="content__top">
                <Categories categoryId ={categoryId}
                            onClickCategory ={onClickCategory}
                />
                <Sort  />
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