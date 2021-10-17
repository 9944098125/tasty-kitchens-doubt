import {BsFilterLeft} from 'react-icons/bs'

import {HiLocationMarker} from 'react-icons/hi'

import './index.css'

export default function HomeHeader(props) {
  const {
    sortByOptions,
    selectedSortByOption,
    updateSelectedSortByOption,
    onChangeSearchInput,
  } = props
  const onChangeSortByOption = event => {
    updateSelectedSortByOption(event.target.value)
  }

  const onEnterSearchInput = event => {
    onChangeSearchInput(event.target.value)
  }

  return (
    <>
      <div className="home-header-desktop-container">
        <div className="place-search-container">
          <div className="place-selector-container">
            <HiLocationMarker size="20" color="red" />
            <select className="places">
              <option value="kakinada">Kakinada</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Rajuhmandry">Rajuhmandry</option>
              <option value="vizag">Vizag</option>
            </select>
          </div>
          <div className="search-container">
            <input
              className="search-input"
              type="search"
              placeholder="Search a restaurant or dish"
              onChange={onEnterSearchInput}
            />
          </div>
        </div>
        <div className="popular-heading-sortBy">
          <div>
            <h1 className="popular-heading">Popular Restaurants</h1>
            <p className="popular-desc">
              Select your favourite restaurant dish and make your day happy...
            </p>
          </div>
          <div className="sortBy-container">
            <BsFilterLeft size="20" />
            <p className="sort-option">sort by {selectedSortByOption}</p>
            <select
              className="sort-by-options"
              value={selectedSortByOption}
              onChange={onChangeSortByOption}
            >
              {sortByOptions.map(eachOption => (
                <option key={eachOption.id} value={eachOption.value}>
                  {eachOption.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  )
}
