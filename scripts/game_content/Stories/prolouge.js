import ManImg from "../../../assets/sprites/heroes/hoverPriest.png";
import WomanImg from "../../../assets/sprites/heroes/hoverNinja.png";
import DungeonImg from "../../../assets/sprites/bg/cave.jpg";

export const prologueDialogue = [
  {
    leftChar: { name: "Mysterious Woman", img: WomanImg },
    rightChar: null,
    speakerSide: "left",
    speakerName: "Mysterious Woman",
    text: "... ♪",
    background: DungeonImg
  },
  {
    leftChar: { name: "Mysterious Woman", img: WomanImg },
    rightChar: null,
    speakerSide: "left",
    speakerName: "Mysterious Woman",
    text: "So the prophecy was true after all."
  },
  {
    leftChar: { name: "Mysterious Woman", img: WomanImg },
    rightChar: null,
    speakerSide: "left",
    speakerName: "Mysterious Woman",
    text: "The tower trembles… its collapse draws near."
  },
  {
    leftChar: { name: "Mysterious Woman", img: WomanImg },
    rightChar: null,
    speakerSide: "left",
    speakerName: "Mysterious Woman",
    text: "…Wait."
  },
  {
    leftChar: { name: "Mysterious Woman", img: WomanImg },
    rightChar: { name: "Mysterious Man", img: ManImg },
    speakerSide: "right",
    speakerName: "Mysterious Man",
    text: "That future will never come to pass."
  },
  {
    leftChar: { name: "Mysterious Woman", img: WomanImg },
    rightChar: { name: "Mysterious Man", img: ManImg },
    speakerSide: "right",
    speakerName: "Mysterious Man",
    text: "As long as I still draw breath."
  },
  {
    leftChar: { name: "MC", img: WomanImg },
    rightChar: { name: "Mysterious Man", img: ManImg },
    speakerSide: "right",
    speakerName: "Mysterious Man",
    text: "Your role ends here."
  },
  {
    leftChar: { name: "MC", img: WomanImg },
    rightChar: { name: "Mysterious Man", img: ManImg },
    speakerSide: "left",
    speakerName: "Mysterious Woman",
    text: "Then come… and test fate yourself."
  },
  {
    leftChar: { name: "MC", img: WomanImg },
    rightChar: { name: "Mysterious Man", img: ManImg },
    speakerSide: "right",
    speakerName: "Mysterious Man",
    text: "*steel rings against steel*"
  }
];
