import React, {useEffect, useState} from 'react'
import {Image, View, Text, StyleSheet, ActivityIndicator} from 'react-native'
import Track from "./../../../spotifyApi/Track.js"
import {getPlaylistInfoById} from "./../../../playlistFunctions/playlistFunctions.js"
import { useAuth } from '../../../context/AuthContext.js'

//For spotify Playlists
const PopularPlaylistItemHeader = ( {name} ) =>{

    const [playlistInfo, setPlaylistInfo] = useState({});

    const fetchPlaylistInfo = async () => {
        try {
            //console.log(name)
            const data = await Track.getPlaylistInfoByName(name)
            //console.log(data)
            setPlaylistInfo(data)
        } catch (err) {
          console.error(err.message);
        }
      };
    
      useEffect(() => {
        fetchPlaylistInfo();
      }, []);
    
    return(
        <View style={{flexDirection: 'row', paddingBottom: 2}}>
            <View style={{paddingRight:10}}>
                <Image style={styles.image} source={{uri: playlistInfo.img}} />
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Name: {playlistInfo.name}</Text>
            </View>
        </View>
    )
}

const PopularPlaylistItem = ({name }) => (
    <View key={name} style={styles.container}>
        <PopularPlaylistItemHeader name={name} />
    </View>
)

//For users Playlists
const MyPlaylistItemHeader = ( props ) =>{

    const { user } = useAuth();

    const [playlistInfo, setPlaylistInfo] = useState([]);

    const fetchPlaylistInfo = async () => {
        try {
            //console.log(props.name)
            const data = await getPlaylistInfoById(user, props.id)
            //console.log(data)
            setPlaylistInfo(data)
        } catch (err) {
            console.error(err.message);
        }
        
      };
    
      useEffect(() => {
        fetchPlaylistInfo();
      }, []);
    
    return(
        <View style={{flexDirection: 'row', paddingBottom: 2}}>
            <View style={{paddingRight:10}}>
                <Image style={styles.image} source={{uri: playlistInfo.img}} />
            </View>
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text>Name: {playlistInfo.name}</Text>
            </View>
        </View>
    )
}

const MyPlaylistItem = (props) => (
    <View key={props.name} style={styles.container}>
        <MyPlaylistItemHeader {...props} />
    </View>
)

export {PopularPlaylistItem, MyPlaylistItem};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        paddingBottom: 5,
        paddingTop: 5
    },
    language: {
        padding: 4,

        marginVertical: 4,
        alignSelf: 'flex-start',
        borderRadius: 4,
        overflow: 'hidden',
    },
    image:{
        width: 55,
        height: 55,
        borderRadius: 4,
    }
})