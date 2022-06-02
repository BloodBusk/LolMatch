import style from "~/styles/compId.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

export default function CompsIdIndex() {
  return <><div className="compsIdIndex">Choose a comp on the left</div></>;
}
