import React,{useState} from "react";

export const Categories = () => {
    const [activeIndex, setActiveIndex] = useState(2);
    const categories=['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    const onClickCategory = (index) => {
        setActiveIndex(index);
    }
    return (
        <div className="categories">
            <ul>
                {categories.map((category,index)=> {
                    return (
                        <li
                            key={index}
                            onClick={() => onClickCategory(index)} className={activeIndex === index ? 'active' : ''}>
                            {category}
                        </li>
                    )
                }
                )
                }
            </ul>
        </div>
    )
}