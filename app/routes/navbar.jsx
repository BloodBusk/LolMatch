import { redirect } from "@remix-run/node";
import { useLoaderData, Form, Outlet, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";

export const loader = async () => {
  const db = await connectDb();
  const comps = await db.models.Comp.find();
  return comps;
};

export default function Index() {
  const comps = useLoaderData();
  return (
    <>
      <div>
        <h1>LoLMix</h1>
        <Form></Form>
        {comps.map((comp) => {
          return <Link to={`/comps/${comp._id}`} key={comp._id}>
            {comp.name}
          </Link>;
        })}
      </div>
      <Outlet />
    </>
  );
}
