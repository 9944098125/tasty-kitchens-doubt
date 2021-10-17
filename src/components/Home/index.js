import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import Header from '../Header'
import Offers from '../Offers'
import RestaurantsPart from '../RestaurantsPart'
import Footer from '../Footer'
import './index.css'

export default function Home() {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header activeTab="HOME" />
      <Offers />
      <RestaurantsPart />
      <Footer />
    </>
  )
}
