import {useReducer, useContext, createContext} from 'react';

const TestContext = createContext();

const placeReducer = (state, action) => {
  switch (action.type) {
    case 'STORE_DETAILS':
      return {...state, details: action.details}
    case 'HIDE':
      return {...state, invisible: true, open: false, openBttn: false}
    case 'TOGGLE_OPEN':
      return {...state, open: !state.open}
    case 'SHOW_OPEN_BTTN':
      return {...state, open: true, openBttn: true, invisible: false}
    default:
      return state
  }
}

const TestProvider = ({children}) => {
  const [place, dispatchPlace] = useReducer(placeReducer, {
    details: {},
    invisible: false,
    open: false,
    openBttn: false,
  })

  return (
    <TestContext.Provider value={{place, dispatchPlace}}>
      {children}
    </TestContext.Provider>
  )
}

export const useTestContext = () => useContext(TestContext)
export default TestProvider
