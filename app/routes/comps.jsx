import { redirect, json } from "@remix-run/node";
import { useLoaderData, Form, Outlet, NavLink, Link } from "@remix-run/react";
import connectDb from "~/db/connectDb.server.js";
import { logout, getLoggedUser } from "~/session.server.js";
import style from "~/styles/comps.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

export const loader = async ({ request }) => {
  const userId = await getLoggedUser(request);
  const db = await connectDb();
  const url = new URL(request.url);
  const nameSearch = url.searchParams.get("search");
  const searchMyComps = url.searchParams.get("searchMyComps");
  const comps = await db.models.Comp.find();
  const login = await db.models.Login.findById(userId);
  return [
    comps.filter((comp) =>
      nameSearch
        ? comp.name.toLowerCase().includes(nameSearch.toLowerCase())
        : searchMyComps
        ? comp.loginId.toString().includes(searchMyComps)
        : true
    ),
    userId,
    login,
  ];
};

export const action = async ({ request }) => {
  const db = await connectDb();
  const form = await request.formData();
  let { _action, ...values } = Object.fromEntries(form);
  if (_action === "logout") {
    return logout(request);
  }
};

export default function Index() {
  const [comps, userId, login] = useLoaderData();
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
            <Form method="get" className="displayCompsForm">
              <button type="search" name="search" value="">
                All Comps
              </button>
              {userId ? (
                <button type="search" name="searchMyComps" value={userId}>
                  My Comps
                </button>
              ) : (
                ""
              )}
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
          {!userId ? (
            <div>
              <Link to="/services/signup" className="compsContainer3Link">
                Signup
              </Link>
              <Link to="/services/login" className="compsContainer3Link">
                Login
              </Link>
            </div>
          ) : (
            <div className="compsContainer4">
              <div>
                <Link to="/comps/newComp" className="compsContainer4Link">
                  Add Team Comp
                </Link>
                <Form method="post">
                  <button
                    type="submit"
                    name="_action"
                    value="logout"
                    className="compsContainer4btn"
                  >
                    Logout
                  </button>
                </Form>
              </div>
              <p className="compsContainer4Username">{login.username}</p>
            </div>
          )}
        </section>
      </div>
      <Outlet />
    </>
  );
}
