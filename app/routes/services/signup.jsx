import { redirect, json, createCookie } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
import { setSession, setCookieSecret } from "~/session.server.js";
import * as bcrypt from "bcryptjs";
import connectDb from "~/db/connectDb.server.js";
import style from "~/styles/login_signup.css";

export const links = () => [
  {
    rel: "stylesheet",
    href: style,
  },
];

export const loader = async ({ request }) => {
  return setCookieSecret(request); //return session userId
};

export const action = async ({ request }) => {
  const db = await connectDb();
  const form = await request.formData();

  const username = form.get("username");
  const email = form.get("email");
  const password = form.get("password");
  const repeatPwd = form.get("repeatPwd");
  const hashPassword = await bcrypt.hash(password, 10);

  const newUser = await db.models.Login.create({
    username: username,
    email: email,
    password: hashPassword,
  });
  newUser.set("timestamps", true);

  const users = await db.models.Login.findOne({ username: username });

  if (users) {
    return setSession(request, users._id);
  } else {
    return json({ findUserErrorMessage: "user not found" });
  }
};

export default function Signup() {
  return (
    <>
      <div className="logUserContainer">
        <Form method="post" className="logUserForm">
          <h1>Signup</h1>
          <label>Name</label>
          <input type="text" name="username" />
          <label>Email</label>
          <input type="email" name="email" />
          <label>Password</label>
          <input type="password" name="password" />
          <label>Repeat Password</label>
          <input type="password" name="repeatPwd" />
          <button type="submit" name="signup">
            Signup
          </button>
        </Form>
      </div>
    </>
  );
}
