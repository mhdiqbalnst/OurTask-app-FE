import { useNavigate } from 'react-router-dom';
import { useState ,useEffect } from 'react';
import axios from 'axios';
import './dashboard.scss';
import Sidebar from '../../components/sidebar';
import Navbar from '../../components/navbar';
import AssignmentIcon from '@mui/icons-material/Assignment';import SettingsIcon from '@mui/icons-material/Settings';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Popover from '@mui/material/Popover';

const Dashboard = () => {
  const navigate = useNavigate();
  const [arr, setArr] = useState([])
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = useState(new Date());
  const [detailTask, setDetailTask] = useState('');
  const [member, setMember] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editID, setEditID] = useState('')
  const [arrEdit, setArrEdit] = useState([]);

  useEffect(() => {
    
    axios.get("https://ourtask-app.herokuapp.com/tasks")
    .then(({data}) => {
      setArr(data)
    }).catch(err => {
      console.log(err);
    })
  },[axios])

  const logout = () => {
    localStorage.removeItem('login');
    navigate('/');
  }

  const handleChangeTime = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const objInput = {
      "detail_task" : detailTask,
      "member"      : member,
      "deadline"    : value,
      "progress"    : "todo"
    }

    axios.post("https://ourtask-app.herokuapp.com/tasks", objInput)
    .then((data) => {
      setOpen(false)
      setDetailTask('')
      setMember('')
      window.location.reload();
    }).catch(err => {
      console.log(err);
    })
  }

  const handleDoIt = (key) => {

    const objEdit = arr.find((el, i) => el.ID === +key)

    const edit = {
      "detail_task" : objEdit.Detail_task,
      "member"      : objEdit.Member,
      "deadline"    : objEdit.Deadline,
      "progress"    : "doing"
    }
     
    axios.put(`https://ourtask-app.herokuapp.com/tasks/${objEdit.ID}`, edit)
    .then((data) => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    })
  }

  const handleDone = (key) => {

    const objEdit = arr.find((el, i) => el.ID === +key)

    const edit = {
      "detail_task" : objEdit.Detail_task,
      "member"      : objEdit.Member,
      "deadline"    : objEdit.Deadline,
      "progress"    : "done"
    }
     
    axios.put(`https://ourtask-app.herokuapp.com/tasks/${objEdit.ID}`, edit)
    .then((data) => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    })
  }

  const handleEdit = (event, id) => {
    setAnchorEl(event.currentTarget);

    const objEdit = arr.find((el, i) => el.ID === +id)

    setArrEdit(objEdit)
  };

  const handleClosePop = () => {
    setAnchorEl(null);
  };

  const openPop = Boolean(anchorEl);
  const id = openPop ? 'simple-popover' : undefined;

  const editTodo = (e) => {
    e.preventDefault()

    const objEdit = {
      "detail_task" : detailTask,
      "member"      : member,
      "deadline"    : value,
      "progress"    : "todo"
    }

    axios.put(`https://ourtask-app.herokuapp.com/tasks/${editID}`, objEdit)
    .then((data) => {
      window.location.reload();
      setDetailTask('')
      setMember('')
    }).catch(err => {
      console.log(err);
    })
   

  }

  const deleteTodo = (id) => {

    axios.delete(`https://ourtask-app.herokuapp.com/tasks/${id}`)
    .then((data) => {
      window.location.reload();
    }).catch(err => {
      console.log(err);
    })
  }

  return(
  <>
  <Navbar />
    <div className='container-input'>
      <div className='layout-input'>
        <Sidebar />
        <div className='content-input'>
          
         {!edit && 
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className='container-form'>
                <div className='modal-form'>
                  <form onSubmit={(e) => handleSubmit(e)}>
                    <h2>To do</h2>
                    <TextField style={{ width : '100%', marginTop : '20px'  }} id="outlined-basic" label="Detail Task" variant="outlined" 
                      onChange={(e) => setDetailTask(e.target.value)}
                    />
                    <TextField style={{ width : '100%', marginTop : '20px'  }} id="outlined-basic" label="Assigned" variant="outlined" 
                      onChange={(e) => setMember(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Deadline"
                        inputFormat="dd/MM/yyyy"
                        value={value}
                        onChange={handleChangeTime}
                        renderInput={(params) => <TextField style={{ width : '100%', marginTop : '25px'  }} {...params} />}
                      />
                    </LocalizationProvider>
                    <button type='submit' className='btn-submit'>Buat</button>
                  </form>
                </div>
              </div>
            </Fade>
          </Modal>
         }
         {edit && 
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <div className='container-form'>
                <div className='modal-form'>
                  <form onSubmit={(e) => editTodo(e)}>
                    <h2>To do</h2>
                    <TextField style={{ width : '100%', marginTop : '20px'  }} id="outlined-basic" label="Detail Task" variant="outlined" value={detailTask}
                      onChange={(e) => setDetailTask(e.target.value)}
                    />
                    <TextField style={{ width : '100%', marginTop : '20px'  }} id="outlined-basic" label="Assigned" variant="outlined" value={member}
                      onChange={(e) => setMember(e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DesktopDatePicker
                        label="Deadline"
                        inputFormat="dd/MM/yyyy"
                        value={value}
                        onChange={handleChangeTime}
                        renderInput={(params) => <TextField style={{ width : '100%', marginTop : '25px'  }} {...params} />}
                      />
                    </LocalizationProvider>
                    <button type='submit' className='btn-submit'>Edit</button>
                  </form>
                </div>
              </div>
            </Fade>
          </Modal>
         }
          <header>
            <h2><span><AssignmentIcon /></span> Task</h2>
            <div className='list-header'>
              <p>Board</p>
              <p>Timeline</p>
            </div>
          </header>
          <main>
            <div className='content-task'>
              <div className='content-top'>
                <h2>To do</h2>
                <ControlPointIcon 
                  style={{ cursor : 'pointer' }}
                  onClick={handleOpen}
                />
              </div>
              <div className='content-body'>
              <Popover
                id={id}
                open={openPop}
                anchorEl={anchorEl}
                onClose={handleClosePop}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
              >
                <div className='popover'>
                  <p onClick={() => {setEditID(`${arrEdit.ID}`); setDetailTask(`${arrEdit.Detail_task}`); setMember(`${arrEdit.Member}`); setEdit(true); setOpen(true)}}>Edit</p>
                  <p onClick={() => deleteTodo(`${arrEdit.ID}`)}>Delete</p>
                </div>
                </Popover>
                {arr.map((el, i) => el.Progress === "todo" ? 
                <div className='card-task' key={i}>
                  <div className='edit'>
                    <MoreVertIcon fontSize='small'
                      onClick={(e) => handleEdit(e, `${el.ID}`)}
                    />
                  </div>
                  <div className='detail'>
                    <p>{el.Detail_task}</p>
                  </div>
                  <div className='deadline'>
                    <p>Deadline</p>
                    <p>{el.Deadline}</p>
                  </div>
                  <div className='member'>
                    <div className='content-left'>
                      <p>Assigned :</p>
                      <p>{el.Member}</p>
                    </div>
                    <div className='content-right'>
                      <button className='btn-next' onClick={() => handleDoIt(`${el.ID}`)}>Do it</button>
                    </div>
                  </div>
                </div>
                :
                ''
                )}
              </div>
            </div>
            <div className='content-task'>
              <div className='content-top'>
                  <h2>Doing</h2>
                  <MoreVertIcon style={{ cursor : 'pointer' }}/>
                </div>
                <div className='content-body'>
                {arr.map((el, i) => el.Progress === "doing" ? 
                <div className='card-task' key={i}>
                  <div className='detail'>
                    <p>{el.Detail_task}</p>
                  </div>
                  <div className='deadline'>
                    <p>Deadline</p>
                    <p>{el.Deadline}</p>
                  </div>
                  <div className='member'>
                    <div className='content-left'>
                      <p>Assigned :</p>
                      <p>{el.Member}</p>
                    </div>
                    <div className='content-right'>
                      <button className='btn-done' onClick={() => handleDone(el.ID)}>Done</button>
                    </div>
                  </div>
                </div>
                :
                ''
                )}
                </div>
              </div>
            <div className='content-task'>
              <div className='content-top'>
                  <h2>Done</h2>
                  <MoreVertIcon style={{ cursor : 'pointer' }}/>
                </div>
                <div className='content-body'>
                {arr.map((el, i) => el.Progress === "done" ? 
                <div className='card-task' key={i}>
                  <div className='detail'>
                    <p>{el.Detail_task}</p>
                  </div>
                  <div className='deadline'>
                    <p>Deadline</p>
                    <p>{el.Deadline}</p>
                  </div>
                  <div className='member'>
                    <div className='content-left'>
                      <p>Assigned :</p>
                      <p>{el.Member}</p>
                    </div>
                  </div>
                </div>
                :
                ''
                )}
                </div>
              </div>
          </main>
        </div>
      </div>
    </div>
  </>)
}

export default Dashboard;