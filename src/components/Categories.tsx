import React from "react";

type TCategoriesProps = {
    categoryId: number,
    onClickCategory: (index: number) => void
}
export const Categories: React.FC<TCategoriesProps> = ({categoryId,onClickCategory}) => {

    const categories=['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые']

    return (
        <div className="categories">
            <ul>
                {categories.map((categoryName,index)=> {
                    return (
                        <li
                            key={index}
                            onClick={() => onClickCategory(index)} className={categoryId === index ? 'active' : ''}>
                            {categoryName}
                        </li>
                    )
                }
                )
                }
            </ul>
        </div>
    )
}