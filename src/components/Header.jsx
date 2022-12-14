import React from 'react';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  state = {
    user: '',
    loading: true,
  };

  componentDidMount() {
    this.findUser();
  }

  findUser = async () => {
    const userName = await getUser();
    this.setState({
      user: userName.name,
      loading: false,
    });
  };

  render() {
    const { user, loading } = this.state;
    return (
      <header data-testid="header-component">
        { loading ? <p>Carregando...</p> : <p data-testid="header-user-name">{ user }</p>}
      </header>

    );
  }
}

export default Header;
