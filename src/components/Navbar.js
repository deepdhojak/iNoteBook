import React from 'react'
//import {a, useLocation } from "react-router-dom";
//  import {useNavigate} from 'react-router-dom'


const Navbar= () => {
  // let navigate= useNavigate();
  const handleLogout = ()=>{
    localStorage.removeItem('token');
    // navigate('/login');
  }
  // let   location = useLocation();

  // useEffect(() => {

  // }, [location]);
  
 
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">iNoteBook</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Home</a>
              </li>
              {/* <li className="nav-item">
                <a className={`nav-a ${location.pathname==="/about"?"active":""}`} href="/about">About</a>
              </li> */}

            </ul>
            {/* {!localStorage.getItem('token')?<form className="d-flex" >
              <a className="btn btn-primary mx-1" href="/login" role="button">Login</a>
              <a className="btn btn-primary mx-1" href="/signup" role="button">Signup</a>
            </form>: <a onClick={handleLogout} className="btn btn-primary mx-1"  role="button">Logout</a>}
         */} </div> 
        </div>
      </nav>
    )
  
}

export default Navbar
