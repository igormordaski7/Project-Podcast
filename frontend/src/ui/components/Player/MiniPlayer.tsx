import React, { useState, useRef, useEffect } from 'react';
import { useCurrentPodcast } from '../../../hooks/useCurrentPodcast';
import './MiniPlayer.css';

const MiniPlayer: React.FC = () => {
  const { currentPodcast } = useCurrentPodcast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVolumeOpen, setIsVolumeOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('0:00');
  const [totalTime, setTotalTime] = useState('0:00');
  
  const audioRef = useRef<HTMLAudioElement>(null);

  // Atualizar a fonte do áudio quando o podcast mudar
  useEffect(() => {
    if (currentPodcast && audioRef.current) {
      // Garantir que audioUrl é uma string válida
      const audioUrl = currentPodcast.audioUrl || '';
      audioRef.current.src = audioUrl;
      audioRef.current.load();
      setIsPlaying(false);
      setCurrentTime('0:00');
      setTotalTime('0:00');
    }
  }, [currentPodcast]);

  const togglePlayPause = () => {
    if (audioRef.current && currentPodcast) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Erro ao reproduzir áudio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleVolume = () => {
    setIsVolumeOpen(!isVolumeOpen);
  };

  // Atualizar o tempo do áudio
  const updateTime = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration || 0;
      setCurrentTime(formatTime(current));
      setTotalTime(formatTime(duration));
    }
  };

  // Função para formatar tempo
  const formatTime = (seconds: number): string => {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Se não há podcast selecionado, mostrar player desativado
  if (!currentPodcast) {
    return (
      <div className="audio green-audio-player disabled">
        <div className="play-pause-btn disabled">
          <svg viewBox="0 0 18 24" height="24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 12L0 24V0" fillRule="evenodd" fill="#cccccc"></path>
          </svg>
        </div>
        <div className="controls">
          <span className="current-time">0:00</span>
          <div data-direction="horizontal" className="slider">
            <div className="progress disabled">
              <div className="pin"></div>
            </div>
          </div>
          <span className="total-time">0:00</span>
        </div>
        <div className="volume">
          <div className="volume-btn disabled">
            <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z" fillRule="evenodd" fill="#cccccc"></path>
            </svg>
          </div>
        </div>
        <p className="no-podcast-message">Selecione um podcast</p>
      </div>
    );
  }

  return (
    <div className="audio green-audio-player">
      <div className="play-pause-btn" onClick={togglePlayPause}>
        <svg viewBox="0 0 18 24" height="24" width="18" xmlns="http://www.w3.org/2000/svg">
          <path 
            id="playPause" 
            className="play-pause-icon" 
            d={isPlaying ? "M0 0h6v24H0zM12 0h6v24h-6z" : "M18 12L0 24V0"} 
            fillRule="evenodd" 
            fill="#566574"
          ></path>
        </svg>
      </div>

      <div className="controls">
        <span className="current-time">{currentTime}</span>
        <div data-direction="horizontal" className="slider">
          <div className="progress">
            <div data-method="rewind" id="progress-pin" className="pin"></div>
          </div>
        </div>
        <span className="total-time">{totalTime}</span>
      </div>

      <div className="volume">
        <div className="volume-btn" onClick={toggleVolume}>
          <svg viewBox="0 0 24 24" height="24" width="24" xmlns="http://www.w3.org/2000/svg">
            <path 
              id="speaker" 
              d="M14.667 0v2.747c3.853 1.146 6.666 4.72 6.666 8.946 0 4.227-2.813 7.787-6.666 8.934v2.76C20 22.173 24 17.4 24 11.693 24 5.987 20 1.213 14.667 0zM18 11.693c0-2.36-1.333-4.386-3.333-5.373v10.707c2-.947 3.333-2.987 3.333-5.334zm-18-4v8h5.333L12 22.36V1.027L5.333 7.693H0z" 
              fillRule="evenodd" 
              fill="#566574"
            ></path>
          </svg>
        </div>
        <div className={`volume-controls ${isVolumeOpen ? '' : 'hidden'}`}>
          <div data-direction="vertical" className="slider">
            <div className="progress">
              <div data-method="changeVolume" id="volume-pin" className="pin"></div>
            </div>
          </div>
        </div>
      </div>

      <audio 
        ref={audioRef} 
        crossOrigin="anonymous"
        onTimeUpdate={updateTime}
        onLoadedMetadata={updateTime}
        onEnded={() => setIsPlaying(false)}
      >
        Seu navegador não suporta o elemento de áudio.
      </audio>

      <div className="now-playing">
        <span className="podcast-title">{currentPodcast.titulo}</span>
      </div>
    </div>
  );
};

export default MiniPlayer;