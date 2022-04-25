import { Outlet, useLoaderData } from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";

export async function loader({ params }) {
  const db = await connectDb();
  const matches = await db.models.Champion.findById(params.champId);
  return matches;
}

export default function MatchId() {
  const match = useLoaderData();
  return (
    <div>
      <h1>Match Information</h1>
      <p>{match._id}</p>
      <Outlet />
    </div>
  );
}
