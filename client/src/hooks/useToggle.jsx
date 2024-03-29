import React, { useState } from 'react'

const useToggle = ({intialvalue}) => {
    const[state, setState] = useState(intialvalue)

    const toggle = () => {
        setState((prev) => !prev)
    }
  return {
    state,
    setState,
    toggle
  }
}

export default useToggle
