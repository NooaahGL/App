import { collection, addDoc, getDocs, getDoc,  doc, setDoc } from '@firebase/firestore';
import {db} from '../auth.js'
import Track from '../spotifyApi/Track.js'

//Returns an array of the playlist documents ids of the user
const getAllPlaylistId = async (user) =>{
  try{
    //const { user } = useAuth(); 
    const playlistsCollectionRef = collection(db, 'users', user.uid, 'playlists');
    const query = await getDocs(playlistsCollectionRef);  
    const playlistId = query.docs.map(doc => doc.id);
    //console.log(playlistId);
    return playlistId;
  } catch (error) {
    console.error('Error getting all playlists:', error.message);
  }
}

//Returns an array of the playlist names of the user
const getAllPlaylistNames = async (user) =>{
  try{
    //const { user } = useAuth(); 
    const playlistsCollectionRef = collection(db, 'users', user.uid, 'playlists');
    const query = await getDocs(playlistsCollectionRef);  
    const playlistNames = query.docs.map(doc => doc.data().name);
    //console.log(playlistNames)
    return playlistNames;
  } catch (error) {
    console.error('Error getting all playlists:', error.message);
  }
}

//Returns an array the playlist documents ids and the playlist names of the user
const getAllPlaylist = async (user) =>{
  try{
    //const { user } = useAuth(); 
    const playlistsCollectionRef = collection(db, 'users', user.uid, 'playlists');
    const query = await getDocs(playlistsCollectionRef);
    const playlistId = query.docs.map(doc => doc.id);  
    const playlistNames = query.docs.map(doc => doc.data().name);
    const allPlaylists = playlistId.map((id, index) => ({
      id,
      name: playlistNames[index]
    }));
    
    //console.log(allPlaylists)
    return allPlaylists;
  } catch (error) {
    console.error('Error getting all playlists:', error.message);
  }
}

//Add a playlist to the user without any songs
const addPlaylist = async (user, playlistName) => {
    try {
      //const { user } = useAuth(); 
      const playlistsCollectionRef = collection(db, 'users', user.uid, 'playlists');
      const playlistDocRef = await addDoc(playlistsCollectionRef, { name: playlistName });
      console.log('Playlist added successfully with ID:', playlistDocRef.id);
      return playlistDocRef.id;
    } catch (error) {
      console.error('Error adding playlist:', error.message);
    }
  };

//Add a song to the playlist
const addSongToPlaylist = async (user, playlistId, trackId) => {
  try {
    //const { user } = useAuth(); 
    const songsCollectionRef = collection(db, 'users', user.uid, 'playlists', playlistId, 'songs');
    await addDoc(songsCollectionRef, { id: trackId});
    console.log('Song added to playlist successfully!');
  } catch (error) {
    console.error('Error adding song to playlist:', error.message);
  }
};


//Returns the id, the name and the image of the album of the first song of the playlist
const getPlaylistInfoById = async (user, playlistId) => {
  
  try {
    const playlistDocRef = doc(db, 'users', user.uid, 'playlists', playlistId);
    
    const playlistDoc = await getDoc(playlistDocRef);

    if (playlistDoc.exists()) {
      const playlistData = playlistDoc.data();
      const songsColRef = collection(db, 'users', user.uid, 'playlists', playlistId, 'songs');
      const songs = await getDocs(songsColRef);

      if (!songs.empty) {
        // Get the first song document
        const firstSongDoc = songs.docs[0];
        const firstSongData = firstSongDoc.data();
        const firstSongId = firstSongData.id;
        
        //console.log(firstSongId)
        
        const firstSong = new Track(firstSongId);
        await firstSong.fetchTrackDetails();

        // Extract image URL from track details
        let imageUrl = null;
        imageUrl = firstSong.getAlbumImg() || null;

        //console.log(playlistId)
        //console.log(playlistData.name)
        //console.log(imageUrl)
        
        return {
          id: playlistId,
          name: playlistData.name,
          img: imageUrl
        };
      }
    } else {
      console.error('Playlist does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error getting playlist info by ID:', error.message);
    return null;
  }
}


//Returns an array of Tracks of the songs in the user playlist
const createPlaylist = async (user, playlistId) => {
  try {
    
    const playlistDocRef = doc(db, 'users', user.uid, 'playlists', playlistId);
    const playlistDoc = await getDoc(playlistDocRef);

    if (playlistDoc.exists()) {
      const playlistData = playlistDoc.data();
      const songsColRef = collection(db, 'users', user.uid, 'playlists', playlistId, 'songs');
      const songs = await getDocs(songsColRef);

      if (!songs.empty) {
        
        const tracks = [];
        for (const songDoc of songs.docs) {
          const songData = songDoc.data();
          const songId = songData.id;

          const track = new Track(songId);

          await track.fetchTrackDetails();

          tracks.push(track);
        }

               
        return tracks;
      }
    } else {
      console.error('Playlist does not exist');
      return null;
    }
  } catch (error) {
    console.error('Error getting playlist info by ID:', error.message);
    return null;
  }
}


export {
  addPlaylist,
  addSongToPlaylist,
  getAllPlaylistId,
  getAllPlaylistNames,
  getAllPlaylist,
  getPlaylistInfoById,
  createPlaylist
}