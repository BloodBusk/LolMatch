import { redirect, json } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { requireUserSession, getLoggedUser } from "~/session.server.js";
import connectDb from "~/db/connectDb.server.js";
import style from "~/styles/newComp_updateComp.css";

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
  const userId = await getLoggedUser(request);
  const db = await connectDb();
  const form = await request.formData();

  try {
    const newComp = await db.models.Comp.create({
      name: form.get("name"),
      mainPicks: form.getAll("mainPicks"),
      altPicks: form.getAll("altPicks"),
      bans: form.getAll("bans"),
      objective: form.get("objective"),
      strengths: form.get("strengths"),
      weaknesses: form.get("weaknesses"),
      upvotes: 0,
      patch: form.get("patch"),
      loginId: userId,
    });
    newComp.set("timestamps", true);
    return redirect(`/`);
  } catch (err) {
    return json(err.errors, { status: 400 });
  }
};

export default function newComp() {
  return (
    <>
      <div className="compContainer">
        <Form method="post" className="compForm">
          <h1>Create Team Comp</h1>
          <div className="compFormName">
            <div>
              <label>Team Comp Name</label>
              <input type="text" name="name" />
            </div>
            <div>
              <label>Patch Number</label>
              <input type="text" name="patch" placeholder="eg: 10.10" />
            </div>
          </div>
          <div className="compFormPicks">
            <div>
              <label>Main Picks</label>
              <input type="text" name="mainPicks" />
              <input type="text" name="mainPicks" />
              <input type="text" name="mainPicks" />
              <input type="text" name="mainPicks" />
              <input type="text" name="mainPicks" />
            </div>
            <div>
              <label>Alternative Picks</label>
              <input type="text" name="altPicks" />
              <input type="text" name="altPicks" />
              <input type="text" name="altPicks" />
              <input type="text" name="altPicks" />
              <input type="text" name="altPicks" />
            </div>
            <div>
              <label>Preferable Bans</label>
              <input type="text" name="bans" />
              <input type="text" name="bans" />
              <input type="text" name="bans" />
              <input type="text" name="bans" />
              <input type="text" name="bans" />
            </div>
          </div>
          <div className="compFormTextArea">
            <div>
              <label>Objective</label>
              <textarea type="text" name="objective" />
            </div>
            <div>
              <label>Strengths</label>
              <textarea type="text" name="strengths" />
            </div>
            <div>
              <label>Weaknesses</label>
              <textarea type="text" name="weaknesses" />
            </div>
          </div>
          <button type="submit">Create</button>
        </Form>
      </div>
    </>
  );
}
