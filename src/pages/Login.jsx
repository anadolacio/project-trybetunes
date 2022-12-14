import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import { Redirect } from 'react-router-dom';

class Login extends React.Component {
  state = {
    user: '',
    isButtonDisabled: true,
    loading: false,
  };

  onInputChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({
      [name]: value,
    });
    const numberThree = 3;
    if (value.length >= numberThree) {
      this.setState({
        isButtonDisabled: false,
      });
    }
  };

  buttonSubmit = async () => {
    const { user } = this.state;
    this.setState({ loading: true });
    await createUser({ name: user });
    this.setState({ loading: false });
  };

  render() {
    const { user, isButtonDisabled, loading } = this.state;
    return (
      <div data-testid="page-login">
        { loading === false ? (
          <form>
            <label htmlFor="user">
              Nome
              <input
                type="text"
                data-testid="login-name-input"
                name="user"
                id="user"
                value={ user }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ isButtonDisabled }
              onClick={ this.buttonSubmit }
            >
              Entrar

            </button>
          </form>

        ) : <p>Carregando...</p>}
        { loading && <Redirect to="/search" /> }
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
