import React from 'react';
import './App.css';

import { BrowserRouter as Router,Switch,Route,Link} from 'react-router-dom';

import LoginPage from './views/LoginPage/LoginPage';
import RegisterPage from './views/RegisterPage/RegisterPage';
import LandingPage from './views/LandingPage/LandingPage';
import Footer from './views/Footer/Footer';
import NavBar from './views/NavBar/NavBar';
import UploadPage from './views/UploadProduct/UploadProduct';
import AboutPage from './views/AboutPage/AboutPage';

import Auth from '../hoc/Auth';
import ProductDetail from './views/ProductDetail/ProductDetail';
import CartPage from './views/CartPage/CartPage';

//null   Anyone Can go inside
//true   only logged in user can go inside
//false  logged in user can't go inside


function App() {

  return (

    <div className="App">
    
        <NavBar></NavBar>

        <Switch>

          <Route exact path="/" component={Auth(LandingPage,null)}/>
          <Route exact path="/about" component={Auth(AboutPage,null)}/>
          <Route exact path="/login" component={Auth(LoginPage,false)}/>
          <Route exact path="/register" component={Auth(RegisterPage,false)}/>
          <Route exact path="/upload/product" component={Auth(UploadPage,true)}/>
          <Route exact path="/product/:productId" component={Auth(ProductDetail,true)}/>
          <Route exact path="/cart" component={Auth(CartPage,true)}/>
         
        </Switch>
        
        <Footer></Footer>
    
    </div>
  );
}

export default App;
