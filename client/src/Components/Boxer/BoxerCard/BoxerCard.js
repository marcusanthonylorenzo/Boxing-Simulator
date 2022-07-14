import React, { useState, useEffect} from 'react'
import './BoxerCard.css'
import Commentary from '../../Helpers/Commentary'
import goldBelt from '../../../assets/images/goldBelt.png'

const BoxerCard = ({ boxer, path, corner, pbp, roundCount, exchangeCount }) => {

  const commentary = Commentary();  //unpack running function component to get objects to unpack
  const life = Math.round(boxer.lifeLeft()*100);
  const energy = Math.round((boxer.con*100)+20);
  const cornerColor = corner(); //boxers ready with extra fight properties compared to normal user/enemy
  const dmgScale = cornerColor.dmgScale(); //scales animation properties based on health
  const getColor = cornerColor.cornerColor; //color of corner
  const favColor = cornerColor.favoriteColor;
  const [show, setShow] = useState(`hide`);
  const [fade, setFade] = useState(``);

  const boxerName = boxer.firstName;
  const [dmgTracker, setDmgTracker] = useState([]) //tracks each punch for graphs
  const [engagementCount, setPunchCount] = useState(0)

  const showHide = (show, set) => {
    if (show) {
      set(`hide`);
    } else if (!show) {
      set(`show`);
    }
  }

  useEffect(() =>{
    setPunchCount(engagementCount + 1)
    let exc = { boxerName, roundCount, engagementCount, exchangeCount, dmgScale }
    setDmgTracker((dmgTracker) => [...dmgTracker, exc]);
    // console.log(boxer.firstName, dmgTracker)
  }, [dmgScale, exchangeCount])


  let dmgStats = dmgTracker.reduce((totalDmg, each) => each.dmgScale ? totalDmg += each.dmgScale : null, 0)

  // console.log(pbp, dmgTracker)

  /*** .dmgScale is the output of damage, can use with agi to calc punch output and plot to graph */

  useEffect(() => {
    if (cornerColor.side === "right"){ //timing delays for opponent
      setTimeout(() => {
        setShow(`show`); //show, fade, hide
      },  1000);

      setTimeout(() => {
      setFade(`75%`);
      }, 3600);

      // setTimeout(() => {
      //   setShow(`hide`);
      // }, 9000);

    } else if (cornerColor.side === "left"){ //timing delays for user
      setTimeout(() => {
        setShow(`show`);
      },  3000);

      setTimeout(() => {
        setFade(`75%`);
      },  7300);

      // setTimeout(() => {
      //   setShow(`hide`);
      // }, 9000);
    }
    }, []);


  const changeColor = (life) => {
    if (life <= 100 && life >= 75) {
      return `#00b424`
    } else if (life <= 75 && life > 50) {
      return `#bce920`;
    } else if (life <= 50 && life > 35) {
      return `#fffc1e`;
    } else if (life <= 35 && life > 19) {
      return `#f58000`;
    } else if (life <= 19) {
      return `#e80000`;
    }
  }
  
  const koColor = (energy) => boxer.hp <= 0 ? `50%` : `${energy}%`
  const flip = () => cornerColor.side !== 'left' ? '' : ''

  
  const dmgScaleRegulator = () => {
    let descale = 100 - dmgScale;
    if (descale >= 100) {
      descale = 100
    } else {
      return descale
    } return descale + 0.5;
  }

  const mainCard =  () => { //Conditional Rendering ref for fighter card switching between intro, and realtime fight stats
    return (
          <>
          <div className="boxer-info border padded" >

          <div className="boxer-info-name">
            <h4 className={'name'} style={{
              backgroundColor: cornerColor.favoriteColor }}>
              <em>{boxer.firstName}</em>
            </h4>

            <h4 id={`nickname`} style={{
              fontWeight: `200px`,
              backgroundColor: favColor}}>
              <em>"{boxer.nickname}"</em>
            </h4>

            <h4 className={'name'} style={{
              backgroundColor: favColor }}>
              <em>{boxer.lastName}</em>
            </h4>
          </div>

          <div className="boxer-condition" style={{ backgroundColor: changeColor(life), opacity: koColor(energy) }}>
            <div className={`boxer-condition-body ${flip()}`} //exists if you want to flip a profile pic in future
              style={{
              backgroundColor: changeColor(life), //Change phyiscal condition by color, red is near knockout
              backgroundImage: `url('${path}')`,
              opacity: koColor(energy),
              transform: `scale(${dmgScaleRegulator()}% -1)`
            }}>
              <img src={path} alt={'boxer body'} className="boxer-pic"
                style={{ 
                transform: `scale(${dmgScaleRegulator()}%)`,
                opacity: koColor(),
              }}/>
              <h5 style={{display: 'flex', position: 'absolute', color: `white`}}>
                {Math.round(boxer.hp)} {life} {Math.round((boxer.con*100))}
              </h5>
            </div>
          </div>
        </div>

        <div className={`fight-stats border padded`}>
          <h3 style={{ color: favColor, filter: `brightness(1.5)`}}>
            Fight stats brought to you by Modelo.
          </h3>
        </div>

        <div className={'boxer-info-profile border padded'} style={{ backgroundColor: favColor}}>
          <h5 className={`info-titles`}>Height / Weight / Reach:</h5>
          <h5> Height {boxer.weightClass} Reach </h5>
          <h5 className={`info-titles`}>Fighting out of:</h5>
          <h5 className={'info-details'}><em>{boxer.hometown}</em></h5>  
          <h5 className={`info-titles`}>Record:</h5>
          <h5 className={'info-details'}>{boxer.win} - {boxer.loss}</h5>  
          <h5 className={`info-titles`}>Rank:</h5>
          {
            boxer.champion ?
              <span className={`champ`}> <h5>CHAMPION</h5> <img src={goldBelt} id={`champ`} alt="CHAMPION"/>
              </span> : <h5 className={'info-details'}>
              {boxer.rank} <em style={{marginLeft: `3%`}}> ({ commentary.weightClassName(boxer) }) </em>
            </h5>
          }
        </div>
    </>
    )}


  return (
    <>
    <div className={`BoxerCard`}>

      { //if round count is 0, fight has not begun, display intro cards first
      roundCount === 0 ?
      <div className={`intros-${cornerColor.side} ${show}`}
        style={{opacity: fade, color: boxer.favoriteColor}}
        onClick={(e) => {
          e.preventDefault();
          showHide();
      }}>
        {/* // style={{backgroundColor: }}> */}
        {commentary.setIntros({...cornerColor, weightClass: commentary.weightClassName(boxer)}, boxer.favoriteColor)}</div> : mainCard()
      }

    </div>
    </>
  )
}

export default BoxerCard