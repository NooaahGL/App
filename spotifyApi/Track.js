class Track {
    static accessToken = "";
    static searchParameters = {};

    //Stores the values of the static variables
    static setAccessToken(token) {
        this.accessToken = token;
        this.searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        };
        //console.log("Token set in Track class:", this.accessToken);
    }

    //Constructor
    constructor(id) {
        this.id = id;
        this.name = "";
        this.album = "";
        this.albumId = "";
        this.albumImg = "";
        this.artist = [];
        this.artistId = [];
        this.duration = 0;
    }

    //Getters
    getId() { return this.id; }

    getName() { return this.name; }

    getAlbum() { return this.album; }

    getAlbumId() { return this.albumId; }

    getAlbumImg() { return this.albumImg; }

    getArtist() { return this.artist; }

    getArtistId() { return this.artistId; }

    getDuration() { return this.duration; }

    //Returns a string with all the track info
    trackInfo(){
        return (
            "Track id: " + this.id + "\n" +
            "Track name: " + this.name + "\n" +
            "Album name: " + this.album + "\n" +
            "Album id: " + this.albumId + "\n" +
            "Album image: " + this.albumImg + "\n" +
            "Artists: " + this.artist.join(", ") + "\n" +
            "Artist ids: " + this.artistId.join(", ") + "\n" +
            "Duration: " + this.duration + " ms" 
        );
    }

    //Conects to the spotify API to get the track details
    async fetchTrackDetails() {
        try {
            if (!Track.accessToken) {
                throw new Error('Access token not set');
            }
            const response = await fetch(`https://api.spotify.com/v1/tracks/${this.id}`, Track.searchParameters);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            //console.log(data);
            this.name = data.name;
            this.album = data.album.name;
            this.albumId = data.album.id;
            this.albumImg = data.album.images[0].url;
            this.artist = data.artists.map(artist => artist.name);
            this.artistId = data.artists.map(artist => artist.id);
            this.duration = data.duration_ms;

        } catch (error) {
            console.error('Error fetching track details:', error.message);
        }
    }

    // Get track details and return as JSON
    getTrackDetailsAsJson() {
        return {
            id: this.id,
            name: this.name,
            album: this.album,
            albumId: this.albumId,
            albumImg: this.albumImg,
            artist: this.artist,
            artistId: this.artistId,
            duration: this.duration
        };
    }

    //Returns the Playlist id of the first Playlist returned in the search
    //Returns 0 if error
    static async searchPlaylist(search) {
        var playlistID = 0;
        try {
            //console.log("Search for " + search);
            const response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=playlist`, this.searchParameters);
            const data = await response.json();
            playlistID = data.playlists.items[0].id;
            //console.log("Playlist ID:", playlistID);

        } catch (error) {
            console.error('Error searching Playlist:', error.message);
        }
        return playlistID;
    }

    //Returns an array of tracks
    //Returns an empty array if error
    static async createPlaylist(playlistID) {
        try {
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks?market=US&limit=50`, this.searchParameters);
            const data = await response.json();
            const tracks = data.items.map(item => {
                const track = new Track(item.track.id);
                //This is as a track.fetchDetails(item.track.id)
                track.name = item.track.name;
                track.album = item.track.album.name;
                track.albumId = item.track.album.id;
                track.albumImg = item.track.album.images[0].url;
                track.artist = item.track.artists.map(artist => artist.name);
                track.artistId = item.track.artists.map(artist => artist.id);
                track.duration = item.track.duration_ms;

                return track;
            });
            return tracks;
        } catch (error) {
            console.error('Error creating playlist:', error.message);
            return [];
        }
    }

    //Returns the tracks id of the 50 first tracks returned in the search
    //Returns [] if error
    static async searchTracks(search) {
        var tracks = [];
        try {
            //console.log("Search for " + search);
            const response = await fetch(`https://api.spotify.com/v1/search?q=${search}&type=track&market=US&limit=50`, this.searchParameters);
            const data = await response.json();
            tracks = data.tracks.items.map(item => item.id);
            //console.log("Playlist ID:", playlistID);
        } catch (error) {
            console.error('Error searching Playlist:', error.message);
        }
        return tracks;
    }

    //Returns playlist info from spotify: name, img...
    static async getPlaylistInfo(playlistId){
        try {
            if (!Track.accessToken) {
                throw new Error('Access token not set');
            }
            const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, Track.searchParameters);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            //console.log(data)
            return data;

        } catch (error) {
            console.error('Error geting Playlist info:', error.message);
        }
    }

    //Returns playlist info from spotify(makes a search and gets the first one): id, name, img...
    static async getPlaylistInfoByName(playlistName){
        try {
            const playlistId = await Track.searchPlaylist(playlistName);
            const data = await Track.getPlaylistInfo(playlistId)
            //console.log(data)
            const tracks = await Track.createPlaylist(playlistId)
         

            return {
                id: playlistId,
                name: data.name,
                img: data.images[0].url,
            };
        } catch (error) {
            console.error('Error geting Playlist info:', error.message);
        }
    }

}

export default Track;
