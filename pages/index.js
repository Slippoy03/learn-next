import { useEffect } from "react";
import dynamic from "next/dynamic"

const LayoutComponent = dynamic(() => import("@/layout"))

export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log("er r=>", err));
  }, []);

  return (
    <>
      <LayoutComponent metaTitle="Home">
        <p className="text-red-600">Home</p>
      </LayoutComponent>
    </>
  );
}
