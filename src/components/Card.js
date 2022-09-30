function Card({ item, index, handleClick }) {
  const itemClass = item.stat ? " active " + item.stat : "";

  return (
    <div className={"card" + itemClass} onClick={() => handleClick(index)}>
      <img src={item.img} alt="" />
    </div>
  );
}

export default Card;
