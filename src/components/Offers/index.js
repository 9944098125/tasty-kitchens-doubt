import {Component} from 'react'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import Loader from 'react-loader-spinner'

import './index.css'

class Offers extends Component {
  state = {
    offers: [],
    isLoading: false,
  }

  componentDidMount = () => {
    this.getOffers()
  }

  getOffers = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const offersUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(offersUrl, options)
    const data = await response.json()
    const offersData = data.offers.map(eachOffer => ({
      id: eachOffer.id,
      imageUrl: eachOffer.image_url,
    }))
    this.setState({
      offers: offersData,
      isLoading: false,
    })
  }

  renderOffersImages = () => {
    const {offers} = this.state
    const settings = {
      dots: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }

    return (
      <ul className="offers-carousel-container">
        <Slider {...settings}>
          {offers.map(each => (
            <li key={each.id}>
              <img src={each.imageUrl} alt="offer" className="offer-image" />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  renderLoader = () => (
    <div testid="restaurants-offers-loader" className="carousel-loader">
      <Loader type="TailSpin" color="#F7931E" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return isLoading ? this.renderLoader() : this.renderOffersImages()
  }
}

export default Offers
