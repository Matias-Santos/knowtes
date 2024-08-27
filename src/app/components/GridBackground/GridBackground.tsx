import "./styles.scss";

export default function GridBackground() {
  const gridItems = [];

  // Create a 64 by 24 grid
  for (let row = 0; row < 40; row++) {
    for (let col = 0; col < 64; col++) {
      gridItems.push(<div key={`${row}-${col}`} className="gridItem"></div>);
    }
  }

  return (
    <div className="gridBackground">
      {gridItems}
    </div>
  );
}
