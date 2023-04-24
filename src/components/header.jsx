import logo from '../assets/applogo.jpg';

export default function Header() {
  return (
    <section className='header'>
      <div className='logo'>
        <img src={logo} alt='logo' />
      </div>
      <nav>
        <ul className='menu'>
          <li className='selected'>Search</li>
          <li>People</li>
          <li>Movies</li>
          <li>TV Shows</li>
        </ul>
      </nav>
    </section>
  );
}
