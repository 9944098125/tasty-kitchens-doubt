import {
  AiFillInstagram,
  AiFillTwitterSquare,
  AiFillFacebook,
} from 'react-icons/ai'
import {FaPinterestSquare} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <>
      <div className="footer-container">
        <div className="first-row">
          <img
            src="https://res.cloudinary.com/dqnh9af86/image/upload/v1633077683/Frame_274_bxujyh.png"
            alt="website-footer-logo"
            className="footer-logo"
          />
          <h1 className="footer-head">Tasty Kitchens</h1>
        </div>
        <div className="second-row">
          <p className="footer-para">
            The only thing we are serious about is food
          </p>
        </div>
        <div className="third-row">
          <FaPinterestSquare size="25" color="#ffffff" margin="20" />
          <AiFillInstagram size="25" color="#ffffff" margin="20" />
          <AiFillTwitterSquare size="25" color="#ffffff" margin="20" />
          <AiFillFacebook size="25" color="#ffffff" margin="20" />
        </div>
      </div>
    </>
  )
}
