import { useState, useEffect } from "react";
import Card from "./Card";

function Cards({ setRunning }) {
  const [items, setItems] = useState(
    [
      { id: "p", img: "/images/pumpkin.png", stat: "" },
      { id: "p", img: "/images/pumpkin.png", stat: "" },
      { id: "g", img: "/images/ghost.png", stat: "" },
      { id: "g", img: "/images/ghost.png", stat: "" },
      { id: "b", img: "/images/black-cat.png", stat: "" },
      { id: "b", img: "/images/black-cat.png", stat: "" },
      { id: "c", img: "/images/candy.png", stat: "" },
      { id: "c", img: "/images/candy.png", stat: "" },
      { id: "p", img: "/images/poison.png", stat: "" },
      { id: "p", img: "/images/poison.png", stat: "" },
      { id: "s", img: "/images/spider.png", stat: "" },
      { id: "s", img: "/images/spider.png", stat: "" },
      { id: "z", img: "/images/zombie.png", stat: "" },
      { id: "z", img: "/images/zombie.png", stat: "" },
      { id: "w", img: "/images/witch.png", stat: "" },
      { id: "w", img: "/images/witch.png", stat: "" },
    ].sort(() => Math.random() - 0.5)
  );

  const [stats, setStats] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [endGame, setEndsGame] = useState(false);

  useEffect(() => {
    if (stats.length === 16) {
      setRunning(false);
      setEndsGame(true);
    }
  }, [stats]);

  function check(currentIndex) {
    // compare the last two items you have selected
    // if the two last items have the same id
    if (items[currentIndex].id === items[prevIndex].id) {
      console.log("items match");
      // set the status to correct
      items[currentIndex].stat = "correct";
      items[prevIndex].stat = "correct";
      setPrevIndex(-1);
      setItems([...items]);
      setStats(items.filter((item) => item.stat === "correct"));
    } else if (items[currentIndex].id !== items[prevIndex].id) {
      console.log("items do not match");
      items[currentIndex].stat = "wrong";
      items[prevIndex].stat = "wrong";
      setItems([...items]);
      setTimeout(() => {
        items[currentIndex].stat = "";
        items[prevIndex].stat = "";
        setItems([...items]);
        setPrevIndex(-1);
      }, 1000);
    }
  }

  function handleClick(index) {
    if (!endGame) {
      if (prevIndex === -1 && items[index].stat !== "correct") {
        console.log("first item");
        items[index].stat = "active";
        setItems([...items]);
        setPrevIndex(index);
        setRunning(true);
      } else if (index !== prevIndex && items[index].stat !== "correct") {
        console.log("second item");
        check(index);
      }
    }
  }

  return (
    <div className="container">
      {items.map((item, index) => (
        <Card item={item} key={index} index={index} handleClick={handleClick} />
      ))}
    </div>
  );
}

export default Cards;
