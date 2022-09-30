import { useState, useEffect } from "react";
import Card from "./Card";

function Cards({ setRunning }) {
  const [items, setItems] = useState(
    [
      { id: 1, img: "/images/pumpkin.png", stat: "" },
      { id: 1, img: "/images/pumpkin.png", stat: "" },
      { id: 2, img: "/images/ghost.png", stat: "" },
      { id: 2, img: "/images/ghost.png", stat: "" },
      { id: 3, img: "/images/black-cat.png", stat: "" },
      { id: 3, img: "/images/black-cat.png", stat: "" },
      { id: 4, img: "/images/candy.png", stat: "" },
      { id: 4, img: "/images/candy.png", stat: "" },
      { id: 5, img: "/images/poison.png", stat: "" },
      { id: 5, img: "/images/poison.png", stat: "" },
      { id: 6, img: "/images/spider.png", stat: "" },
      { id: 6, img: "/images/spider.png", stat: "" },
      { id: 7, img: "/images/zombie.png", stat: "" },
      { id: 7, img: "/images/zombie.png", stat: "" },
      { id: 8, img: "/images/witch.png", stat: "" },
      { id: 8, img: "/images/witch.png", stat: "" },
    ].sort(() => Math.random() - 0.5)
  );

  const [stats, setStats] = useState(0);
  const [prevIndex, setPrevIndex] = useState(-1);
  const [endGame, setEndsGame] = useState(false);
  const [click, setClick] = useState(true);

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
      setClick(false);
      setTimeout(() => {
        items[currentIndex].stat = "";
        items[prevIndex].stat = "";
        setItems([...items]);
        setPrevIndex(-1);
        setClick(true);
      }, 1000);
    }
  }

  function handleClick(index) {
    if (!endGame && click) {
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
        <Card
          item={item}
          key={index}
          index={index}
          handleClick={handleClick}
          click={click}
        />
      ))}
    </div>
  );
}

export default Cards;
