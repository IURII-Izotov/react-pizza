import {Categories} from "../components/Categories";
import axios from "axios";
import {Skelenon} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import {useContext, useEffect, useRef, useState} from "react";
import {Sort, sortList} from "../components/Sort";
import {Pagination} from "../components/Pagination";
import * as React from "react";
import {SearchContext} from "../App";
import { useSelector, useDispatch } from 'react-redux'
import {setCategoryId, setSort,setCurrentPage,setFilters} from "../redux/slices/filterSlice";
import qs from 'qs'
import {useNavigate} from "react-router-dom";

export const Home =()=>{
    const [items,setItems]=useState([])
    const [isLoading,setIsLoading]= useState(true)
    const dispatch =useDispatch(setSort);
    const {categoryId,sort,currentPage} = useSelector(state => state.filter)
    const {searchValue} = useContext(SearchContext)
    const navigate = useNavigate();
    const isSearch = useRef(false);
    const isMounted = useRef(false)

    const fetchPizzas=()=>{
        setIsLoading(true)
        const order =sort.sortProperty.replace('-','');
        const category = categoryId > 0 ? 'category=' + categoryId : '';
        const sortBy = sort.sortProperty[0] == '-'? 'desc':'asc';

        axios.get(
            `https://630e6210109c16b9abfa526d.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${order}&order=${sortBy}&search=${searchValue}`
        )
            .then(res=>{
                setItems(res.data);
                setIsLoading(false);
            })
    }

    useEffect(()=>{
        if(isMounted.current){
            const queryString=qs.stringify({
                sortProperty:sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true;

    },[categoryId,sort.sortProperty,currentPage])
    useEffect(()=>{
        if(window.location.search){
            const params=qs.parse(window.location.search.substring(1));
            const sort=sortList.find(obj => obj.sortProperty === params.sortProperty )

            dispatch(setFilters({
                ...params,sort
            }))
            isSearch.current=true;
        }

    },[])
    useEffect(()=>{
        window.scrollTo(0, 0);
        if(!isSearch.current){
            fetchPizzas()
        }
        isSearch.current = false;
    },[categoryId,sort.sortProperty,searchValue,currentPage])


    const onClickCategory =(categoryId)=>{
        dispatch(setCategoryId(categoryId))
    }
    const onClickSort = (name)=>{
        dispatch(name)
    }
    const onChangePage = (number)=> {
        dispatch(setCurrentPage(number))
    }

    return(
        <>
            <div className="content__top">
                <Categories categoryId ={categoryId}
                            onClickCategory ={onClickCategory}
                />
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {   isLoading
                    ? [...new Array(8)].map((_,index)=> <Skelenon key={index} />)
                    : items.map((obj)=><PizzaBlock key={obj.id} {...obj}/>)
                }

            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>
    )
}