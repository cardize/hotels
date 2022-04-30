import { useState } from 'react'

export const useLocalStorage = (key, INITIAL_VALUE) => {
  const [state, setState] = useState(() => {
    const storage = localStorage.getItem(key) // get the value from local storage
    if (storage) {
      console.log('storage', storage)
      return JSON.parse(storage) // parse the value from local storage
    }
    localStorage.setItem(key, JSON.stringify(INITIAL_VALUE)) // set the value to local storage
    return INITIAL_VALUE // if there is a value, return it, otherwise return the initial value
  })

  const updateStorage = (hotels) => {
    localStorage.setItem(key, JSON.stringify(hotels)) // set the value to local storage as json file (we save it as string)
    setState(hotels)
  }

  return [state, updateStorage]
}
