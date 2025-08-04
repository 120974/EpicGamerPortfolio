import { useState, useEffect, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: string;
  audioUrl: string;
  albumArt: string;
  isPlaying?: boolean;
}

export default function MyMusicApp() {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const audioRef = useRef<HTMLAudioElement>(null);

  const jazzTracks: Track[] = [
    {
      id: '1',
      title: 'Borderline',
      artist: 'Tame Impala',
      album: 'The Slow Rush',
      duration: '4:34',
      audioUrl: 'https://ia600600.us.archive.org/1/items/TameImpalaBorderline/Tame%20Impala%20-%20Borderline.mp3',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b27358267bd34420a00d5cf83a49'
    },
    {
      id: '2',
      title: 'From the Start',
      artist: 'Laufey',
      album: 'Bewitched',
      duration: '3:02',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      albumArt: 'https://m.media-amazon.com/images/I/81m3iTR5bjL._UF1000,1000_QL80_.jpg'
    },
    {
      id: '3',
      title: 'Heartless',
      artist: 'Kanye West',
      album: '808s & Heartbreak',
      duration: '3:31',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18'
    },
    {
      id: '4',
      title: 'Self Love',
      artist: 'Metro Boomin, Coi Leray',
      album: 'Heroes & Villains',
      duration: '2:51',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      albumArt: 'https://cdn-images.dzcdn.net/images/cover/bec6e38cb8986f3e5b3b7bd70e154d4f/1900x1900-000000-80-0-0.jpg'
    },
    {
      id: '5',
      title: 'Back to friends',
      artist: 'Sombr',
      album: 'Singles',
      duration: '3:45',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/0/0a/Official_single_cover_of_"Back_to_Friends"_by_Sombr.jpeg'
    },
    {
      id: '6',
      title: 'シカ色デイズ',
      artist: 'しかのこのこのここしたんたん',
      album: 'Anime Songs',
      duration: '1:30',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      albumArt: 'https://upload.wikimedia.org/wikipedia/en/d/d0/Shikairo_days.png'
    },
    {
      id: '7',
      title: 'Home',
      artist: 'Pretty Patterns, Wisteria Iroha',
      album: 'Collaboration',
      duration: '4:12',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273d361de68b7f14398b5d6afcc'
    },
    {
      id: '8',
      title: 'Magnolia',
      artist: 'Keshi',
      album: 'GABRIEL',
      duration: '3:24',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b2734ceb152f7b9e58f38e8600f9'
    },
    {
      id: '9',
      title: 'Rainy Day Women',
      artist: 'CosmicFM, Miki Matsubara',
      album: 'City Pop Remixes',
      duration: '4:47',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      albumArt: 'https://i.scdn.co/image/ab67616d00001e02dd32e9e42ed7e92718c85707'
    },
    {
      id: '10',
      title: 'Blue',
      artist: 'Yung Kai',
      album: 'Singles',
      duration: '2:58',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273373c63a4666fb7193febc167'
    },
    {
      id: '11',
      title: 'Finesse',
      artist: 'Bruno Mars',
      album: '24K Magic',
      duration: '3:11',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273232711f7d66a1e19e89e28c5'
    },
    {
      id: '12',
      title: 'Mr. Blue Sky',
      artist: 'Electric Light Orchestra',
      album: 'Out of the Blue',
      duration: '5:03',
      audioUrl: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
      albumArt: 'https://i.scdn.co/image/ab67616d0000b273ae954a17f0cfa013c364bb06'
    }
  ];

  // Update audio element when track changes
  useEffect(() => {
    if (audioRef.current && currentTrack) {
      audioRef.current.src = currentTrack.audioUrl;
      audioRef.current.load();
    }
  }, [currentTrack]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  // Handle audio events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      // Auto-advance to next track
      if (currentTrack) {
        const currentIndex = jazzTracks.findIndex(t => t.id === currentTrack.id);
        const nextIndex = (currentIndex + 1) % jazzTracks.length;
        playTrack(jazzTracks[nextIndex]);
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack, jazzTracks]);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const playTrack = async (track: Track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.log('Audio play failed:', error);
        setIsPlaying(false);
      }
    }
  };

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    if (!currentTrack && jazzTracks.length > 0) {
      await playTrack(jazzTracks[0]);
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.log('Audio toggle failed:', error);
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    if (currentTrack) {
      const currentIndex = jazzTracks.findIndex(t => t.id === currentTrack.id);
      const nextIndex = (currentIndex + 1) % jazzTracks.length;
      playTrack(jazzTracks[nextIndex]);
    }
  };

  const previousTrack = () => {
    if (currentTrack) {
      const currentIndex = jazzTracks.findIndex(t => t.id === currentTrack.id);
      const prevIndex = currentIndex === 0 ? jazzTracks.length - 1 : currentIndex - 1;
      playTrack(jazzTracks[prevIndex]);
    }
  };

  const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="h-full flex flex-col" style={{ fontFamily: 'Tahoma, sans-serif', fontSize: '11px' }}>
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="metadata" />

      {/* Menu Bar */}
      <div 
        className="h-6 border-b flex items-center px-2"
        style={{ 
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: '#c0c0c0'
        }}
      >
        <div className="flex space-x-4 text-xs">
          <span className="hover:bg-blue-100 px-1 cursor-pointer">File</span>
          <span className="hover:bg-blue-100 px-1 cursor-pointer">View</span>
          <span className="hover:bg-blue-100 px-1 cursor-pointer">Play</span>
          <span className="hover:bg-blue-100 px-1 cursor-pointer">Tools</span>
          <span className="hover:bg-blue-100 px-1 cursor-pointer">Help</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Playlist */}
        <div className="w-2/3 border-r">
          <div 
            className="h-8 border-b flex items-center px-3"
            style={{ 
              background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
              borderColor: '#c0c0c0'
            }}
          >
            <h3 className="text-sm font-medium">🎵 Rishi's Collection</h3>
          </div>
          
          <div className="overflow-y-auto xp-scrollbar" style={{ height: 'calc(100% - 32px)' }}>
            <table className="w-full text-xs">
              <thead>
                <tr 
                  className="border-b"
                  style={{ 
                    background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                    borderColor: '#c0c0c0'
                  }}
                >
                  <th className="text-left p-2">Track</th>
                  <th className="text-left p-2">Artist</th>
                  <th className="text-left p-2">Album</th>
                  <th className="text-left p-2">Duration</th>
                </tr>
              </thead>
              <tbody>
                {jazzTracks.map((track) => (
                  <tr 
                    key={track.id}
                    className={`cursor-pointer hover:bg-blue-50 border-b ${
                      currentTrack?.id === track.id ? 'bg-blue-100' : ''
                    }`}
                    style={{ borderColor: '#e0e0e0' }}
                    onDoubleClick={() => playTrack(track)}
                  >
                    <td className="p-2 flex items-center">
                      {currentTrack?.id === track.id && isPlaying && (
                        <span className="mr-2 text-green-600">▶</span>
                      )}
                      <ImageWithFallback
                        src={track.albumArt}
                        alt={track.album}
                        className="w-6 h-6 object-cover mr-2 border"
                        style={{ borderColor: '#cccccc' }}
                      />
                      {track.title}
                      <span 
                        className="ml-2 px-1 text-xs border"
                        style={{ 
                          background: 'linear-gradient(90deg, #1db954 0%, #1ed760 100%)',
                          color: 'white',
                          borderColor: '#1aa34a',
                          borderRadius: '2px'
                        }}
                        title="Spotify Premium Track"
                      >
                        🎵 SPOTIFY
                      </span>
                    </td>
                    <td className="p-2">{track.artist}</td>
                    <td className="p-2">{track.album}</td>
                    <td className="p-2">{track.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Now Playing */}
        <div className="w-1/3">
          <div 
            className="h-8 border-b flex items-center px-3"
            style={{ 
              background: 'linear-gradient(180deg, #f8f8f8 0%, #e8e8e8 100%)',
              borderColor: '#c0c0c0'
            }}
          >
            <h3 className="text-sm font-medium">Now Playing</h3>
          </div>
          
          <div className="p-4">
            {currentTrack ? (
              <div className="text-center">
                {/* Album Art or Spotify Player for Premium tracks */}
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'].includes(currentTrack.id) ? (
                  // Spotify embed for all tracks
                  <div className="w-full mb-4">
                    <div 
                      className="border-2 p-2 bg-white"
                      style={{ 
                        borderColor: '#999999',
                        background: 'linear-gradient(180deg, #f8f8f8 0%, #f0f0f0 100%)'
                      }}
                    >
                      <div 
                        className="text-xs mb-2 text-center font-medium"
                        style={{ color: '#003c71' }}
                      >
                        🎵 Now Streaming from Spotify
                      </div>
                      <div 
                        className="border flex"
                        style={{ 
                          borderColor: '#cccccc',
                          borderRadius: '3px',
                          overflow: 'hidden',
                          lineHeight: 0,
                          fontSize: 0,
                          height: '160px'
                        }}
                      >
                        {(() => {
                          const spotifyEmbeds: Record<string, string> = {
                            '1': 'https://open.spotify.com/embed/track/5hM5arv9KDbCHS0k9uqwjr?utm_source=generator',
                            '2': 'https://open.spotify.com/embed/track/43iIQbw5hx986dUEZbr3eN?utm_source=generator',
                            '3': 'https://open.spotify.com/embed/track/4EWCNWgDS8707fNSZ1oaA5?utm_source=generator',
                            '4': 'https://open.spotify.com/embed/track/0AAMnNeIc6CdnfNU85GwCH?utm_source=generator',
                            '5': 'https://open.spotify.com/embed/track/0FTmksd2dxiE5e3rWyJXs6?utm_source=generator',
                            '6': 'https://open.spotify.com/embed/track/65DUeMw4riBUibAjktAnZD?utm_source=generator',
                            '7': 'https://open.spotify.com/embed/track/0JJa8MHLh7hNdLq0zQSTfF?utm_source=generator',
                            '8': 'https://open.spotify.com/embed/track/6PAvEeeSw7zuaQTUnoZPlg?utm_source=generator',
                            '9': 'https://open.spotify.com/embed/track/1fXvSdLMx1rGDoGxEdDcDA?utm_source=generator',
                            '10': 'https://open.spotify.com/embed/track/3be9ACTxtcL6Zm4vJRUiPG?utm_source=generator',
                            '11': 'https://open.spotify.com/embed/track/5XMkENs3GfeRza8MfVAhjK?utm_source=generator',
                            '12': 'https://open.spotify.com/embed/track/2RlgNHKcydI9sayD2Df2xp?utm_source=generator'
                          };
                          
                          return (
                            <iframe 
                              data-testid="embed-iframe" 
                              style={{ 
                                borderRadius: '3px', 
                                display: 'block',
                                border: 'none',
                                margin: 0,
                                padding: 0,
                                verticalAlign: 'top',
                                height: '160px'
                              }} 
                              src={spotifyEmbeds[currentTrack.id] || spotifyEmbeds['1']}
                              width="100%" 
                              height="140" 
                              frameBorder="0" 
                              allowFullScreen={true}
                              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                              loading="lazy"
                            />
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                ) : (
                  // Regular album art for other tracks
                  <div className="w-32 h-32 mx-auto mb-4 border-2" style={{ borderColor: '#999999' }}>
                    <ImageWithFallback
                      src={currentTrack.albumArt}
                      alt={currentTrack.album}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Track Info */}
                <div className="mb-4">
                  <h4 className="font-medium text-sm mb-1">{currentTrack.title}</h4>
                  <p className="text-xs text-gray-600 mb-1">{currentTrack.artist}</p>
                  <p className="text-xs text-gray-500">{currentTrack.album}</p>
                </div>

{currentTrack.id === '1' ? (
                  // Simplified controls for Spotify - just playlist navigation
                  <div className="mb-4">
                    <div 
                      className="text-xs text-center mb-3 p-2 border"
                      style={{ 
                        background: 'linear-gradient(180deg, #e8f0fe 0%, #d2e3fc 100%)',
                        borderColor: '#4682b4',
                        borderRadius: '2px'
                      }}
                    >
                      🎧 Use Spotify controls above to play/pause
                    </div>
                    <div className="flex justify-center space-x-2 mb-4">
                      <button 
                        onClick={previousTrack}
                        className="px-2 py-1 border text-xs hover:bg-gray-100"
                        style={{
                          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                          borderColor: '#999999'
                        }}
                      >
                        ⏮ Previous Track
                      </button>
                      <button 
                        onClick={nextTrack}
                        className="px-2 py-1 border text-xs hover:bg-gray-100"
                        style={{
                          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                          borderColor: '#999999'
                        }}
                      >
                        Next Track ⏭
                      </button>
                    </div>
                  </div>
                ) : (
                  // Regular controls for other tracks
                  <>
                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div 
                        className="w-full h-2 border mb-2 cursor-pointer"
                        style={{ 
                          background: 'white',
                          borderColor: '#999999'
                        }}
                        onClick={seekTo}
                      >
                        <div 
                          className="h-full transition-all"
                          style={{
                            width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`,
                            background: 'linear-gradient(90deg, #4682b4 0%, #5a9fd4 100%)'
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex justify-center space-x-2 mb-4">
                      <button 
                        onClick={previousTrack}
                        className="px-2 py-1 border text-xs hover:bg-gray-100"
                        style={{
                          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                          borderColor: '#999999'
                        }}
                      >
                        ⏮
                      </button>
                      <button 
                        onClick={togglePlayback}
                        className="px-3 py-1 border text-xs hover:bg-gray-100"
                        style={{
                          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                          borderColor: '#999999'
                        }}
                      >
                        {isPlaying ? '⏸' : '▶'}
                      </button>
                      <button 
                        onClick={nextTrack}
                        className="px-2 py-1 border text-xs hover:bg-gray-100"
                        style={{
                          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                          borderColor: '#999999'
                        }}
                      >
                        ⏭
                      </button>
                    </div>

                    {/* Volume */}
                    <div className="mb-4">
                      <label className="text-xs block mb-1">Volume: {volume}%</label>
                      <input 
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        className="w-full"
                      />
                    </div>
                  </>
                )}

                {/* Audio Notice */}
                <div className="text-xs text-gray-500 text-center">
                  <p>🎵 Spotify Premium Experience</p>
                  <p>Full-quality streaming with integrated controls</p>
                  <p className="mt-1">Use playlist navigation buttons to switch tracks</p>
                </div>

              </div>
            ) : (
              <div className="text-center text-gray-500 mt-8">
                <div className="w-24 h-24 mx-auto mb-4 border-2 flex items-center justify-center" style={{ borderColor: '#cccccc' }}>
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=100&h=100&fit=crop"
                    alt="No Music"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-sm">No track selected</p>
                <p className="text-xs mt-2">Double-click a track to play</p>
                <button 
                  onClick={() => playTrack(jazzTracks[0])}
                  className="mt-4 px-3 py-1 border text-xs hover:bg-gray-100"
                  style={{
                    background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
                    borderColor: '#999999'
                  }}
                >
                  ▶ Start Playing
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div 
        className="h-6 border-t flex items-center px-3 text-xs"
        style={{ 
          background: 'linear-gradient(180deg, #f0f0f0 0%, #e0e0e0 100%)',
          borderColor: '#c0c0c0',
          color: '#666666'
        }}
      >
        <span>{jazzTracks.length} tracks</span>
        <div className="flex-1"></div>
        <span>{isPlaying ? '♪ Playing' : '⏸ Stopped'}</span>
        {currentTrack && (
          <span className="ml-2">- {currentTrack.title}</span>
        )}
      </div>
    </div>
  );
}