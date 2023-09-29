
import React, { useState, useEffect } from 'react';
import './App.css';
import { Route, Routes, useLocation } from 'react-router-dom';

// import Header from '../components/Header/Header';
import RoomDecal from '../components/RoomDecal/RoomDecal';

// hooks
import useDimensions from '../hooks/useDimensions';
// import useMultiPlayer from '../hooks/useMultiPlayer';

// sketches
import Agave from '../sketches/Agave/Agave';
import { SketchP } from '../types';

function App() {

  const currentPage = "Agave"; //getRoomTitle(useLocation().pathname);
  const ui = useDimensions();
  const [hasLoadedRoom, setLoadedRoom] = useState(false);

  const [audioOn, setAudioOn] = useState(true);
  // const [setVolume] = useMultiPlayer(audioOn, hasLoadedRoom);


  useEffect(
    () => {
      return () => {
        // pause();
      }
    },
    [ui]
  );


  // if there's a new page, reset the audio
  useEffect(() => {
    // setAudioSource("");
    setLoadedRoom(false);
    // pause();
  },
    [currentPage]
  );


  const sketchProps: SketchP = {
    ui,
    hasLoadedRoom,
    audioOn,
    currentPage
  }


  return (
    <div className="App">
      {/* <Header
        ui={ui}
        currentPage={currentPage}
        isMenuOn={true}
        audioOn={audioOn}
        toggleAudio={() => setAudioOn(v => !v)}
      /> */}

      {/* sketches */}
      <Routes>
        <Route path="/" element={<Agave {...sketchProps} />} />
      </Routes>

      {/* other components */}
      <RoomDecal
        startMedia={() => setLoadedRoom(true)}
        hasLoadedRoom={hasLoadedRoom}
        ui={ui}
        room={currentPage}
      />

    </div>
  );
}


export default App;

