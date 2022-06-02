import { redirect } from "@remix-run/node";
import { useLoaderData, Form, Outlet, NavLink } from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";
import style from "~/styles/comps.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

export const loader = async ({ request }) => {
  const db = await connectDb();
  const url = new URL(request.url);
  const nameSearch = url.searchParams.get("search");
  const comps = await db.models.Comp.find();
  return comps.filter((comp) =>
    nameSearch
      ? comp.name.toLowerCase().includes(nameSearch.toLowerCase())
      : true
  );
};

export default function Index() {
  const comps = useLoaderData();
  return (
    <>
      <div className="compsContainer">
        <section className="compsContainer2">
          <h1>LoLMix</h1>
          <Form method="get">
            <input
              type="search"
              name="search"
              placeholder="search for comps"
              className="searchForm"
            />
          </Form>
          <div>
            <Form method="post" className="displayCompsForm">
              <button type="submit" name="_action" value="allComps">
                All Comps
              </button>
              <button type="submit" name="_action" value="myComps">
                My Comps
              </button>
            </Form>
          </div>
          <div className="compLinksContainer">
            {comps.map((comp) => {
              return (
                <NavLink
                  to={`/comps/${comp._id}`}
                  key={comp._id}
                  className={({ isActive }) =>
                    isActive ? "compLink link-active" : "compLink"
                  }
                >
                  {comp.name}
                </NavLink>
              );
            })}
          </div>
        </section>
        <section className="compsContainer3">
          <Form>
            <button type="submit" name="_action" value="signup">Signup</button>
          </Form>
          <Form method="post">
            <button type="submit" name="_action" value="login">
              Login
            </button>
          </Form>
        </section>
      </div>
      <Outlet />
    </>
  );
}
