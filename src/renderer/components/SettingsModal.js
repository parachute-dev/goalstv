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
      window.location.href = "";

  };

  const handleTournamentChange = (date) => {
    dispatch({type: 'SET_TOURNAMENT_DATE', payload: date});

  };

  const handleKidsPartyChange = (date) => {
    dispatch({type: 'SET_KIDS_DATE', payload: date});

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
      <div className="form-group">
        <div className="row">
          <div className="col-md-12 mb-4">
            <label className="mb-1"><strong>Location:</strong></label>

            <select className="form-control"
              value={state.current_club}
              onChange={(e) => handleClubChange(e.target.value)}>
              {renderClubs()}
            </select>
          </div>

          <div className="col-md-6">
            <label className="mb-1"><strong>Tournament Date:</strong></label>

            <input placeholder="example: 21/08/2024" className="form-control" type="text" value={state.tournament_date}  onChange={(e) => handleTournamentChange(e.target.value)} />

          </div>
          <div className="col-md-6">
            <label className="mb-1"><strong>Kids Party Date:</strong></label>

            <input placeholder="example: 21/08/2024"  className="form-control" type="text" value={state.kids_date}  onChange={(e) => handleKidsPartyChange(e.target.value)} />
          </div>
        </div>
        <div className="row mt-4">
          <p><strong>Version: {version}</strong></p>
        </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}
export default SettingsModal
