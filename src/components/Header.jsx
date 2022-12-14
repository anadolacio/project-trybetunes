import React from 'react';
import { Link } from 'react-router-dom';
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
        <div>
          <ul>
            <li>
              <Link to="/search" data-testid="link-to-search">Search</Link>
            </li>
            <li>
              <Link to="/favorites" data-testid="link-to-favorites">Favorites</Link>
            </li>
            <li>
              <Link to="/profile" data-testid="link-to-profile">Profile</Link>
            </li>
          </ul>
        </div>
      </header>

    );
  }
}

export default Header;
