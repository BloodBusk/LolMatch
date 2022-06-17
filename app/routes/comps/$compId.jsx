import { redirect, json } from "@remix-run/node";
import { useLoaderData, Form, Outlet, Link } from "@remix-run/react";
import { getLoggedUser } from "~/session.server.js";
import connectDb from "~/db/connectDb.server.js";
import style from "~/styles/compId.css";
import upvote from "~/img/arrow-upward.png"

export const links = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

export const loader = async ({ request, params }) => {
  const db = await connectDb();
  const userId = await getLoggedUser(request);
  const comp = await db.models.Comp.findById(params.compId);

  return [comp, userId];
};

export const action = async ({ request, params }) => {
  const db = await connectDb();
  try {
    await db.models.Comp.updateOne(
      {
        _id: params.compId,
      },
      {
        $inc: { upvotes: 1 },
      }
    );
    return redirect(`/comps/${params.compId}`);
  } catch (err) {
    return json(err.errors, { status: 400 });
  }
};

export default function CompsId() {
  const [comps, userId] = useLoaderData();
  const pos = ["Top", "Jungle", "Middle", "ADC", "Support"];
  return (
    <>
      <div className="compIdContainer">
        <section className="compIdTitle">
          <h1>{comps.name}</h1>
          <p>{comps.patch}</p>
        </section>
        <section className="compIdContent">
          <div className="compIdUpvotes">
            <p>{comps.upvotes}</p>
            <Form method="post">
              <button type="submit" className="upvoteBtn"><img src={upvote} alt="" /></button>
            </Form>
          </div>
          {userId == comps.loginId ? (
            <Link to={`update`} className="compIdUpdate">
              Update
            </Link>
          ) : (
            ""
          )}
        </section>
        <div className="compIdContainer2">
          <section className="compIdContent2">
            <div className="contentOutline">
              <h2>Main Picks</h2>
              {comps.mainPicks.map((mp, i) => {
                return (
                  <div key={i}>
                    <h3>{pos[i]}</h3>
                    <img src={"/lolChampIcons/" + mp.replace(/'| /, "_") + ".png"} alt="" />
                    <p>{mp}</p>
                  </div>
                );
              })}
            </div>
            <div className="contentOutline">
              <h2>Alternative</h2>
              {comps.altPicks.map((ap, i) => {
                
                return <div key={i}>
                  <h3>{pos[i]}</h3>
                  <img src={"/lolChampIcons/" + ap.replace(/'| /, "_") + ".png"} alt="" />
                  <p>{ap}</p>
                  </div>;
              })}
            </div>
            <div className="contentOutline">
              <h2>Bans</h2>
              {comps.bans.map((ban, i) => {
                return <div key={i}>
                <img src={"/lolChampIcons/" + ban.replace(/'| /, "_") + ".png"} alt="" />
                <p>{ban}</p>
                </div>;
              })}
            </div>
          </section>
          <section className="compIdContent">
            <div className="compIdContentText">
              <h2>Objective</h2>
              <p>{comps.objective}</p>
            </div>
            <div className="compIdContentText">
              <h2>Strengths</h2>
              <p>{comps.strengths}</p>
            </div>
            <div className="compIdContentText">
              <h2>Weaknesses</h2>
              <p>{comps.weaknesses}</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
