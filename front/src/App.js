import React from "react";
import axios from "axios";
import AppBar from "./components/AppBar/AppBar";
import Home from "./views/Home.jsx";
import { useDispatch, useSelector } from "react-redux";
import Login from "./components/Login";
import Register from "./components/Register";
import Products from "./components/Products";
import ProductDetail from "./components/ProductDetail";
import Footer from "./components/Footer.jsx";
import Cart from "./components/Cart.jsx";
import "./App.css";
import Category from "./components/Category";
import { setUser } from "./state/user";
import { setCarrito } from "./state/carrito";
import { Switch, Route } from "react-router-dom";
import Reviews from "./components/Reviews.jsx";
import OrderDetail from "./components/OrderDetail.jsx";
import Search from "./components/Search.jsx";
import NoDisponible from "./components/NoDisponible.jsx";

import AdminPanel from "./components/admin-views/AdminPanel";
import ProductosAdmin from "./components/admin-views/ProductosAdmin.jsx";
import UsuariosAdmin from "./components/admin-views/UsuariosAdmin.jsx";
import OrdenesAdmin from "./components/admin-views/OrdenesAdmin.jsx";
import SingleUsuario from "./components/admin-views/SingleUsuario.jsx";
import PastOrders from "./components/PastOrders/PastOrders.jsx"
import "./App.css";
import { getUsers } from "./state/allusers";
import EditarUsuario from "./components/admin-views/EditarUsuario";
import CategoriasAdmin from "./components/admin-views/CategoriasAdmin"
import EditarCategoria from "./components/admin-views/EditarCategoria"
import CrearCategoria from "./components/admin-views/CrearCategoria"
import SingleOrden from "./components/admin-views/SingleOrden"
import EditarOrdenes from "./components/admin-views/EditarOrdenes"
import EditarProducto from "./components/admin-views/EditarProducto";
import PastOrderDetail from "./components/PastOrderDetail.jsx"


function App() {
  const dispatch = useDispatch();
  const carrito = useSelector((state) => state.carrito);

  React.useEffect(() => {
    const token = localStorage.getItem("token")
      ? localStorage.getItem("token")
      : undefined;
    if (token) {
      axios.defaults.headers.authorization = `${token}`;
      axios.post("/api/auth/me").then((data) => {
        dispatch(setUser(data.data));
      });
    }

    dispatch(setCarrito());
  }, []);

  return (
    <div className="App bg-light">
      <AppBar />
      <div className="main">
        <Switch>
          <Route path exact="/"><Home /></Route>
          <Route path="/categories/:id" render={({ match }) => <Category id={match.params.id} />} />
          <Route path="/login"><Login /></Route>
          <Route path="/register"><Register /></Route>

          <Route path="/products/search"><Search /></Route>

          <Route path="/products/:id/reviews" render={({ match }) => <Reviews id={match.params.id} />}/>

          <Route path="/products/:id" render={({ match }) => <ProductDetail id={match.params.id} />} />

          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/order">
            <OrderDetail />
          </Route>
          <Route path="/pastOrders/:id" render={({match})=> <PastOrderDetail id={match.params.id}/>}/>
            
          <Route path="/pastOrders">
            <PastOrders />
          </Route>

          <Route path="/courses/:id"><NoDisponible/></Route>
          {/* <Route path ="/products/detail" component={ProductDetail}/> */}
          <Route path="/categories/:id" render={({ match }) => <Category id={match.params.id} />} />

          <Route exact path="/adminPanel"><AdminPanel /></Route>
          <Route exact path="/adminPanel/productos"><ProductosAdmin/></Route>
          <Route
            exact
            path="/adminPanel/productos/editarProducto/:id"
            render={({ match }) => <EditarProducto id={match.params.id} />}
          />
          <Route exact path="/adminPanel/usuarios"><UsuariosAdmin /></Route>
          <Route exact path="/adminPanel/ordenes"><OrdenesAdmin /></Route>
          <Route exact path="/adminPanel/categorias"><CategoriasAdmin /></Route>
          <Route
            exact
            path="/adminPanel/usuarios/SingleUsuario/edit/:id"
            render={({ match }) => <EditarUsuario id={match.params.id} />}
          />
          <Route
            exact
            path="/adminPanel/categorias/editar/:id"
            render={({ match }) => <EditarCategoria id={match.params.id} />}
          />
          <Route exact path="/adminPanel/categorias/crear">
            <CrearCategoria />
          </Route>
          
          <Route
            exact
            path="/adminPanel/ordenes/singleOrdenes/:id"
            render={({ match }) => <SingleOrden id={match.params.id} />}
          />
          <Route
            exact
            path="/adminPanel/usuarios/SingleUsuario/:id"
            render={({ match }) => <SingleUsuario id={match.params.id} />}
          />

          
          <Route
            exact
            path="/adminPanel/ordenes/singleOrdenes/editarOrdenes/:id"
            render={({ match }) => <EditarOrdenes id={match.params.id} />}
          />

          <Route exact path="/adminPanel/productos/edit/:id" render={({ match }) => <EditarProducto id={match.params.id} />}/>
          <Route path="/order"><OrderDetail /></Route>
          
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
