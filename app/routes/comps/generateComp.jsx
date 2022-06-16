import { redirect, json } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { requireUserSession, getLoggedUser } from "~/session.server.js";
import connectDb from "~/db/connectDb.server.js";

import { GenerateTeam } from "~/routes/services/auto.jsx";
import style from "~/styles/generateComp.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

export const loader = async ({ request }) => {
  return await requireUserSession(request);
};

export const action = async ({ request }) => {
    return GenerateTeam(request);
};

export default function GenerateComp() {
    const data = useActionData();
  return (
    <>
      <div className="compContainer">
          <h1>Auto Generate A Comp</h1>
          <Form method="post">
              <button type="submit">Generate Comp</button>
          </Form>
          {
              data?.map((d, i) => {
                return <p key={i} className="white">{d}</p>
              })
          }
      </div>
    </>
  );
}
