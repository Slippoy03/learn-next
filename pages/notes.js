import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({notes}) {
    console.log("notes data => ", notes)
  return (
    <>
      <LayoutComponent metaTitle="Notes">
        {notes.data.map((item ) => (
            <div>
                <p>{item.title}</p>
                <p>{item.description}</p>
            </div>
        ))}
      </LayoutComponent>
    </>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://api.github.com/repos/vercel/next.js");
  const notes = await res.json();
  return { props: { notes } };
}