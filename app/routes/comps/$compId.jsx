import { redirect } from "@remix-run/node";
import { useLoaderData, Form, Outlet, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";
import style from "~/styles/compId.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

export const loader = async ({ params }) => {
  const db = await connectDb();
  const comp = await db.models.Comp.findById(params.compId);
  return comp;
};

export default function CompsId() {
  const comps = useLoaderData();
  return (
    <>
      <div className="compIdContainer">
        <section className="compIdTitle">
          <h1>{comps.name}</h1>
        </section>
        <section className="compIdContent">
          <div className="compIdUpvotes">
            <p>{comps.upvotes}</p>
            <Form>
              <button type="submit" value="upvote" name="_action">
                Upvote
              </button>
            </Form>
          </div>
          <Form>
            <button
              type="submit"
              value="update"
              name="_action"
              className="compIdUpdate"
            >
              Update
            </button>
          </Form>
        </section>
        <div className="compIdContainer2">
          <section className="compIdContent">
            <div>
              <h2>Main Picks</h2>
              {comps.mainPicks.map((mp, i) => {
                return <p key={i}>{mp}</p>;
              })}
            </div>
            <div>
              <h2>Alternative Picks</h2>
              {comps.altPicks.map((ap, i) => {
                return <p key={i}>{ap}</p>;
              })}
            </div>
            <div>
              <h2>Preferable Bans</h2>
              {comps.bans.map((ban, i) => {
                return <p key={i}>{ban}</p>;
              })}
            </div>
          </section>
          <section className="compIdContent">
            <div>
              <h2>Objective</h2>
              <p>{comps.objective}</p>
            </div>
            <div>
              <h2>Strengths</h2>
              <p>{comps.strengths}</p>
            </div>
            <div>
              <h2>Weaknesses</h2>
              <p>{comps.weaknesses}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
