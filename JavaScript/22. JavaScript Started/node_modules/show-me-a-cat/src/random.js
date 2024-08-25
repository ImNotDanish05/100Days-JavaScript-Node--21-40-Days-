import catsList from "./catsList";

const random = () => {
  return catsList[Math.floor(Math.random() * catsList.length)];
}

export default random