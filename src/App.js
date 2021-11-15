import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import Dashbaord from "./component/Dashboard/Dashboard";
import Header from "./component/Header/Header";
import Home from './component/Home/Home';
import Login from './component/Login/Login';
import PrivateRoute from './component/Login/PrivateRoute/PrivateRoute';
import Register from "./component/Login/Register";
import NotFound from "./component/NotFound/NotFound";
import ProductDetail from "./component/ProductDetails/ProductDetail";
import Products from "./component/Products/Products";
import AuthProvider from './context/AuthProvider';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          {/*  <Header></Header> */}
          <Switch>
            <Route exact path="/">
              <Home></Home>
            </Route>
            <Route path="/home">
              <Home></Home>
            </Route>
            <Route path="/login">
              <Login></Login>
            </Route>
            <Route path="/register">
              <Register></Register>
            </Route>
            <PrivateRoute path="/products">
              <Products></Products>
            </PrivateRoute>
            <PrivateRoute path="/product/:id">
              <ProductDetail></ProductDetail>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
              <Dashbaord></Dashbaord>
            </PrivateRoute>
            <Route path="/contact">
            </Route>
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>

        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
