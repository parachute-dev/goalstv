import * as React from 'react'
import logo from '../static/logo.png'
import {version} from "../global.js";
import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'
import SettingsModal from './settings-modal';

const Layout = ({children}) => {

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);

  return (
    <div className="">
      {children}
      <div className="version">{version}</div>
      <SettingsModal/>
    </div>

  )
}
export default Layout
