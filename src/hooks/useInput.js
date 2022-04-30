import { useState, useEffect } from 'react'
import { useLocalStorage } from './useLocalStorage'

export const useInput = (key, INITIAL_VALUE) => {
  const [hotels, updateStorage] = useLocalStorage(key, INITIAL_VALUE)
  const [inputs, setInputs] = useState(hotels)
  useEffect(() => {
    updateStorage(inputs)
  }, [inputs])

  const handleChange = (hotelName) => {
    const hotel = {
      id: hotelName.length + 1,
      hotel_name: hotelName,
      hotel_point: 5.0,
    }
    setInputs({ ...hotels, [hotel.id]: hotel })
  }

  return [inputs, handleChange]
}
