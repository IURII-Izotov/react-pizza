import {Categories} from "../components/Categories";
import {Skelenon} from "../components/PizzaBlock/Skeleton";
import {PizzaBlock} from "../components/PizzaBlock";
import {useEffect, useRef} from "react";
import {Sort, sortList} from "../components/Sort";
import {Pagination} from "../components/Pagination";
import * as React from "react";

import { useSelector, useDispatch } from 'react-redux'
import {setCategoryId,setCurrentPage,setFilters} from "../redux/slices/filterSlice";
import qs from 'qs'
import {useNavigate} from "react-router-dom";
import {fetchPizzas} from "../redux/slices/pizzaSlice";

export const Home:React.FC =()=>{
    const dispatch =useDispatch();
    const {items,status} = useSelector((state:any) => state.pizza)
    const {categoryId,sort,currentPage,searchValue} = useSelector((state:any) => state.filter)

    const navigate = useNavigate();
    const isSearch = useRef(false);
    const isMounted = useRef(false)

    const getPizzas=()=>{
        const order =sort.sortProperty.replace('-','');
        const category = categoryId > 0 ? 'category=' + categoryId : '';
        const sortBy = sort.sortProperty[0] == '-'? 'desc':'asc';


        dispatch(
            // @ts-ignore
            fetchPizzas({
            order,
            category,
            sortBy,
            searchValue,
            currentPage
        }))
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
            getPizzas()
        }
        isSearch.current = false;
    },[categoryId,sort.sortProperty,searchValue,currentPage])


    const onClickCategory =(categoryId:number)=>{
        dispatch(setCategoryId(categoryId))
    }
    const onChangePage = (number:number)=> {
        dispatch(setCurrentPage(number))
    }

    return(
        <>
            <div className="content__top">
                <Categories categoryId = {categoryId == null ? 0 : categoryId }
                            onClickCategory ={onClickCategory}
                />
                <Sort/>
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {
                status ==='error'?
                    (<div className="content__error-info">
                        <h1>Произошла ошибка 😱</h1>
                        <p>Не удалось получить данные! 😥</p>
                    </div>)
                    :
                    (<div className="content__items">
                        {   status === 'loading'
                            ? [...new Array(8)].map((_,index)=> <Skelenon key={index} />)
                            : items.map((obj:any)=><PizzaBlock key={obj.id} {...obj}/>)
                        }
                    </div>)
            }

            <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
        </>
    )
}