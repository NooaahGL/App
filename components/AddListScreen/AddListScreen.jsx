import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import {SIZES, COLORS} from '../../constants'
import { addPlaylist } from '../../playlistFunctions/playlistFunctions';
import { useAuth } from '../../context/AuthContext';

const AddListScreen = () => {

  const { user } = useAuth(); 
  const [playlistName, setPlaylistName] = useState('');

  const handleAddPlaylist = async () => {
    try {
      const playlistId = await addPlaylist(user, playlistName);
      console.log(playlistId);
      // Aquí podrías navegar a otra pantalla o hacer alguna otra acción después de agregar la playlist
    } catch (error) {
      console.error('Error adding playlist in AddPlaylistScreen:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter new List name</Text>
      <TextInput
        style={styles.input}
        placeholder="Playlist name"
        value={playlistName}
        onChangeText={setPlaylistName}
      />
      <Button style={styles.Btn} title="Add Playlist" onPress={handleAddPlaylist} />
    </View>
  );
};

export default AddListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    justifyContent: 'up',
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
    fontSize: 19,
    color: COLORS.primary,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
  },
  Btn: {
    borderRadius: 10, 
    width: '80%',
  },
});
