import { redirect, json } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { requireUserSession, getLoggedUser } from "~/session.server.js";
import connectDb from "~/db/connectDb.server.js";
import style from "~/styles/newComp_updateComp.css";
import champData from "~/json/champion-data.json";
import { useRef, useState } from "react";

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
  if (_action === "delete") {
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
  const [dragging, setDragging] = useState(false);
  const dragItem = useRef();
  const dragNode = useRef();

  const [inputText, setInputText] = useState("");

  let inputHandler = (e) => {
    let lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  };

  const filteredData = champData.filter((cd) => {
    if (inputText === "") {
      return cd;
    } else {
      return cd.name.toLowerCase().includes(inputText);
    }
  });

  const handleDragStart = (e, item) => {
    console.log("dragging", item);
    dragItem.current = item;
    dragNode.current = e.target;
    setDragging(true);

    dragNode.current.addEventListener("dragend", handleDragEnd);
    // setTimeout(() => {
    //   setDragging(true);
    // }, 0);
  };

  const handleDragEnter = (e, item) => {
    const currentItem = dragItem.current;
    e.target.value = currentItem.name;
  };

  const onDrop = (e) => {
    const currentItem = dragItem.current;
    e.target.value = currentItem.name;
    e.preventDefault();
  };

  const onLeave = (e) => {
    e.target.value = "";
  };

  const handleDragEnd = () => {
    setDragging(false);
    dragNode.current.removeEventListener("dragend", handleDragEnd);
    dragItem.current = null;
    dragNode.current = null;
  };

  const getStyles = (item) => {
    const currentItem = dragItem.current;
    if (currentItem === item && currentItem.id === item.id) {
      return "draggingStyle displayAllNamesContent";
    }
    return "displayAllNamesContent";
  };
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
              <input
                type="text"
                name="mainPicks"
                defaultValue={comp.mainPicks[0]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="mainPicks"
                defaultValue={comp.mainPicks[1]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="mainPicks"
                defaultValue={comp.mainPicks[2]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="mainPicks"
                defaultValue={comp.mainPicks[3]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="mainPicks"
                defaultValue={comp.mainPicks[4]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
            </div>
            <div>
              <label>Alternative Picks</label>
              <input
                type="text"
                name="altPicks"
                defaultValue={comp.altPicks[0]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="altPicks"
                defaultValue={comp.altPicks[1]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="altPicks"
                defaultValue={comp.altPicks[2]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="altPicks"
                defaultValue={comp.altPicks[3]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="altPicks"
                defaultValue={comp.altPicks[4]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
            </div>
            <div>
              <label>Preferable Bans</label>
              <input
                type="text"
                name="bans"
                defaultValue={comp.bans[0]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="bans"
                defaultValue={comp.bans[1]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="bans"
                defaultValue={comp.bans[2]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="bans"
                defaultValue={comp.bans[3]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="bans"
                defaultValue={comp.bans[4]}
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
            </div>
          </div>
          <div className="compFormTextArea">
            <div>
              <label>Objective</label>
              <textarea
                type="text"
                name="objective"
                defaultValue={comp.objective}
              />
            </div>
            <div>
              <label>Strengths</label>
              <textarea
                type="text"
                name="strengths"
                defaultValue={comp.strengths}
              />
            </div>
            <div>
              <label>Weaknesses</label>
              <textarea
                type="text"
                name="weaknesses"
                defaultValue={comp.weaknesses}
              />
            </div>
          </div>
          <button type="submit" name="_action" value="update">
            Update
          </button>{" "}
          <div className="deleteForm">
            <h1>Destructive</h1>

            <button type="submit" name="_action" value="delete">
              Delete Team Comp
            </button>
          </div>
        </Form>
        <section className="champContainer">
          <div className="champContainerheader">
            <h2>Drag and Drop the champs onto the form</h2>
            <input
              label="Search"
              placeholder="Search champions..."
              onChange={inputHandler}
            />
          </div>
          <div className="displayAllNamesContainer">
            {filteredData.map((cd) => {
              return (
                <div
                  key={cd.id}
                  className={
                    dragging ? getStyles(cd, cd.id) : "displayAllNamesContent"
                  }
                  draggable
                  onDragStart={(e) => {
                    handleDragStart(e, cd);
                  }}
                  onDragEnter={
                    dragging
                      ? (e) => {
                          handleDragEnter(e, cd);
                        }
                      : null
                  }
                >
                  <img
                    src={
                      "/lolChampIcons/" + cd.name.replace(/'| /, "_") + ".png"
                    }
                    alt=""
                    className="champIcons"
                  />
                  <p>{cd.name}</p>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </>
  );
}
