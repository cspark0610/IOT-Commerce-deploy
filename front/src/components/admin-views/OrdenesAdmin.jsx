import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Table from "react-bootstrap/Table";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {getOrders, onlyOne} from "../../state/allorders"
import { useDispatch } from "react-redux";
import axios from "axios";


const OrdenesAdmin = () => {
  const user= useSelector(state=>state.user)
  const dispatch = useDispatch();
  const history= useHistory()
  React.useEffect(()=>{
dispatch(getOrders())
  },[])
  const orders = useSelector((state) => state.allOrders);
  /* console.log("usuarios todos ", users) */

  
  const getOrder= (id)=>{
    
    return axios.get(`/api/orders/admin/${id}`)
            .then(({data})=> dispatch(onlyOne(data))).then(()=>history.push(`/adminPanel/ordenes/singleOrdenes/${id}`))
  }
  console.log("Orders ",orders)

  return (
    <div>    
      {user.isAdmin ?     
      <div>   
      <div>        
        <Navbar collapseOnSelect expand="lg" className="bg-dark" variant="dark">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link
                href="/adminPanel/usuarios"
                className=" mx-5 text-light"
              >
                Usuarios
              </Nav.Link>
              <Nav.Link
                href="/adminPanel/productos"
                className="mx-5 text-light"
              >
                Productos
              </Nav.Link>

              <Nav.Link href="/adminPanel/categorias" className=" mx-5 text-light">
              Categorias
            </Nav.Link>

              <Nav.Link href="/adminPanel/ordenes" className="mx-5  text-dark btn btn-large bg-warning ">
                Órdenes
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Navbar.Brand href="/adminPanel" className="text-warning">
            Panel Administrador
          </Navbar.Brand>
        </Navbar>
      </div> 
      

      <div>           
        <div className="row no-gutters">
          <div className="h3 p-5">Administración de ordenes:</div>
      </div>
       
     
       

       <div className="text-center p-2">
        <div>
          <div>
            <Table responsive>
              <Table striped bordered hover size="sm">
                <thead>
                  
                  <tr>
                    <th>#Orden</th>
                    <th>First, Lastname</th>
                    <th>Username</th>
                    <th>Order Status</th>                   
                  </tr>
                </thead>
      
                {orders.length>0 &&  orders.map((order) => (
                  
                  <tbody>
                  {order.orderStatus.statusType =="Pago confirmado"? // comienza ternario
                  
                   <tr>
                     <td onClick={()=>getOrder(order.id)}>{order.id}</td>
                     
                      
                    <td>{order.user.fullName}</td>
                        <Link to={`/adminPanel/usuarios/SingleUsuario/${order.user.id}`}><td>{order.user.email}</td> </Link>
                      <td style = {{backgroundColor:"green"}}>{order.orderStatus.statusType}</td>                   
                    </tr>: 

                    order.orderStatus.statusType =="Cancelado"? // comienza segundo ternario
                  
                   <tr>
                     <td onClick={()=>getOrder(order.id)}>{order.id}</td>
                      
                     <td>{order.user.fullName}</td>
                     <Link to={`/adminPanel/usuarios/SingleUsuario/${order.user.id}`}><td>{order.user.email}</td> </Link>
                      <td style = {{backgroundColor:"orange"}}>{order.orderStatus.statusType}</td>                   
                    </tr>
                    :
                    order.orderStatus.statusType =="Iniciado"? // comienza tercer ternario
                  
                  <tr>
                   <td onClick={()=>getOrder(order.id)} >{order.id}</td>
                     
                    <td>{order.user.fullName}</td>
                    <Link to={`/adminPanel/usuarios/SingleUsuario/${order.user.id}`}><td>{order.user.email}</td> </Link>
                     <td style = {{backgroundColor:"blue"}}>{order.orderStatus.statusType}</td>                   
                   </tr>
                   :

                   order.orderStatus.statusType =="Pendiente"? // comienza tercer ternario
                  
                  <tr>
                    <td onClick={()=>getOrder(order.id)}>{order.id}</td>
                     
                    <td>{order.user.fullName}</td>
                    <Link to={`/adminPanel/usuarios/SingleUsuario/${order.user.id}`}><td>{order.user.email}</td> </Link>
                     <td style = {{backgroundColor:"rgb(201, 76, 76)"}}>{order.orderStatus.statusType}</td>                   
                   </tr>
                   :

                    <tr>
                    <td onClick={()=>getOrder(order.id)}>{order.id}</td>
                      
                      <td>{order.user.fullName}</td>
                      <Link to={`/adminPanel/usuarios/SingleUsuario/${order.user.id}`}><td>{order.user.email}</td> </Link>
                      <td style = {{backgroundColor:"red"}}>{order.orderStatus.statusType}</td>
                      {/* <Link > <td>{user.email}</td> </Link> */}
                    </tr>}
                   
                    
                  </tbody>
                  
                ))}
              </Table>
            </Table>
          </div>
        </div>

       
      </div>
    </div>
    </div>
    : <h1 style={{textAlign:'center', marginTop:'15px'}}>Debes ser administrador para ver esta pagina</h1>}
    </div>
  );
};

export default OrdenesAdmin;