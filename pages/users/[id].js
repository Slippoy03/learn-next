import { useRouter } from "next/router";
import Layout from "@/layout";

export default function UsersByName() {
  const router = useRouter();
  const { id } = router?.query;

  return (
    <Layout>
      <p className="bg-black text-red-600">Users by Name {id }</p>
    </Layout>
  );
}
