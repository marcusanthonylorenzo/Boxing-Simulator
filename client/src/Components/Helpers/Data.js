import Boxer from '../Boxer/BoxerClass';
import homegym from '../../assets/images/homegym.jpg'

const temp = () => {

  //Test boxers
  const user = new Boxer(
    "Marcus", "catdog", "Lorenzo", //first, nickname, last
    "Melbourne, Australia", "145",
    "Forestgreen",  //Hometown, Weight (string)
    80, 83, 81, 83, 78  //stamina, agressivness, agility, strength, defense
  );

  const enemy = new Boxer(
    "Allan", "Loser", "Volvo", //first, nickname, last
    "Melbourne, Australia", "195",
    "Navy", //Hometown, Weight (string)
    81, 83, 73, 83, 85  //stamina, agressivness, agility, strength, defense
  );


  const urls = [
    `url('https://www.matchroomboxing.com/app/uploads/2020/07/Untitled-1-1.jpg')`,
    `url('${homegym}')`
  ]

  return { user, enemy, urls }

}

export default temp