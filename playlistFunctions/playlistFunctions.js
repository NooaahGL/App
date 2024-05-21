import { collection, addDoc, getDocs, doc, setDoc } from '@firebase/firestore';
import {db} from '../auth.js'

const getAllPlaylistId = async (user) =>{
  try{
    const playlistsCollectionRef = collection(db, 'users', user.uid, 'playlists');
    const query = await getDocs(playlistsCollectionRef);  
    const playlistId = query.docs.map(doc => doc.id);
    console.log(playlistId);
    return playlistId;
  } catch (error) {
    console.error('Error getting all playlists:', error.message);
  }
}

const getAllPlaylistNames = async (user) =>{
  try{
    const playlistsCollectionRef = collection(db, 'users', user.uid, 'playlists');
    const query = await getDocs(playlistsCollectionRef);  
    const playlistNames = query.docs.map(doc => doc.data().name);
    console.log(playlistNames)
    return playlistNames;
  } catch (error) {
    console.error('Error getting all playlists:', error.message);
  }
}

const getAllPlaylist = async (user) =>{
  try{
    const playlistsCollectionRef = collection(db, 'users', user.uid, 'playlists');
    const query = await getDocs(playlistsCollectionRef);
    const playlistId = query.docs.map(doc => doc.id);  
    const playlistNames = query.docs.map(doc => doc.data().name);
    const allPlaylists = playlistId.map((id, index) => ({
      id,
      name: playlistNames[index]
    }));
    
    console.log(allPlaylists)
    return allPlaylists;
  } catch (error) {
    console.error('Error getting all playlists:', error.message);
  }
}

const addPlaylist = async (user, playlistName) => {
    try {
      const playlistsCollectionRef = collection(db, 'users', user.uid, 'playlists');
      const playlistDocRef = await addDoc(playlistsCollectionRef, { name: playlistName });
      console.log('Playlist added successfully with ID:', playlistDocRef.id);
      return playlistDocRef.id;
    } catch (error) {
      console.error('Error adding playlist:', error.message);
    }
  };
  
const addSongToPlaylist = async (user, playlistId, songTitle, songArtist) => {
  try {
    const songsCollectionRef = collection(db, 'users', user.uid, 'playlists', playlistId, 'songs');
    await addDoc(songsCollectionRef, { title: songTitle, artist: songArtist });
    console.log('Song added to playlist successfully!');
  } catch (error) {
    console.error('Error adding song to playlist:', error.message);
  }
};

export {
  addPlaylist,
  addSongToPlaylist,
  getAllPlaylistId,
  getAllPlaylistNames,
  getAllPlaylist
}