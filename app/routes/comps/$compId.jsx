import { redirect } from "@remix-run/node";
import { useLoaderData, Form, Outlet, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";

export const loader = async ({ params }) => {
  const db = await connectDb();
  const comp = await db.models.Comp.findById(params.compId);
  return comp;
};

export default function CompsId() {
  const comps = useLoaderData();
  return (
    <>
      <div>
        <h1>{comps.name}</h1>
      </div>
      <Outlet />
    </>
  );
}
