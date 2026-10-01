import { createContext, useContext, useState } from "react";

const PlaylistsContext = createContext(null);

export function PlaylistsProvider({ children }) {
  const [playlists, setPlaylists] = useState([]);

  function createPlaylist(name, songIds = []) {
    const cleanName = name.trim();
    if (!cleanName) return;

    const playlist = {
      id: String(Date.now()),
      name: cleanName,
      songIds: [...new Set(songIds)],
    };

    setPlaylists((current) => [...current, playlist]);
    return playlist.id;
  }

  function addSongToPlaylist(playlistId, songId) {
    setPlaylists((current) =>
      current.map((playlist) =>
        playlist.id === playlistId
          ? {
              ...playlist,
              songIds: playlist.songIds.includes(songId)
                ? playlist.songIds
                : [...playlist.songIds, songId],
            }
          : playlist
      )
    );
  }

  return (
    <PlaylistsContext.Provider
      value={{ playlists, createPlaylist, addSongToPlaylist }}
    >
      {children}
    </PlaylistsContext.Provider>
  );
}

export function usePlaylists() {
  const context = useContext(PlaylistsContext);

  if (!context) {
    throw new Error("usePlaylists debe usarse dentro de PlaylistsProvider");
  }

  return context;
}