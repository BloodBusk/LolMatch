import { redirect } from "@remix-run/node";

export const loader = () => {
  return redirect("/champs");
  
};

export default function Index() {
  return <div></div>;
}
