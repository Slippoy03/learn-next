import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Posts({ posts }) {
    console.log("posts data => ", posts);
  return (
    <>
      <LayoutComponent metaTitle="Home">
        {posts.map((item) => (
          <div>
            <p>{item.id}</p>
            <p>
              <b>{item.title}</b>
            </p>
            <p>{item.body}</p>
          </div>
        ))}
      </LayoutComponent>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const posts = await res.json();
  // Pass data to the page via props
  return { props: { posts } };
}