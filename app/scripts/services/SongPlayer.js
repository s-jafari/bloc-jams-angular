(function() {
  function SongPlayer(Fixtures) {
    var SongPlayer = {};

    /**
    * @desc sets the currently playing Album
    * @type {Object} album
    */
    var currentAlbum = Fixtures.getAlbum();
    
    var currentBuzzObject = null;
    
    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    */
    var setSong = function(song)  {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      }
      
      /**
      * @desc Buzz object audio file
      * @type {Object}
      */
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });
      
      SongPlayer.currentSong = song;
    };
    
    /**
    * @function playSong
    * @desc Plays new song and changes playing boolean to true
    * @param {Object} song
    */
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    };
    
    /**
    * @function getSongIndex
    * @desc gets the index of a song in album
    * @param {Object} song
    */
    var getSongIndex = function(song) {
      return currentAlbum.songs.indexOf(song);
    };

    /**
    * @desc Active song object from list of songs
    * @type {Object}
    */
    SongPlayer.currentSong = null;
    
    /**
    * @function SongPlayer.play
    * @desc public play method which sets current song and starts playing it
    * @param {Object} song
    */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);   
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }        
      }
    };

    /**
    * @function SongPlayer.pause
    * @desc public pause method which pauses current song changes playing boolean to false
    * @param {Object} song
    */    
    SongPlayer.pause = function(song) {
      song = song || SongPlayer.currentSong;
      currentBuzzObject.pause();
      song.playing = false;
    };

    /**
    * @function SongPlayer.previous
    * @desc public method which decreases the current song index and plays the previous song
    * @param
    */
    SongPlayer.previous = function() {
      var currentSongIndex = getSongIndex(SongPlayer.currentSong);
      currentSongIndex--;
      
      if (currentSongIndex < 0) {
        currentBuzzObject.stop();
        SongPlayer.currentSong.playing = null;
      } else {
        var song = currentAlbum.songs[currentSongIndex];
        setSong(song);
        playSong(song);
      }
    };
    
    return SongPlayer;
  }
  
  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();