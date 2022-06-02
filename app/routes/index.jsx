import { redirect } from "@remix-run/node";

export async function loader() {
  return redirect("/comps");
}

export default function Index() {
  return <div></div>;
}
