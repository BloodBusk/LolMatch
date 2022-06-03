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

export const loader = async ({ request, params }) => {
  const userId = await requireUserSession(request);
  const db = await connectDb();
  const comp = await db.models.Comp.findById(params.compId);
  if (!comp) {
    throw new Response("Not Found", { status: 404 });
  }
  return json(comp);
};

export const action = async ({ request, params }) => {
  const userId = await getLoggedUser(request);
  const db = await connectDb();
  const form = await request.formData();
  const comp = await db.models.Comp.findById(params.compId);
  let { _action, ...values } = Object.fromEntries(form);

  if (_action === "update") {
    try {
      await db.models.Comp.updateOne(
        {
          _id: params.compId,
        },
        {
          $set: {
            name: form.get("name"),
            mainPicks: form.getAll("mainPicks"),
            altPicks: form.getAll("altPicks"),
            bans: form.getAll("bans"),
            objective: form.get("objective"),
            strengths: form.get("strengths"),
            weaknesses: form.get("weaknesses"),
            upvotes: comp.upvotes,
            patch: form.get("patch"),
            loginId: userId,
          },
        }
      );
      return redirect(`/comps/${params.compId}`);
    } catch (err) {
      return json(err.errors, { status: 400 });
    }
  }
  if(_action === "delete"){
    try {
        await db.models.Comp.deleteOne({ _id: params.compId });
        return redirect(`/`);
      } catch (err) {
        return json(err.errors, { status: 400 });
      }
  }
};

export default function UpdateComp() {
  const comp = useLoaderData();
  return (
    <>
      <div className="compContainer">
        <Form method="post" className="compForm">
          <h1>Create Team Comp</h1>
          <div className="compFormName">
            <div>
              <label>Team Comp Name</label>
              <input type="text" name="name" defaultValue={comp.name} />
            </div>
            <div>
              <label>Patch Number</label>
              <input type="text" name="patch" defaultValue={comp.patch} />
            </div>
          </div>
          <div className="compFormPicks">
            <div>
              <label>Main Picks</label>
              <input type="text" name="mainPicks" defaultValue={comp.mainPicks[0]} />
              <input type="text" name="mainPicks" defaultValue={comp.mainPicks[1]} />
              <input type="text" name="mainPicks" defaultValue={comp.mainPicks[2]} />
              <input type="text" name="mainPicks" defaultValue={comp.mainPicks[3]} />
              <input type="text" name="mainPicks" defaultValue={comp.mainPicks[4]} />
            </div>
            <div>
              <label>Alternative Picks</label>
              <input type="text" name="altPicks" defaultValue={comp.altPicks[0]} />
              <input type="text" name="altPicks" defaultValue={comp.altPicks[1]} />
              <input type="text" name="altPicks" defaultValue={comp.altPicks[2]} />
              <input type="text" name="altPicks" defaultValue={comp.altPicks[3]}  />
              <input type="text" name="altPicks" defaultValue={comp.altPicks[4]} />
            </div>
            <div>
              <label>Preferable Bans</label>
              <input type="text" name="bans" defaultValue={comp.bans[0]} />
              <input type="text" name="bans" defaultValue={comp.bans[1]} />
              <input type="text" name="bans" defaultValue={comp.bans[2]} />
              <input type="text" name="bans" defaultValue={comp.bans[3]} />
              <input type="text" name="bans" defaultValue={comp.bans[4]} />
            </div>
          </div>
          <div className="compFormTextArea">
            <div>
              <label>Objective</label>
              <textarea type="text" name="objective" defaultValue={comp.objective} />
            </div>
            <div>
              <label>Strengths</label>
              <textarea type="text" name="strengths" defaultValue={comp.strengths} />
            </div>
            <div>
              <label>Weaknesses</label>
              <textarea type="text" name="weaknesses" defaultValue={comp.weaknesses} />
            </div>
          </div>
          <button type="submit" name="_action" value="update">
            Update
          </button>
        </Form>
        <Form method="DELETE" className="deleteForm">
          <h1>Destructive</h1>
          <button type="submit" name="_action" value="delete">
            Delete Team Comp
          </button>
        </Form>
      </div>
    </>
  );
}
