import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: true,
    favoriteMusic: [],
  };

  componentDidMount() {
    this.getMusics();
  }

  favoriteSongsSaved = async (song, { target: { checked } }) => {
    this.setState({ loading: true });
    if (checked) {
      await addSong(song);
      await this.getMusics();
    } else {
      await removeSong(song);
      await this.getMusics();
    }
  };

  getMusics = async () => {
    const response = await getFavoriteSongs();
    this.setState({
      favoriteMusic: response,
      loading: false,
    });
  };

  render() {
    const { musicSelected } = this.props;
    const { loading, favoriteMusic } = this.state;
    return (
      <div>
        {loading ? <p> Carregando...</p>
          : musicSelected.filter((song) => song.previewUrl).map((song) => (
            <div key={ song.trackId }>

              {song.trackName}
              <audio
                data-testid="audio-component"
                src={ song.previewUrl }
                controls
              >
                <track kind="captions" />
                Your browser does not support the element
                {' '}
                <code>audio</code>
                .
              </audio>
              <label htmlFor={ song.trackId }>
                <input
                  type="checkbox"
                  id={ song.trackId }
                  onChange={ (event) => this.favoriteSongsSaved(song, event) }
                  checked={ favoriteMusic
                    .some((favorite) => favorite.trackId === song.trackId) }
                  data-testid={ `checkbox-music-${song.trackId}` }
                />
                Favorite
              </label>
            </div>
          ))}
      </div>
    );
  }
}
MusicCard.propTypes = {
  musicSelected: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default MusicCard;
