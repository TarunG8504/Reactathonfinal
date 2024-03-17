import './App.css';
import{Routes,Route,BrowserRouter} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import Product from'./components/Product';
import Cart from './components/Cart';
import SearchBar from './components/SearchBar';
import Clothes from './components/Clothes';
import Bags from './components/Bags';
import Shoes from './components/Shoes';
import Watches from './components/Watches';
function App() {
  return (
    <>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route element ={<Home/>} path="/" />
        <Route element ={<About/>} path="/About" />
        <Route element ={<Contact/>} path="/Contact" />
        <Route element={<Product/>} path="/Product"/>
        <Route element ={<Cart/>} path="/Cart" />
        <Route element ={<SearchBar/>} path="/SearchBar" />
        <Route element={<Clothes/>} path="/Clothes"/>
        <Route element ={<Bags/>} path="/Bags" />
        <Route element ={<Watches/>} path="/Watches" />
        <Route element={<Shoes/>} path="/Shoes"/>
      </Routes>
      </BrowserRouter>

    </>
  )
}
export default App;
