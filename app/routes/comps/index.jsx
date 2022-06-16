import style from "~/styles/compId.css";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export const links = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

export default function CompsIdIndex() {
  return (
    <>
      <div className="compsIdIndex">
        Create you favorite team comps or <br></br>view comps made by other
        league enthusiasts
      </div>
    </>
  );
}
