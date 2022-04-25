import { Outlet, useLoaderData, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
  const db = await connectDb();
  const champs = await db.models.Champion.findById(params.champId);
  return champs;
}

export default function ChampId() {
  const champs = useLoaderData();
  return (
    <div>
      <h1>Champions Matches</h1>
      <ul>
        {champs.matches.map((match) => {
          return (
            <Link
              key={match._id}
              to={`/champs/${champs._id}/matches/${match._id}`}
            >
              <p>{match.matchName}</p>
            </Link>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
}
