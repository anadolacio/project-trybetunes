import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  state = {
    artist: '',
    isButtonDisabled: true,
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
    // const { user } = this.state;
    // this.setState({ loading: true }, async () => {
    //   await createUser({ name: user });
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
      </div>

    );
  }
}

export default Search;
