import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Cart from './components/Cart'
import Payment from './components/Payment'
import NotFound from './components/NotFound'
import RestaurantFeature from './components/RestaurantFeature'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

const getCartListFromLocalStorage = () => {
  const stringifiedCartList = localStorage.getItem('cartData')
  const parsedCartList = JSON.parse(stringifiedCartList)
  if (parsedCartList === null) {
    return [] /* if the cart list is null return null list */
  }
  return parsedCartList
}

class App extends Component {
  state = {
    cartList: getCartListFromLocalStorage(),
    /* taking the cart list in the local storage as state */
  }

  addCartItem = foodItem => {
    const {cartList} = this.state
    const foodObject = cartList.find(
      eachCartItem => eachCartItem.id === foodItem.id,
      /* if the item already in the cart's id is equal to the id of the item newly added */
    )
    if (foodObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (foodObject.id === eachCartItem.id) {
            const updatedQuantity = foodItem.quantity
            /* updating the quantity of the item being added to cart */
            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, foodItem]
      this.setState({cartList: updatedCartList})
    }
  }

  /* deleting an item in cart */
  deleteCartItem = id => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachCartItem => eachCartItem.id !== id,
    )
    this.setState({cartList: updatedCartList})
  }

  /* adding  quantity to the cart */
  addQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(eachCartItem => {
        if (id === eachCartItem.id) {
          const updatedQuantity = eachCartItem.quantity + 1
          return {...eachCartItem, quantity: updatedQuantity}
        }
        return eachCartItem
      }),
    }))
  }

  /* decreasing the quantity from cart */
  decreaseQuantity = id => {
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity - 1
            return {...eachCartItem, quantity: updatedQuantity}
          }
          return eachCartItem
        }),
      }))
    } else {
      this.deleteCartItem(id)
    }
  }

  render() {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
    /* setting cart list as cart data */
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            addQuantity: this.addQuantity,
            decreaseQuantity: this.decreaseQuantity,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute
              exact
              path="/restaurant/:id"
              component={RestaurantFeature}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/payment" component={Payment} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
