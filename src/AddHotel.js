import React from 'react'

const AddHotel = () => {
  const addingHotel = () => {
    const newHotels = JSON.parse(localStorage.getItem('hotels'))
    const hotel = {
      id: Date.now(),
      hotel_name: 'Test Hotel',
      hotel_point: 5.0,
      lastRatedDate: Date.now(),
    }
    localStorage.setItem('hotels', JSON.stringify([...newHotels, hotel]))
  }

  return (
    <div>
      <button onClick={addingHotel}>ADD</button>
    </div>
  )
}

export default AddHotel
