import styles from './search.module.scss'
import {useCallback, useContext, useEffect, useRef, useState} from "react";
import debounce from "lodash.debounce"
import {useDispatch} from "react-redux";
import {setSearchValue} from "../../redux/slices/filterSlice";


export const Search = () => {
    const dispatch= useDispatch();
    const inputRef = useRef();
    const [value,setValue]= useState('')

    const onClickClear = ()=>{
        dispatch(setSearchValue(''));
        setValue('');
        inputRef.current.focus();

    }


    let updateSearchValue = useCallback(
        debounce((str)=>{
            dispatch(setSearchValue(str));
        }, 400),[]
    )
    const onChangeInput =(event)=>{
        setValue(event.target.value)
        updateSearchValue(event.target.value);
    }
    return (
        <div className={styles.root}>
            <svg
                className={styles.icon}
                enableBackground="new 0 0 32 32"
                id="EditableLine"
                version="1.1"
                viewBox="0 0 32 32"
                xmlns="http://www.w3.org/2000/svg">
                <circle
                    cx="14"
                    cy="14"
                    fill="none"
                    id="XMLID_42_"
                    r="9"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                />
                <line
                    fill="none"
                    id="XMLID_44_"
                    stroke="#000000"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    x1="27"
                    x2="20.366"
                    y1="27"
                    y2="20.366"
                />
            </svg>
            <input
                ref={inputRef}
                value={value}
                onChange={onChangeInput}
                className={styles.input}
                placeholder="Поиск пиццы..."
            />
            <svg
                className={styles.close}
                onClick={()=>onClickClear()}
                fill="#000000"
                viewBox="0 0 50 50"
                width="25px"
                height="25px">
                <path
                    d="M 11.5 11 C 11.372 11 11.243984 11.048984 11.146484 11.146484 C 11.049484 11.244484 11 11.372 11 11.5 C 11 11.628 11.048484 11.755516 11.146484 11.853516 L 24.292969 25 L 11.146484 38.146484 C 10.951484 38.341484 10.951484 38.658516 11.146484 38.853516 C 11.244484 38.950516 11.372 39 11.5 39 C 11.628 39 11.755516 38.951516 11.853516 38.853516 L 25 25.707031 L 38.146484 38.853516 C 38.341484 39.048516 38.658516 39.048516 38.853516 38.853516 C 39.048516 38.657516 39.049516 38.342484 38.853516 38.146484 L 25.707031 25 L 38.853516 11.853516 C 39.048516 11.658516 39.048516 11.341484 38.853516 11.146484 C 38.657516 10.951484 38.342484 10.950484 38.146484 11.146484 L 25 24.292969 L 11.853516 11.146484 C 11.756016 11.048984 11.628 11 11.5 11 z"/>
            </svg>
        </div>
    )
}