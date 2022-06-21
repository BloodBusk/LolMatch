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

export default function NewComp() {
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
              <input
                type="text"
                name="mainPicks"
                placeholder="Top"
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="mainPicks"
                placeholder="Jungle"
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="mainPicks"
                placeholder="Mid"
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="mainPicks"
                placeholder="ADC"
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="mainPicks"
                placeholder="Support"
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
                placeholder="Top"
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="altPicks"
                placeholder="Jungle"
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="altPicks"
                placeholder="Mid"
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="altPicks"
                placeholder="ADC"
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="altPicks"
                placeholder="Support"
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
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="bans"
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="bans"
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="bans"
                readonly="readonly"
                onDragOver={
                  dragging ? (e) => onDrop(e, dragItem.current) : null
                }
                onDragLeave={(e) => onLeave(e)}
              />
              <input
                type="text"
                name="bans"
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
