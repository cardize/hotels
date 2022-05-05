import React from 'react'
import { useState } from 'react'

const AddHotel = () => {
  const [hotelName, setHotelName] = useState('')
  const [isAdded, setIsAdded] = useState(false)

  const addingHotel = () => {
    setHotelName(hotelName)
    const newHotels = JSON.parse(localStorage.getItem('hotels'))
    const hotel = {
      id: Date.now(),
      hotel_name: hotelName,
      hotel_point: 5.0,
      lastRatedDate: Date.now(),
    }

    if (hotelName !== '') {
      localStorage.setItem('hotels', JSON.stringify([...newHotels, hotel]))
      setIsAdded(true)
    } else {
      return alert('Otel ismi boş olamaz')
    }
  }

  return (
    <div>
      <div className="main-container">
        <div className="add-container">
          <div className="add-hotel-title">Otel Adı</div>
          <input
            className="add-input"
            type="text"
            defaultValue={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            onInput={() => setIsAdded(false)}
          />
          <button
            className="add-button"
            onClick={() => addingHotel(hotelName)}
            disabled={isAdded}
            style={{
              cursor: isAdded ? '' : 'pointer',
              backgroundColor: isAdded
                ? 'rgb(59, 212, 36)'
                : 'rgb(48, 94, 202)',
            }}
          >
            {isAdded ? '✓ EKLENDİ' : 'EKLE'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default AddHotel
