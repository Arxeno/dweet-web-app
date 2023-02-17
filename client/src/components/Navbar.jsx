import Account from './Account'

const Navbar = () => {
	return (
		<nav id="header-nav">
			<a id="nav-title" href="/">
	      <h1><span className="emoji">🦢</span> Dweet</h1>
      </a>

      <button id="hamburger-menu__button" className="button-effect"><img src="images/hamburger-menu.svg" alt="Hamburger menu" /></button>
      <Account
      	imagePhoto="https://www.rainforest-alliance.org/wp-content/uploads/2021/06/capybara-square-1.jpg.optimal.jpg"
      	userName="masbro"
      />
    </nav>
	);
}

export default Navbar;