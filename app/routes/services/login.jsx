import { setSession, setCookieSecret } from "~/session.server.js";
import * as bcrypt from "bcryptjs";
import { redirect, json, createCookie } from "@remix-run/node";
import { useLoaderData, useActionData, Form } from "@remix-run/react";
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

  const email = form.get("email");
  const password = form.get("password");

  const users = await db.models.Login.findOne({ email: email });

  if (users) {
    const isCorrectPassword = await bcrypt.compare(password, users.password);
    if (isCorrectPassword) {
      return setSession(request, users._id); 
    } else {
      return json({ passwordErrorMessage: "Incorrect Password" });
    }
  } else {
    return json({ userErrorMessage: "User Not Found" });
  }
};

export default function Login() {
  return (
    <>
      <div className="logUserContainer">
        <Form method="post" className="logUserForm">
          <h1>Login</h1>
          <label>Email</label>
          <input type="email" name="email" />
          <label>Password</label>
          <input type="password" name="password" />
          <button type="submit" name="login">
            Login
          </button>
        </Form>
      </div>
    </>
  );
}
