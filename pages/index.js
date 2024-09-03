import dynamic from "next/dynamic"

const LayoutComponent = dynamic(() => import("@/layout"))

export default function Main() {

  return (
    <>
      <LayoutComponent metaTitle="Home">
        <p className="text-red-600">Index</p>
      </LayoutComponent>
    </>
  );
}
