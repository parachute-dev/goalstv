import * as React from 'react'
import logo from '../static/logo.png'
import logomiltonkeynes from '../static/logo-milton-keynes.png'
import backgroundMilton from '../static/background-portrait-milton-keynes.png'

import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'

const Leaderboard = ({type}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);

  var backgroundImage = "background-image:url(static/bg.jpg)";
  const getLogo = () => {
    return <img className='logo' src={logo}/>
  }

  const renderScores = () => {
    if (state.leaderboard != null) {}
  }

  return (
    <div className={`leaderboard-background leaderboard`}>
    </div>

  )
}
export default Leaderboard
