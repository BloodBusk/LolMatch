import { redirect } from "@remix-run/node";

export async function loader() {
  return redirect("/navbar");
}

export default function Index() {
  return <div></div>;
}
