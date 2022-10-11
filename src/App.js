import './scss/app.scss'
import {Header} from "./components/Header";
import {Home} from "./pages/Home";
import {NotFound} from "./pages/NotFound";
import {
    Routes,
    Route,
} from "react-router-dom";
import {Cart} from "./pages/Cart";
import * as React from "react";

export const SearchContext = React.createContext()

function App() {
    const [searchValue,setSearchValue] = React.useState('');

    return (
        <div className="wrapper">
            <SearchContext.Provider  value={{searchValue,setSearchValue}}>
                <Header />
                <div className="content">
                    <div className="container">
                        <Routes>
                            <Route path="/" element={ <Home /> } />
                            <Route path="/cart" element={<Cart/>} />
                            <Route path="*" element={<NotFound/>} />
                        </Routes>
                    </div>
                </div>
            </SearchContext.Provider>
        </div>

    );
}

export default App;
