import Layout from "@/layout";
import { useEffect } from "react";

export default function Main() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("response =>", res))
      .catch((err) => console.log("er r=>", err));
  }, []);

  return (
    <>
      <Layout metaTitle="Home">
        <p className="text-red-600">Home</p>
      </Layout>
    </>
  );
}
