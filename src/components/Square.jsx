import Cross from "../icons/Cross";
import Circle from "../icons/Circle";

export default function Square({
  value,
  onClick,
  className,
  isWinnerLineSquare,
}) {
  const buttonStyles = `p-4 ${className}`;
  let icon = <div className="w-[4em] h-[4em]" />;
  if (value === "X") {
    icon = <Cross />;
  } else if (value === "O") {
    icon = <Circle />;
  }
  return (
    <div
      className={
        buttonStyles +
        (!value ? " cursor-pointer" : "") +
        (isWinnerLineSquare ? " text-emerald-200" : " text-white")
      }
      onClick={onClick}
    >
      {icon}
    </div>
  );
}
