import React, { Fragment, useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Music from './music';
import { Button, Columns } from 'react-bulma-components';


const PlaysequenceButton = styled(Button)`
  margin-bottom: 30px;
`

const Musics = (props) => {
  const [songs, setSongs] = useState([]);
  const [playing, setPlaying] = useState([]);
  const AudioRef = useRef();
  const [playRandom, setPlayRandom] = useState(false);

  const NextSong = () => {
    if(playRandom) {
      let index = Math.floor(Math.random() * props.songs.length);
      setPlaying(props.songs[index]);
    } else
      setPlaying([]);
  }

  const SwitchRandom = () => {
    if(playRandom) {
      setPlayRandom(false);
      setPlaying([]);
    } else
      setPlayRandom(true);
  }

  useEffect(() => {
    if(playRandom)
      NextSong();
  }, [playRandom]);

  useEffect(() => {
    if (AudioRef.current !== null) {
      AudioRef.current.pause();
      AudioRef.current.load();
      if(playing.id) {
        AudioRef.current.play();
      }
    }
  }, [playing]);


  useEffect(() => {
    setSongs(props.songs.map((song, key) =>
      <Music
        song={song}
        playing={playing.id == song.id}
        setPlaying={setPlaying}
        key={key}
        />
      ));
  }, [props.songs, playing]);



  return (
    <Fragment>
      <Columns className='is-mobile is-centered'>
        <Columns.Column desktop={{size: 2}} mobile={{size: 12}} className='has-text-centered'>
          <PlaysequenceButton
            className='is-medium'
            color='info'
            outlined
            onClick={() => SwitchRandom()}>
            {playRandom ? 'parar de tocar' : 'Tocar Aleatoriamente'}
          </PlaysequenceButton>
          <audio controls ref={AudioRef} onEnded={() => NextSong()} className='is-hidden'>
            <source src={playing.file_url}/>
          </audio>
        </Columns.Column>
      </Columns>
      {songs}
    </Fragment>
  );
}
export default Musics;
