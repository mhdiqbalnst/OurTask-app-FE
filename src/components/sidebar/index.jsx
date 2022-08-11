import './sidebar.scss';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import AssignmentIcon from '@mui/icons-material/Assignment';import SettingsIcon from '@mui/icons-material/Settings';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(true);
  let locationPathName = window.location.pathname;
  let pathName = locationPathName.substring(locationPathName.lastIndexOf('/') + 1);
  
  useEffect(() => {
    if(pathName === 'dashboard') {
      document.getElementById('dashboard').classList.add('btn-active');
    }else if (pathName === 'input') {
      document.getElementById('input').classList.add('btn-active');
    }else if (pathName === 'pengaturan') {
      document.getElementById('setting').classList.add('btn-active');
    }

    setTimeout(() => {
      setChecked(true);
    }, 200);
  },[pathName, checked])

  return(<>
    <div className='c-sidebar'>
      <div className='w-sidebar'>
        <div className='border-side'></div>
        <div className='content-side'>
          <div id='dashboard' className='btn-dashboard ' >
            <DashboardRoundedIcon fontSize='small'/> 
            <span>Dashboard</span>
          </div>
          <div id='input' className='btn-dashboard btn-active' onClick={()=> navigate('/')}>
            <AssignmentIcon fontSize='small'/> 
            <span>Task</span>
          </div>
          <div id='setting' className='btn-dashboard'>
            <SettingsIcon fontSize='small'/> 
            <span>Pengaturan</span>
          </div>
        </div>
      </div>
    </div>
  </>)
}

export default Sidebar;