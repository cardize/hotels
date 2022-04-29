import React, { useState, useMemo } from 'react'
import Pagination from './Pagination'
import data from './data/mock-data.json'
import './style.scss'

let PageSize = 5

export default function App() {
  const [currentPage, setCurrentPage] = useState(1)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize
    const lastPageIndex = firstPageIndex + PageSize
    return data.slice(firstPageIndex, lastPageIndex)
  }, [currentPage])

  return (
    <div>
      <div className="main-container">
        <div className="table">
          <div className="sort-container">
            <div className="sort-container">
              <>SORT</>
            </div>
          </div>
          <div className="hotels-container">
            {currentTableData.map((item) => {
              return (
                <div className="hotels" key={item.id}>
                  <div className="defaul-image">
                    <img
                      src="https://i.pinimg.com/564x/d3/9d/5d/d39d5dee8e4ef35e6068304b8433a9d5.jpg"
                      alt=""
                    />
                  </div>
                  <div clasname="info-container">
                    <div className="hotel-info">
                      <h2 className="hotel-name">{item.first_name}</h2>
                      <h2 className="hotel-point">{item.last_name}</h2>
                    </div>
                    <div className="button-container">
                      <button className="button">Puan Artır</button>
                      <button className="button">Puan Azalt</button>
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
