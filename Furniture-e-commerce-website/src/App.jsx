import React from 'react'
// import reactLogo from './assets/react.svg'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'
import Header from './Component/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Component/Home'
import Footer from './Component/Footer'
import Collection from './Component/Collection'
import Bed from './Component/Bed'
import Sofa from './Component/Sofa'
import Table from './Component/Table'
import Chair from './Component/Chair'
import Wardrobe from './Component/Wardrobe'
import ProductView from './Component/ProductView'
import LoginForm from './Component/LoginForm'
import SignUp from './Component/SignUp'
import { UserContextProvider } from './Component/UserContextProvider'
import Search from './Component/Search'
import Cart from './Component/Cart'
// import AdminLogin from './Component/AdminLogin'
// import AdminView from './Component/AdminView'
import ErrorPage from './Component/ErrorPage'
// import Header from './Component/Header'
import AdminLogin from './Component/AdminDatas/AdminLogin'
import AdminView from './Component/AdminDatas/AdminView'
import AdminNavbar from './Component/AdminDatas/AdminNavbar'
import User from './Component/AdminDatas/User'
import AdminProducyEdit from './Component/AdminDatas/AdminProducyEdit'
import AdminAddProduct from './Component/AdminDatas/AdminAddProduct'
import PaymentSuccess from './Component/PaymentSuccess'
import Order from './Component/Order'
import Orders from './Component/AdminDatas/Orders'
import Revenuegenerated from './Component/AdminDatas/Revenuegenerated'



function App() {

  return (
    <>
      <UserContextProvider>


        {/* <Header/> */}
     
     



      <Routes>
        {/* <Route path='Header' element={<Header/>}/> */}
        <Route path='/' element={<Home/>}/>
        <Route path='/Collection' element={<Collection/>}/>
        <Route path='/bed' element={<Bed/>}/>
        <Route path='/sofa' element={<Sofa/>}/>
        <Route path='/table' element={<Table/>}/>
        <Route path='/chair' element={<Chair/>}/>
        <Route path='/wardrobe' element={<Wardrobe/>}/>
        <Route path='/:id' element={<ProductView/>}/>
        <Route path='loginform' element={<LoginForm/>}/>
        <Route path='signup' element={<SignUp/>}/>
        <Route path='/search/:term' element={<Search/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/AdminLogin' element={<AdminLogin/>}/>
        <Route path='/AdminView' element={<AdminView/>}/>
        <Route path='*' element={<ErrorPage/>}/>
        <Route path='/AdminNavbar' element={<AdminNavbar/>}/>
        <Route path='/User' element={<User/>}/>
        <Route path='/AdminProducyEdit/:id' element={<AdminProducyEdit/>}/>
        <Route path='/AdminAddProduct' element={<AdminAddProduct/>}/>
        <Route path='/payment/success' element={<PaymentSuccess/>}/>
        <Route path='/Order' element={<Order/>}/>
        <Route path='/Orders' element={<Orders/>}/>
        <Route path='/Revenuegenerated' element={<Revenuegenerated/>}/>
        
      </Routes>

      
      </UserContextProvider>

      {/* <Footer/> */}

    </>
  )
}

export default App
