import './App.css';
import Midnav from './midnav';
import Card from './components/card';
import Icon from '@mdi/react';
import { mdiSunWirelessOutline } from '@mdi/js'
import { FaRedo } from 'react-icons/fa';
function App() {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <div className="container-fluid topnav">

        <h4 >      <Icon path={mdiSunWirelessOutline} size={1} />Weather 99</h4>
        <button onClick={refreshPage}><FaRedo  />Refresh</button>
      </div>
      <div className="main">

        <div className="row">
          <div className="col-sm-12">
            <Midnav />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <div className="container-fluid info_container">
              <div className="row ph_row ">
                <div className=" col side_col">
                  <form action="">
                  <label htmlFor="date">Select Date: </label>
                  <input type="date" name="date" id="date"
                    />
                  </form>
                  <div className="heading">
                  <br />
                  High Temperature<br/>

                  Low Temperature<br/>

                  Humidity<br/>

                  Sunrise Time<br/>

                  Sunset Time<br/>
                  </div>
                </div>
                <div className="col  ">
                  <Card/>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
