import './scss/app.scss'
import {Sort} from "./components/Sort";
import {Header} from "./components/Header";
import {Categories} from "./components/Categories";
import {PizzaBlock} from "./components/PizzaBlock";
import pizzas from './assets/pizza.json'
function App() {
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
                            pizzas.map((obj)=>{
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
