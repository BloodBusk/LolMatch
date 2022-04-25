import { Outlet, useLoaderData, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ request }) {
  const db = await connectDb();
  const champs = await db.models.Champion.find();
  return champs;
}

export default function Champs() {
  const champs = useLoaderData();
  return (
    <div>
      <h1>Champions</h1>
      <ul>
        {champs.map((champ) => {
          return (
            <Link key={champ._id} to={`/champs/${champ._id}`}>
              <p>{champ.name}</p>
            </Link>
          );
        })}
      </ul>
      <Outlet />
    </div>
  );
}
