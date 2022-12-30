import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artist: '',
    artistName: '',
    isButtonDisabled: true,
    loading: false,
    albuns: [],
  };

  onInputChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
      artistName: value,
    });
    const numberTwo = 2;
    if (value.length >= numberTwo) {
      this.setState({
        isButtonDisabled: false,
        artistName: value,
      });
    }
  };

  buttonSubmit = async () => {
    const { artist } = this.state;
    this.setState({
      artist: '',
      loading: true,
    });
    const resultAlbuns = await searchAlbumsAPI(artist);
    this.setState({
      albuns: resultAlbuns,
      loading: false,
    });
  };

  render() {
    const { artist, isButtonDisabled, albuns, loading, artistName } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        { loading ? <p>Carregando...</p> : (
          <form>
            <label htmlFor="artist">
              Nome do artista
              <input
                type="text"
                data-testid="search-artist-input"
                name="artist"
                id="artist"
                value={ artist }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="button"
              data-testid="search-artist-button"
              disabled={ isButtonDisabled }
              onClick={ this.buttonSubmit }
            >
              Pesquisar

            </button>
          </form>
        )}
        <main>
          <h4>
            { `Resultado de álbuns de: ${artistName}` }
          </h4>

          { albuns.length !== 0 ? (
            <div>

              { albuns.map((album) => (
                <Link
                  key={ album.collectionId }
                  data-testid={ `link-to-album-${album.collectionId}` }
                  to={ `/album/${album.collectionId}` }
                >
                  <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                  <p>{ album.collectionName }</p>
                </Link>
              ))}
            </div>
          ) : <p> Nenhum álbum foi encontrado</p> }
        </main>

      </div>

    );
  }
}

export default Search;
