import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import Popup from 'reactjs-popup'
import {AiOutlineLogout} from 'react-icons/ai'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const {activeTab} = props
  const activeHome = activeTab === 'HOME' ? 'active' : ''
  const activeCart = activeTab === 'CART' ? 'active' : ''

  return (
    <>
      <div className="desktop-container">
        <nav className="header-container">
          <div className="logo-container">
            <Link to="/">
              <img
                className="website-logo"
                src="https://res.cloudinary.com/dqnh9af86/image/upload/v1633077683/Frame_274_bxujyh.png"
                alt="website logo"
              />
            </Link>
            <Link to="/" className="link-head">
              Tasty Kitchens
            </Link>
          </div>
          <ul className="nav-menu">
            <Link to="/" className={`nav-link ${activeHome}`}>
              <li>Home</li>
            </Link>
            <Link to="/cart" className={`nav-link ${activeCart}`}>
              <li>Cart</li>
            </Link>
            <Popup
              modal
              trigger={
                <button
                  type="button"
                  className="logout-desktop-btn"
                  testid="logout-button"
                >
                  Logout
                </button>
              }
            >
              {close => (
                <div className="logout-asking">
                  <h1 className="asking-head">
                    Are you sure you want to logout?
                  </h1>
                  <div className="buttons-container">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="confirm-button"
                      onClick={onClickLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </ul>
        </nav>
      </div>
      <div className="mobile-container">
        <nav className="header-container-mobile">
          <div className="logo-container">
            <img
              className="header-logo"
              alt="website logo"
              src="https://res.cloudinary.com/dqnh9af86/image/upload/v1633077683/Frame_274_bxujyh.png"
            />
            <h1 className="website-header-head">Tasty Kitchens</h1>
          </div>
          <ul className="links-container">
            <Link to="/" className={`nav-link ${activeHome}`}>
              <li>Home</li>
            </Link>
            <Link to="/cart" className={`nav-link ${activeCart}`}>
              <li>Cart</li>
            </Link>
            <Popup
              modal
              trigger={
                <button
                  type="button"
                  className="logout-button-mobile"
                  testid="logout-button"
                >
                  <AiOutlineLogout size="10" />
                </button>
              }
            >
              {close => (
                <div className="logout-asking">
                  <h1 className="asking-head">
                    Are you sure you want to logout?
                  </h1>
                  <div className="buttons-container">
                    <button
                      type="button"
                      className="cancel-button"
                      onClick={() => close()}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="confirm-button"
                      onClick={onClickLogout}
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </ul>
        </nav>
      </div>
    </>
  )
}
export default withRouter(Header)
