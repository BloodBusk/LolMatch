import style from "~/styles/compId.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

export default function CompsIdIndex() {
  return <><div className="compsIdIndex">Create you favorite team comps or <br></br>view comps made by other league enthusiasts</div></>;
}
