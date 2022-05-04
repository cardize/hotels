import React, { useState, useEffect, useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import Pagination from './Pagination'
import data from './data/mock-data.json'
import './styles.scss'

let PageSize = 5

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)

  let localHotels = JSON.parse(localStorage.getItem('hotels'))
  if (!localHotels) {
    localStorage.setItem('hotels', JSON.stringify(data))
    localHotels = data
  }

  const [hotels, setHotels] = useState(localHotels)

  useEffect(() => {
    localStorage.setItem('hotels', JSON.stringify(hotels))
  }, [hotels])

  const increasePoint = (id) => {
    const hotel = hotels.find((hotel) => hotel.id === id)
    if (hotel.hotel_point < 9.8 && hotel.hotel_point > 0.9) {
      hotel.hotel_point = (hotel.hotel_point * 10 + 1) / 10
      hotel.lastRatedDate = Date.now()
      setHotels([...hotels])
    }
  }

  const decreasePoint = (id) => {
    const hotel = hotels.find((hotel) => hotel.id === id)
    if (hotel.hotel_point < 10 && hotel.hotel_point > 1.2) {
      hotel.hotel_point = (hotel.hotel_point * 10 - 1) / 10
      hotel.lastRatedDate = Date.now()
      setHotels([...hotels])
    }
  }

  const removeHotel = (id) => {
    const newHotels = hotels.filter((hotel) => hotel.id !== id)
    setHotels(newHotels)
  }

  const descendingHotels = useMemo(() => {
    return hotels.sort(
      (a, b) => b.id - a.id || b.lastRatedDate - a.lastRatedDate,
    )
  }, [hotels])

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return descendingHotels.slice(firstPageIndex, lastPageIndex) // hotels is the data from local storage
  }, [descendingHotels, currentPage])

  return (
    <div>
      <div className="main-container">
        <div className="add-hotel">
          <NavLink className="link" to="/addhotel">
            <button className="plus-button" type="button">
              +
            </button>
          </NavLink>
          <h2>OTEL EKLE</h2>
        </div>
        <div className="sort-hotel">
          <div className="select-box">
            <div className="select-box__current" tabIndex="1">
              <div className="select-box__value">
                <input
                  className="select-box__input"
                  type="radio"
                  id="0"
                  value="1"
                  name="Cardize"
                  defaultChecked="defaulChecked"
                />
                <p className="select-box__input-text">⇅ Sıralama</p>
              </div>
              <div className="select-box__value">
                <input
                  className="select-box__input"
                  type="radio"
                  id="1"
                  value="2"
                  name="Cardize"
                />
                <p className="select-box__input-text">Artan (Puan)</p>
              </div>
              <div className="select-box__value">
                <input
                  className="select-box__input"
                  type="radio"
                  id="2"
                  value="3"
                  name="Cardize"
                />
                <p className="select-box__input-text">Azalan (Puan)</p>
              </div>
              <img
                className="select-box__icon"
                src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                alt="Arrow Icon"
                aria-hidden="true"
              />
            </div>
            <ul className="select-box__list">
              <li>
                <label
                  className="select-box__option"
                  htmlFor="1"
                  aria-hidden="aria-hidden"
                >
                  Artan (Puan)
                </label>
              </li>
              <li>
                <label
                  className="select-box__option"
                  htmlFor="2"
                  aria-hidden="aria-hidden"
                >
                  Azalan (Puan)
                </label>
              </li>
            </ul>
          </div>
        </div>
        <div className="table">
          <div className="hotels-container">
            {currentTableData.map((item) => {
              return (
                <div className="hotels" key={item.id}>
                  <div className="defaul-image">
                    <div className="remove-container">
                      <button
                        className="remove-button"
                        onClick={() => removeHotel(item.id)}
                      >
                        +
                      </button>
                      <div className="popup-container">
                        <div className="confirmation-title">Oteli Sil </div>
                        <div className="confirmation-text">
                          <strong>{item.hotel_name}</strong>'i silmek
                          istediğinizden <br /> emin misiniz?
                        </div>
                        <div className="button-container">
                          <button className="delete-button">OTELİ SİL</button>
                          <button className="cancel-button">VAZGEÇ</button>
                        </div>
                      </div>
                    </div>
                    <img
                      src="https://i.pinimg.com/564x/d3/9d/5d/d39d5dee8e4ef35e6068304b8433a9d5.jpg"
                      alt=""
                    />
                  </div>
                  <div clasname="info-container">
                    <div className="hotel-info">
                      <h3 className="hotel-name">{item.hotel_name}</h3>
                      <h3 className="hotel-point">{item.hotel_point} Puan</h3>
                    </div>
                    <div className="hotel-point-container">
                      <button
                        className="button"
                        onClick={() => increasePoint(item.id)}
                      >
                        PUAN ARTIR
                      </button>
                      <button
                        className="button"
                        onClick={() => decreasePoint(item.id)}
                      >
                        PUAN AZALT
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <Pagination
          className="pagination-bar"
          currentPage={currentPage}
          totalCount={descendingHotels.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}
