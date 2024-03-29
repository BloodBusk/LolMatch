import {
  createCookie,
  createCookieSessionStorage,
  json,
  redirect,
} from "@remix-run/node";
import { sessionCookie } from "~/cookies.server.js";

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage({ cookie: sessionCookie });

export async function requireUserSession(request) {
  const cookie = await request.headers.get("Cookie");
  const session = await getSession(cookie);
  session.get("userId");
  if (!session.has("userId")) {
    throw redirect("/services/login");
  }
  return session;
}

export async function setSession(request, userId) {
  const session = await getSession(request.headers.get("Cookie"));
  session.set("userId", userId);
  return redirect("/", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export async function getLoggedUser(request) {
  const cookie = await request.headers.get("Cookie");
  const session = await getSession(cookie);
  return session.get("userId");;
}

export async function setCookieSecret(request) {
  const session = await getSession(request.headers.get("Cookie"));
  const cookie = createCookie("user-prefs", {
    secrets: [process.env.COOKIE_SECRET],
  });
  return json({
    userId: session.get("userId"),
  });
}

export async function logout(request) {
  const session = await getSession(request.headers.get("Cookie"));
  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
}
