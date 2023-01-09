import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  state = {
    artistName: '',
    colectionName: '',
    musicSelected: [],
  };

  componentDidMount() {
    this.handleAlbum();
  }

  handleAlbum = async () => {
    const { match: { params: { id } } } = this.props;
    const musicFound = await getMusics(id);
    this.setState({
      artistName: musicFound[0].artistName,
      colectionName: musicFound[0].collectionName,
      musicSelected: musicFound,
    });
  };

  render() {
    const { artistName, colectionName, musicSelected } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="album-name">{ colectionName }</p>
        <p data-testid="artist-name">{ artistName }</p>
        <MusicCard musicSelected={ musicSelected } />
      </div>

    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
