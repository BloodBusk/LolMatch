import { redirect, json } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { requireUserSession, getLoggedUser } from "~/session.server.js";
import connectDb from "~/db/connectDb.server.js";

import { GenerateTeam, GenerateRandomTeam, TeamObjective } from "~/routes/services/auto.jsx";
import style from "~/styles/generateComp.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

export const loader = async ({ request }) => {
  //protected url path
  return await requireUserSession(request);
};

export const action = async ({ request }) => {
  const form = await request.formData();
  let { _action, ...values } = Object.fromEntries(form);
  if (_action === "generateTeam") {
    return GenerateTeam();
  } else if (_action === "generateRandomTeam") {
    return GenerateRandomTeam();
  }
};

export default function GenerateComp() {
  const data = useActionData();
  console.log(data);
  const pos = ["Top", "Jungle", "Middle", "ADC", "Support"];
  return (
    <>
      <div className="compContainer">
        <h1>Auto Generate A Comp</h1>
        <section className="buttonContainer">
          <Form method="post">
            <button type="submit" name="_action" value="generateTeam">
              Generate Comp
            </button>
            <button type="submit" name="_action" value="generateRandomTeam">
              Generate Random Placement Comp
            </button>
          </Form>
        </section>
        <section className="teamContainer">
          {data?.map((d, i) => {
            return (
              <div key={i}>
                <h2>{pos[i]}</h2>
                <img
                  src={"/lolChampIcons/" + d.replace(/'| /, "_") + ".png"}
                  alt=""
                  className="champIcons"
                />
                <p className="white">{d}</p>
              </div>
            );
          })}
        </section>
      </div>
    </>
  );
}
