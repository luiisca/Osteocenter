import {Fragment, useState} from 'react'
import logo from './logo.svg'
import './App.css'
import Header from './containers/header'
import Main from './containers/main'
import Footer from './containers/footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Fragment>
      <Header />
      <Main />
      <Footer />
    </Fragment>
  )
}

export default App
