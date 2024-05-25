import React from 'react'
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { AntDesign } from '@expo/vector-icons';

const TrackItemHeader = (props) =>(
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

const TrackItem = (props) => (
    <View key={props.name} style={styles.container}>
        <TrackItemHeader {...props} />
    </View>
)

const TrackItemHeaderAdd = (props) =>(
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
            <View>
                <TouchableOpacity>
                    <AntDesign name="pluscircleo" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
    //)
)

const TrackItemAdd = (props) => (
    <View key={props.name} style={styles.container}>
        <TrackItemHeaderAdd {...props} />
    </View>
)

const TrackItemHeaderDelete = ({ onDelete, ...props }) => (
    <View style={{ flexDirection: 'row', paddingBottom: 2 }}>
      <View style={{ paddingRight: 10 }}>
        <Image style={styles.image} source={{ uri: props.albumImg }} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.trackName}>{props.name}</Text>
        <Text style={styles.trackArtist}>{props.artist[0]}</Text>
        <Text style={styles.trackAlbum}>{props.album}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={onDelete}>
          <AntDesign name="delete" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

const TrackItemDelete = (props) => (
    <View key={props.name} style={styles.container}>
        <TrackItemHeaderDelete {...props} />
    </View>
)

export  {TrackItem, TrackItemAdd, TrackItemDelete};

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
    },
    trackImage: {
        width: 50,
        height: 50,
        borderRadius: 4,
      },
      trackInfo: {
        marginLeft: 10,
      },
      trackName: {
        fontSize: 16,
        fontWeight: 'bold',
      },
      trackArtist: {
        fontSize: 14,
        color: 'gray',
      },
      trackAlbum: {
        fontSize: 14,
        color: 'gray',
      },
})