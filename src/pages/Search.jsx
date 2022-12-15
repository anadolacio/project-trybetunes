import React from 'react';
import Header from '../components/Header';
// import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    artist: '',
    isButtonDisabled: true,
    // albuns: [],
  };

  onInputChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
    const numberTwo = 2;
    if (value.length >= numberTwo) {
      this.setState({
        isButtonDisabled: false,
      });
    }
  };

  buttonSubmit = () => {
    // const { user, albuns, loading } = this.state;
    // this.setState({
    //   artist: '',
    // });
    // this.setState({ loading: true }, async () => {
    //   await createUser({ name: artist });
    // });
    // this.setState({ loading: false });
  };

  render() {
    const { artist, isButtonDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
        <div>
          {/* { alnu} */}
        </div>
      </div>

    );
  }
}

export default Search;
