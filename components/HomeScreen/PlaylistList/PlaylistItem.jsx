import React from 'react'
import {Image, View, Text, StyleSheet} from 'react-native'

const PlaylistItemHeader = (props) =>(
    //return(
        <View style={{flexDirection: 'row', paddingBottom: 2}}>
            <View style={{paddingRight:10}}>
                <Image style={styles.image} source={{uri: props.albumImg}} />
            </View>
            <View style={{flex: 1}}>
                <Text>Name:{props.name}</Text>
                <Text>Artists:{props.artist[0]}</Text>
                <Text>Album:{props.album}</Text>
            </View>
        </View>
    //)
)

const PlaylistItem = (props) => (
    <View key={props.isbn} style={styles.container}>
        <TrackItemHeader {...props} />
        
    </View>
)

export default TrackItem;

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