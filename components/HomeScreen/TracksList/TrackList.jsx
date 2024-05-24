import React, { useEffect, useState } from "react"
import { View, Text, FlatList} from "react-native"
import TrackItem from "./TrackItem.jsx"
import Track from "./../../../spotifyApi/Track.js"

const TrackList = ({children}) => {
    
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


export default TrackList;