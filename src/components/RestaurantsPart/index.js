import {RiArrowDropLeftLine, RiArrowDropRightLine} from 'react-icons/ri'

import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import HomeHeader from '../HomeHeader'
import RestaurantItem from '../RestaurantItem'

import './index.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class RestaurantsPart extends Component {
  state = {
    restaurantsList: [],
    isLoading: false,
    selectedSortByOption: sortByOptions[0].value,
    activePage: 1,
    searchInput: '',
  }

  componentDidMount = () => {
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {selectedSortByOption, activePage} = this.state
    const limit = 9
    const offset = (activePage - 1) * limit
    const restaurantsUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${selectedSortByOption}`

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(restaurantsUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updatedData = fetchedData.restaurants.map(restaurant => ({
        costForTwo: restaurant.cost_for_two,
        cuisine: restaurant.cuisine,
        groupByTime: restaurant.group_by_time,
        hasOnlineDelivery: restaurant.has_online_delivery,
        hasTableBooking: restaurant.has_table_booking,
        id: restaurant.id,
        imageUrl: restaurant.image_url,
        isDeliveringNow: restaurant.is_delivering_now,
        location: restaurant.location,
        menuType: restaurant.menu_type,
        name: restaurant.name,
        opensAt: restaurant.opens_at,
        userRating: restaurant.user_rating,
      }))
      this.setState({
        restaurantsList: updatedData,
        isLoading: false,
      })
    }
  }

  updateSelectedSortByOption = selectedSortByOption => {
    this.setState({selectedSortByOption}, this.getRestaurantsList)
  }

  onClickLeftArrow = () => {
    const {activePage} = this.state
    if (activePage > 1) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage - 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onClickRightArrow = () => {
    const {activePage} = this.state
    if (activePage <= 5) {
      this.setState(
        prevState => ({
          activePage: prevState.activePage + 1,
        }),
        this.getRestaurantsList,
      )
    }
  }

  onChangeSearchInput = input => {
    this.setState({
      searchInput: input,
    })
  }

  renderRestaurants = () => {
    const {
      restaurantsList,
      selectedSortByOption,
      activePage,
      searchInput,
    } = this.state
    const updatedList = restaurantsList.filter(each =>
      each.name.toLowerCase().includes(searchInput.toLowerCase()),
    )

    return (
      <>
        <HomeHeader
          sortByOptions={sortByOptions}
          selectedSortByOption={selectedSortByOption}
          updateSelectedSortByOption={this.updateSelectedSortByOption}
          onChangeSearchInput={this.onChangeSearchInput}
        />

        <hr className="hr-line" />

        {updatedList.length === 0 ? (
          <div className="empty-container">
            <h1 className="no-rest-msg">No Restaurants Found</h1>
          </div>
        ) : (
          <>
            <ul className="restaurants-list">
              {updatedList.map(each => (
                <RestaurantItem restaurantData={each} key={each.id} />
              ))}
            </ul>
            <div className="pagination">
              <button
                testid="pagination-left-button"
                className="button"
                type="button"
                onClick={this.onClickLeftArrow}
              >
                <RiArrowDropLeftLine className="arrow" />
              </button>
              <h1 testid="active-page-number" className="page-numbers">
                {activePage}... of 20
              </h1>
              <button
                testid="pagination-right-button"
                className="button"
                type="button"
                onClick={this.onClickRightArrow}
              >
                <RiArrowDropRightLine className="arrow" />
              </button>
            </div>
          </>
        )}
      </>
    )
  }

  renderLoader = () => (
    <div testid="restaurants-list-loader" className="carousel-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderRestaurants()
  }
}

export default RestaurantsPart
