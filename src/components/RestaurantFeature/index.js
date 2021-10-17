import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaStar, FaRupeeSign} from 'react-icons/fa'

import Header from '../Header'
import Footer from '../Footer'
import FoodItem from '../FoodItem'

import './index.css'

class RestaurantFeature extends Component {
  state = {
    restaurantData: {},
    foodItemsList: [],
    isLoading: false,
  }

  componentDidMount = () => {
    this.getRestaurantFeatures()
  }

  getRestaurantFeatures = async () => {
    this.setState({
      isLoading: true,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const specificRestUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(specificRestUrl, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        costForTwo: data.cost_for_two,
        cuisine: data.cuisine,
        foodItems: data.food_items,
        id: data.id,
        imageUrl: data.image_url,
        itemsCount: data.items_count,
        location: data.location,
        name: data.name,
        opensAt: data.opens_at,
        rating: data.rating,
        reviewsCount: data.reviews_count,
      }
      const updatedFoodItems = data.food_items.map(eachFoodItem => ({
        cost: eachFoodItem.cost,
        foodType: eachFoodItem.food_type,
        id: eachFoodItem.id,
        imageUrl: eachFoodItem.image_url,
        name: eachFoodItem.name,
        rating: eachFoodItem.rating,
      }))
      this.setState({
        restaurantData: updatedData,
        foodItemsList: updatedFoodItems,
        isLoading: false,
      })
    }
  }

  renderLoadingView = () => (
    <div testid="restaurants-details-loader" className="carousel-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {restaurantData, foodItemsList, isLoading} = this.state
    const {
      name,
      costForTwo,
      cuisine,
      imageUrl,
      location,
      rating,
      reviewsCount,
    } = restaurantData
    return (
      <>
        <Header activeTab="HOME" />
        {isLoading ? (
          this.renderLoadingView()
        ) : (
          <div className="sr-container">
            <div className="restaurant-details-container">
              <div className="small-div">
                <img
                  src={imageUrl}
                  alt="restaurant"
                  className="single-restaurant"
                />
                <div className="rd-text-container">
                  <h1 className="r-name">{name}</h1>
                  <p className="item">{cuisine}</p>
                  <p className="location">{location}</p>
                  <div className="ratings-row">
                    <div className="align-col">
                      <p className="ratings">
                        <FaStar size="15" /> {rating}
                      </p>
                      <p className="reviews-count">{reviewsCount}+Rating</p>
                    </div>
                    <hr className="hr-line" />
                    <div className="align-col">
                      <p className="ratings">
                        <FaRupeeSign size="15" /> {costForTwo}
                      </p>
                      <p className="reviews-count">Cost for two</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="food-items-list">
              {foodItemsList.map(each => (
                <FoodItem foodItemDetails={each} key={each.id} />
              ))}
            </ul>
          </div>
        )}
        <Footer />
      </>
    )
  }
}

export default RestaurantFeature
