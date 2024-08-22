import Header from "@/components/header";
import Footer from "@/components/footer";
import Layout from "@/contents";

export default function Home({ children }) {
 return (
   <Layout>
     <Header />
     {children = 'Content'}
     <Footer />
   </Layout>
 );
}