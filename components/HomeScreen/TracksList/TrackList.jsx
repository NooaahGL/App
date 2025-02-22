import React, { useEffect, useState } from "react"
import { View, Text, FlatList} from "react-native"
import {TrackItem, TrackItemAdd, TrackItemDelete} from "./TrackItem.jsx"
import Track from "./../../../spotifyApi/Track.js"
import {createPlaylist, deleteSongFromPlaylist} from "./../../../playlistFunctions/playlistFunctions.js"
import { useAuth } from "../../../context/AuthContext.js"

//For spotify playlist
const TrackListByName = ({children}) => {
    
    const [playlist, setPlaylist] = useState([])

    const fetchPlaylist = async () =>{
        //console.log("tracks list")
        const playlistId = await Track.searchPlaylist(children);
        //console.log(playlistId);
        const response = await Track.createPlaylist(playlistId);
        //console.log(response)
        //const json = await response.json()
        setPlaylist(response)

    }

    useEffect(() => {
        fetchPlaylist()
    }, [])

    return(
        <FlatList 
            data={playlist}
            ItemSeparatorComponent={()=> <Text></Text>}
            renderItem={({item: repo}) =>(
                <TrackItem {...repo}/>
            )}
        />
    )
}
//For spotify playlist
const TrackListById = ({children}) => {
    
    const [playlist, setPlaylist] = useState([])

    const fetchPlaylist = async () =>{
        //console.log(children);
        const response = await Track.createPlaylist(children);
        //console.log(response)
        //const json = await response.json()
        setPlaylist(response)

    }

    useEffect(() => {
        fetchPlaylist()
    }, [])

    return(
        <FlatList 
            data={playlist}
            ItemSeparatorComponent={()=> <Text></Text>}
            renderItem={({item: repo}) =>(
                <TrackItem {...repo}/>
            )}
        />
    )
}

//For user playlists
const TrackMyListById = ({children}) => {
    
    const { user } = useAuth();

    const [playlist, setPlaylist] = useState([])

    const fetchPlaylist = async () =>{
        //console.log(children);
        const response = await createPlaylist(user, children);
        //console.log(response)
        //const json = await response.json()
        setPlaylist(response)

    }

    useEffect(() => {
        fetchPlaylist()
    }, [])

    return(
        <FlatList 
            data={playlist}
            ItemSeparatorComponent={()=> <Text></Text>}
            renderItem={({item: repo}) =>(
                <TrackItem {...repo}/>
            )}
        />
    )
}

//For user playlists
const TrackMyListByIdDelete = ({children}) => {
    
    const { user } = useAuth();
    const [playlist, setPlaylist] = useState([])

    const fetchPlaylist = async () =>{
        //console.log(children);
        const response = await createPlaylist(user, children);
        //console.log(response)
        //const json = await response.json()
        setPlaylist(response)

    }

    useEffect(() => {
        fetchPlaylist()
    }, [])

    const handleDelete = async (trackId, songDocId) => {
        // Aquí debes implementar la lógica de eliminación en tu backend
        console.log("borrando cancion")
        await deleteSongFromPlaylist(user, children, songDocId);
        console.log("cancion borrada")
        setPlaylist((prevPlaylist) => prevPlaylist.filter(track => track.id !== trackId));
    };

    return(
        <FlatList 
            data={playlist}
            ItemSeparatorComponent={()=> <Text></Text>}
            renderItem={({item: track}) =>(
                <TrackItemDelete 
                {...track}
                onDelete={() => handleDelete(track.id, track.songDocId)}
                />
            )}
        />
    )
}

//For user playlists
const TrackMyListByIdAdd = ({children}) => {
    
    const { user } = useAuth();

    const [playlist, setPlaylist] = useState([])

    const fetchPlaylist = async () =>{
        //console.log(children);
        const response = await createPlaylist(user, children);
        //console.log(response)
        //const json = await response.json()
        setPlaylist(response)

    }

    useEffect(() => {
        fetchPlaylist()
    }, [])

    return(
        <FlatList 
            data={playlist}
            ItemSeparatorComponent={()=> <Text></Text>}
            renderItem={({item: repo}) =>(
                <TrackItemAdd {...repo}/>
            )}
        />
    )
}

export {TrackListByName, TrackListById, TrackMyListById, TrackMyListByIdAdd, TrackMyListByIdDelete};