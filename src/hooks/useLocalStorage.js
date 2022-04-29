import { useState } from 'react'

export const useLocalStorage = (key, INITIAL_VALUE) => {
  const [state, setState] = useState(() => {
    const storage = localStorage.getItem(key) // get the value from local storage
    return storage ? JSON.parse(storage) : INITIAL_VALUE // if there is a value, return it, otherwise return the initial value
  })

  const updateStorage = (value) => {
    localStorage.setItem(key, JSON.stringify(value)) // set the value to local storage as json file (we save it as string)
    setState(value)
  }

  return [state, updateStorage]
}
