import Boxer from '../Boxer/BoxerClass';
import homegym from '../../assets/images/homegym.jpg'

const data = () => {

  //Test boxers
  const user = new Boxer(
    "Marcus", "catdog", "Lorenzo", //first, nickname, last
    "Melbourne, Australia", "145",
    "Forestgreen",  //Hometown, Weight (string)
    80, 83, 81, 83, 78, 80  //stamina, agressivness, agility, strength, defense
  );

  const enemy = new Boxer(
    "Allan", "Loser", "Volvo", //first, nickname, last
    "Melbourne, Australia", "195",
    "Navy", //Hometown, Weight (string)
    81, 83, 73, 83, 85, 80  //stamina, agressivness, agility, strength, defense
  );

  const urls = [
    `url('https://www.matchroomboxing.com/app/uploads/2020/07/Untitled-1-1.jpg')`,
    `url('${homegym}')`
  ]

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const colorNames = [
    // "AliceBlue",
    // "AntiqueWhite",
    "Aqua",
    // "Aquamarine",
    // "Azure",
    // "Beige",
    // "Bisque",
    "Black",
    "BlanchedAlmond",
    "Blue",
    "BlueViolet",
    "Brown",
    "BurlyWood",
    "CadetBlue",
    "Chartreuse",
    "Chocolate",
    "Coral",
    "CornflowerBlue",
    // "Cornsilk",
    "Crimson",
    "Cyan",
    "DarkBlue",
    "DarkCyan",
    "DarkGoldenRod",
    "DarkGray",
    "DarkGrey",
    "DarkGreen",
    "DarkKhaki",
    "DarkMagenta",
    "DarkOliveGreen",
    "DarkOrange",
    "DarkOrchid",
    "DarkRed",
    "DarkSalmon",
    "DarkSeaGreen",
    "DarkSlateBlue",
    "DarkSlateGray",
    "DarkSlateGrey",
    "DarkTurquoise",
    "DarkViolet",
    "DeepPink",
    "DeepSkyBlue",
    "DimGray",
    "DimGrey",
    "DodgerBlue",
    "FireBrick",
    // "FloralWhite",
    "ForestGreen",
    "Fuchsia",
    "Gainsboro",
    // "GhostWhite",
    "Gold",
    "GoldenRod",
    // "Gray",
    // "Grey",
    "Green",
    "GreenYellow",
    // "HoneyDew",
    "HotPink",
    // "IndianRed",
    // "Indigo",
    // "Ivory",
    // "Khaki",
    "Lavender",
    "LavenderBlush",
    "LawnGreen",
    // "LemonChiffon",
    // "LightBlue",
    // "LightCoral",
    // "LightCyan",
    // "LightGoldenRodYellow",
    // "LightGray",
    // "LightGrey",
    // "LightGreen",
    // "LightPink",
    // "LightSalmon",
    // "LightSeaGreen",
    // "LightSkyBlue",
    // "LightSlateGray",
    // "LightSlateGrey",
    // "LightSteelBlue",
    // "LightYellow",
    "Lime",
    "LimeGreen",
    "Linen",
    "Magenta",
    "Maroon",
    "MediumAquaMarine",
    "MediumBlue",
    "MediumOrchid",
    "MediumPurple",
    "MediumSeaGreen",
    "MediumSlateBlue",
    "MediumSpringGreen",
    "MediumTurquoise",
    "MediumVioletRed",
    "MidnightBlue",
    // "MintCream",
    "MistyRose",
    "Moccasin",
    // "NavajoWhite",
    "Navy",
    "OldLace",
    "Olive",
    "OliveDrab",
    "Orange",
    "OrangeRed",
    "Orchid",
    // "PaleGoldenRod",
    "PaleGreen",
    "PaleTurquoise",
    "PaleVioletRed",
    "PapayaWhip",
    "PeachPuff",
    "Peru",
    "Pink",
    "Plum",
    "PowderBlue",
    "Purple",
    "RebeccaPurple",
    "Red",
    "RosyBrown",
    "RoyalBlue",
    "SaddleBrown",
    // "Salmon",
    "SandyBrown",
    "SeaGreen",
    // "SeaShell",
    "Sienna",
    "Silver",
    "SkyBlue",
    "SlateBlue",
    // "SlateGray",
    // "SlateGrey",
    // "Snow",
    // "SpringGreen",
    "SteelBlue",
    "Tan",
    "Teal",
    "Thistle",
    "Tomato",
    "Turquoise",
    "Violet",
    "Wheat",
    // "White",
    // "WhiteSmoke",
    "Yellow",
    "YellowGreen",
  ];

  return { user, enemy, urls, monthNames, colorNames }
}

export default data