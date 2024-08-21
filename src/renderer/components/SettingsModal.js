import React, {useState, useEffect, useRef} from 'react';
import logo from '../static/logo.png'
import {version} from '../global.js'

import {GlobalDispatchContext, GlobalStateContext} from '../context/GlobalContextProvider'
import {Modal, Button} from 'react-bootstrap';
import useKonami from 'use-konami';

const SettingsModal = ({}) => {
  useKonami({
    onUnlock: () => setShow(true),
    sequence: ['g', '0', 'a', 'l', 'z']
  });

  const [show,
    setShow] = useState(false);
  const handleClose = (index) => {
    setShow(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  const handleClubChange = (club) => {

    dispatch({type: 'SET_CURRENT_CLUB', payload: club});
    window
      .electron
      .store
      .set('CLUB', club);

  };

  const renderClubs = () => {
    if (state.clubs != null) {
      return (state.clubs.map((club, index) => (
        <option key={club.id} value={club.id}>
          {club.name}
        </option>
      )));
    }
  }

  const dispatch = React.useContext(GlobalDispatchContext);
  const state = React.useContext(GlobalStateContext);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Change Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className="col-md-12">
            <label>Location:</label>
            <br></br>
            <select
              value={state.current_club}
              onChange={(e) => handleClubChange(e.target.value)}>
              {renderClubs()}
            </select>
          </div>
        </div>
        <div className="row">
          <p>Version: {version}</p>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default SettingsModal
