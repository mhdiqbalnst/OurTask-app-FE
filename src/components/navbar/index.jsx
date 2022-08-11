import './navbar.scss';
import logo from '../../images/task.png';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => {

  return(<>
    <div className='container'>
      <div className='navbar'>
        <div className='content-left'>
          <img src={logo} alt="Logo"/>
          <h2>OurTask</h2>
          <div className='btn-navbar'>
            <p>WorkSpaces</p>
            <KeyboardArrowDownIcon fontSize='medium'/>
          </div>
          <div className='btn-navbar'>
            <p>Recent</p>
            <KeyboardArrowDownIcon fontSize='medium'/>
          </div>
        </div>
        <div className='content-right'>
          <div className='search'>
            <SearchIcon fontSize='medium'/>
            <p>Search</p>
          </div>
          <NotificationsNoneIcon style={{ cursor :"pointer" }}/>
          <div className='user'>
            <p>M</p>
          </div>
        </div>
      </div>
    </div>
  
  </>)
}

export default Navbar;
