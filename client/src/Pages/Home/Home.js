import React, { useState, useEffect } from 'react'
import './Home.scss'
import randomUserAPI from '../../Components/API/API'
import Boxer from '../../Components/Boxer/BoxerClass'
import Randomize from '../../Components/Helpers/Randomize'
import Commentary from '../../Components/Helpers/Commentary'
import Data from '../../Components/Helpers/Data'
import { Bar } from 'react-chartjs-2'
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const Home = (
  { user, enemy, urls,
    fightNight, setFightNight,
    setUserState, setOppState,
    landingPage, setGenerateBoxersFunc,
    monthCounter, setMonthCounter,
    advanceMonth, setAdvanceMonth,
    fightNumber, setFightNumber,
    // stopFight, setStopFight,
    fightOver, setFightOver,
    setResetFightBtn }) => {

  /***  General State  ***/
  const [ url, setUrl ] = useState(urls[1]);
  const [newBoxerList, setNewBoxerList ] = useState([]);

  /***  Toggles, Counters  ***/
  const [hideGenerateBoxerBtn, setHideGenerateBoxerBtn] = useState(false)
  const [disableFightBtn, setDisableFightBtn] = useState(true);
  const [disableBoxer, setDisableBoxer] = useState(false);
  const [trainingFinished, setTrainingFinished] = useState(false);
  const [opponentsFound, setOpponentsFound] = useState(false);
  const [toggleCard, setToggleCard] = useState(`hide`);
  const [showCardStyle, setShowCardStyle] = useState({});
  const [selectedBoxer, setSelectedBoxer] = useState({})
  const [userToggle, setUserToggle] = useState(true);
  const [oppToggle, setOppToggle] = useState(false);
  const [updatedFightTotals, setUpdatedFightTotals] = useState([]);

  /***  Data Retreival ***/
  const [getHistory] = useState(JSON.parse(localStorage.getItem('fightHistory')));
  const [updateStatus, setUpdateStatus] = useState("Looking for a fight...");
  const getTrainingEntries = Object.entries(user.train);
  const commentary = Commentary();
  const data = Data();
  const boxerListFromLocal = JSON.parse(localStorage.getItem('boxers'));
  const finalTotalsFromLocal = JSON.parse(localStorage.getItem('finalTotals'));

  useEffect(() => {
    console.log(`first useEffect ran`)
    setUpdatedFightTotals(prev => [...prev, finalTotalsFromLocal])
    setGenerateBoxersFunc({ generate: generateBoxer });
    // setDisableFightBtn(true);
    return () => {
      localStorage.setItem('careerTotals', updatedFightTotals)
    }
  }, [])

  useEffect(() => {
    setFightNight(false)
    user.knockdownCount = 0;
    setDisableFightBtn(true);
  }, [])

  useEffect(() => {
    if (!fightOver && !fightNight) setDisableFightBtn(true);
  }, [fightOver, fightNight])

  useEffect(() => {
    if (user.hp <= user.maxHp*0.35 || !fightNight) {
      setDisableFightBtn(true);
      setOppToggle(false)
    }
  }, [fightNight, user.maxHp, user.hp])

  useEffect(() => {
    if (monthCounter === 4) {
    setDisableFightBtn(false);
    }
  }, [monthCounter])

  // Must recover user.hp before continuing to next fight! Map all training and recovery options, sync with weekly calendar.

  /***  Make calls to randomUserAPI to aggregate list of opponents, set conditions later  ***/
  const generateBoxer = () => {
    randomUserAPI.get()
      .then(response => {
        setHideGenerateBoxerBtn(true);
        //create instance of boxer directly, outside of this method will re-instantiate each object.
        const convertRandosToBoxers = [...response.data.results].map(each => {
          const newOne = generateBoxerWithAPI(each)
          return newOne
        })
        setNewBoxerList(prev => [...prev, ...convertRandosToBoxers]);
        setUpdateStatus('Opponents found.');
        setOpponentsFound(true);
      })
      .catch(err => {
        setHideGenerateBoxerBtn(true);
        setUpdateStatus(
          <div className='no-luck'>
            <h5>"No opponents found yet! Advance month for a new search."</h5>
          </div>);
      })
  }
  
  const generateBoxerWithAPI = (input) => {
    const newUserFromAPI = input
    //create level scaling later
    const firstName = `${newUserFromAPI.name.first}`;
    const nickname = '';
    const lastName = `${newUserFromAPI.name.last}`;
    const hometown = `${newUserFromAPI.location.city}, ${newUserFromAPI.location.country}`;
    const weight = Randomize(125, 250);
    const favColor = ``;
    const stamina = Randomize(50, 100);
    const aggression = Randomize(50, 100);
    const agility = Randomize(50, 100);
    const strength = Randomize(50, 100);
    const defense = Randomize(50, 100);
    const heart = Randomize(50, 100);

    const newBoxer = new Boxer(
      firstName, nickname, lastName, hometown, weight, favColor,
      stamina, aggression, agility, strength, defense, heart
    );
    //Optional attributes before returning
    newBoxer.win = Randomize(0, 40);
    newBoxer.loss = Randomize(0, 30);
    newBoxer.favoriteColor = data.colorNames[Randomize(0, data.colorNames.length )]

    return newBoxer;
  }

  const expandCardOnClick = (each, toggle) => {
    return (
    <>
      <div className='boxer-card-row'>
        <div className='boxer-card-column'>
          <h4><strong>{`${each.firstName} ${each.lastName}`}</strong></h4>
        </div>
        <div className='boxer-card-column'>
          <h4>{`${each.win}-${each.loss}`}</h4>
        </div>
        <div className='boxer-card-column'>
          <h5>{commentary.weightClassName(each)}</h5>
        </div>
        <div className='boxer-card-column'>
          <h5>Rank: {each.rank}</h5>
        </div> 
      </div>
      <div className={`boxer-card-details ${toggleCard}`}>
        <h3>Hometown:</h3>
        <h4 className='hometown-h4'>{each.hometown}</h4>

        <ul className='attributes'>
          <h3>Ratings:</h3>
          <li><h4>Speed: {each.agi}</h4></li>
          <li><h4>Power: {each.str}</h4></li>
          <li><h4>Conditioning: {Math.round(each.con*100)}</h4></li>
          <li><h4>Defense: {each.def}</h4></li>
          <li><h4>Chin: {Math.round(each.chin)}</h4></li>
          <li><h4>Heart: {each.heart}</h4></li>
        </ul> 
      </div>
    </>
    )
}

  const mapOpponents = () => { //Map these badboys onto the DOM
    return newBoxerList.map((each, i) => {
      return (
        <button className='boxer-card' disabled={disableBoxer}
        style={showCardStyle}
        onClick={(e) => {
          e.stopPropagation();
          setSelectedBoxer(each);
          setOppToggle(true);
          if (toggleCard === 'hide') {
            setToggleCard('show')
            setOppState(each);
            setShowCardStyle({
              display: 'flex',
              position: 'absolute',
              left: `10%`,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              padding: `10%`,
              height: '30vh',
              width: `80%`,
              transitionDuration: `300ms`,
              boxShadow: `2px 2px 8px 1px rgba(25,25,25, 0.1)`
            })
            expandCardOnClick(selectedBoxer, toggleCard);
            console.log(newBoxerList)
          } else {
            setSelectedBoxer(enemy);
            setToggleCard('hide');
            // setDisableBoxer(true);
            setShowCardStyle({});
          }
        }}>

          { toggleCard === 'hide' ? expandCardOnClick(each, toggleCard) : expandCardOnClick(selectedBoxer, toggleCard) }

      </button>
      )
    })
  }
  
  const generateListOfBoxers = //Button that generates a new list of opponents, makes API calls
    <div id={'generator-btn'}>
      <h5>Opponents:</h5>
    </div>

  const getUpdatedBoxerStats = () => {
    if (updatedFightTotals.hasOwnProperty(user.firstName)) {
      return updatedFightTotals.reduce((acc, curr, i) => acc = curr.finalTotals[i][user.firstName], 0)
    } else {
      return 1;
    }
  }
  console.log(getUpdatedBoxerStats(), updatedFightTotals)

  const dataForHomeStats = {
    labels: [
      ""
    ],
    datasets: [
      {
        data: [getUpdatedBoxerStats()],
        backgroundColor: [
          `${user.favoriteColor}`,
        ],
        borderColor: ['white'],
        borderWidth: '1',
        barPercentage: 0.35,
        animation: 'easeInOutBounce'
      },
      {
        data: [`100`],
        backgroundColor: [
          'rgba(255, 255, 255, 0.9)',
        ],
        borderColor: [''],
        borderWidth: '1',
        barPercentage: 0.4,
        animation: false
      },
    ]
  }

  const options = {
    indexAxis: ``,
    scales: {
      y: 
      {
          stacked: true,
          beginAtZero: true
      }
    },
    plugins: {
      legend: { display: false, position: 'absolute'},
    },
  }
  
  const boxerCardsAtHomePage = (boxer , toggle) => {
    return (
      <>
        <div className='home-gym-user'>
          { toggle ? 
          <div className='home-gym-boxer-info'>
            <h2>{boxer.firstName}</h2>
            <h2>{boxer.lastName}</h2>
            <h4>Record: {boxer.win} - {boxer.loss}</h4>
            <h4>Condition: {Math.round((boxer.hp/boxer.maxHp)*100)}%</h4>
          </div>

          :

          <div className="no-selected-boxer">
            <h2>Select your next opponent</h2>
          </div>
        }
        </div>

        <div className='home-gym-stats'>
          { boxer.firstName === user.firstName ? <Bar data={dataForHomeStats} options={options} /> :
            <h3>Choose your destiny</h3>
          }
        </div>
      </>
    )
  }

  return (
    <div className="main-container-wrap" id={`home-gym-container-wrap`} style={{ backgroundImage: url }}>
      <div className="main-container" id="home-gym-container">

        {/*** Left Grid ***/}

        <div className='home-gym-nav'>

          {boxerCardsAtHomePage(user, true)}

          <div className='home-gym-train'>
            <h4>Training (use icons later):</h4>
            {getTrainingEntries.map((each, i) => {
              return (
                <button key={`training-buttons-${i}`} className="training-buttons" disabled={trainingFinished}
                  onClick={()=>{
                    each[1]();
                    setTrainingFinished(true); }}>
                  <h5>{each[0]}</h5>
                </button>
              )
            })}
          </div>
        </div>

        {/***  Center Grid  ***/}

        <div className='home-gym-main'>
            <div className='headlines-container'>
              {/* CSS Ticker */}
              <div className="ticker-wrap">
                <div className="ticker">
                  <div className="ticker__item">
                    <h5>Welcome to the home gym.</h5>
                  </div>
                  <div className="ticker__item">
                    <h5>Click to train, advance the month, or just sit and appreciate life.</h5>
                  </div>
                  <div className="ticker__item">
                    <h5>You take fights every 4 months no questions asked!</h5>
                  </div>
                </div>
              </div>
          </div>

          <div className={`inner-container`} id={`home-gym-feed`}>
            <div className='home-gym-display'>
              <div className='generate-boxer-button'>
                <h5>{!hideGenerateBoxerBtn ? generateListOfBoxers : updateStatus}</h5>
              </div>
              <div className='boxer-list'>
                { mapOpponents() }                
              </div>

            </div>

            <div className="home-options">
              <div className="home-select-menu">
                <button className={`home-buttons advance`} disabled={advanceMonth}
                onClick={(event)=> {
                  setHideGenerateBoxerBtn(false);
                  setMonthCounter(monthCounter+1);
                  setTrainingFinished(false);
                  if (monthCounter === 11) setMonthCounter(0);
                  event.stopPropagation();
                  console.log(`check selectedBoxer at advance`, selectedBoxer, selectedBoxer.lifeLeft())

                }}>
                  <h2>Advance Month</h2>
                </button>
                <button className={`home-buttons to-fight`} disabled={disableFightBtn}
                  onClick={(e)=> {
                    e.preventDefault();
                    setFightOver(false);    
                    setFightNight(true);
                    setResetFightBtn(true);
                    setFightNumber(fightNumber+1);
                    setTrainingFinished(false);
                    console.log(`check selectedBoxer at fightBtn`, selectedBoxer, selectedBoxer.lifeLeft())
                }}> <h2>Fight Night</h2> </button>
              </div>
            </div>
          </div>
        </div>

        {/*** Right Grid ***/}

        <div className="home-gym-rankings">
          <div className="home-rankings-info">

            { boxerCardsAtHomePage(selectedBoxer, oppToggle) }
            
            <div className="official-rankings">              
              <h2>Previous Fight History goes here.</h2>
              <h6>W (TKO) Fighter Example</h6>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Home