import * as React from 'react'


import {GlobalDispatchContext, GlobalStateContext} from '../../context/GlobalContextProvider'

const Leaderboard = ({type}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);

  var backgroundImage = "background-image:url(/static/bg.jpg)";

  const renderScores = () => {
    if (state.leaderboard != null) {}
  }

  return (
    <div className={`leaderboard-background leaderboard`}>
    </div>

  )
}
export default Leaderboard
