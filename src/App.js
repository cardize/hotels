import React, { useState, useMemo } from 'react'
import Pagination from './Pagination'
import data from './data/mock-data.json'
import { useInput } from './hooks/useInput'
import { useLocalStorage } from './hooks/useLocalStorage'
import './app.scss'

let PageSize = 5

localStorage.setItem('hotels', JSON.stringify(data))
const hotels = JSON.parse(window.localStorage.getItem('hotels'))

console.log(hotels)

const removeHotel = (id) => {
  localStorage.removeItem('hotels', JSON.stringifyid(data.id))
}

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return hotels.slice(firstPageIndex, lastPageIndex) // hotels is the data from local storage
  }, [currentPage])

  return (
    <div>
      <div className="main-container">
        <div className="table">
          <div className="sort-container">
            <div className="add-hotel">
              <button>+</button>
              <h2>Otel Ekle</h2>
            </div>
            <div className="sort-container">
              <>SORT</>
            </div>
          </div>
          <div className="hotels-container">
            {currentTableData.map((item) => {
              return (
                <div className="hotels">
                  <button
                    className="remove-icon"
                    onClick={removeHotel}
                  ></button>
                  <div className="defaul-image">
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
                    <div className="button-container">
                      <button className="button">PUAN ARTIR</button>
                      <button className="button">PUAN AZALT</button>
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
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  )
}
