import AccountNav from './AccountNav'

const Navbar = () => {
	return (
		<nav id="header-nav">
			<a id="nav-title" href="/">
	      <h1>🦢 Dweet</h1>
      </a>

      <button id="hamburger-menu__button" className="button-effect"><img src="images/hamburger-menu.svg" alt="Hamburger menu" /></button>
      <AccountNav id="account-nav" />
    </nav>
	);
}

export default Navbar;