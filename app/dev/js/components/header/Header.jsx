import React from 'react';

import Nav from '@app-components/header/Nav';
import Account from '@app-components/header/Account';

const Header = () => {
  return <header className="header">
      <div className="container">
        <Nav />
        <Account />
      </div>
    </header>;
};

export default Header;
