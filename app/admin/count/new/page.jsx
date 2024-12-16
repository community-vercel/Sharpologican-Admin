import ServiceForm from "@/app/components/Serviceform";
import Layout from "@/app/components/Layout";
import CountForm from "@/app/components/Countform";
const NewCount = () => {
  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Add New Service</h2>
      <CountForm initialData={[]} />
    </Layout>
  );
};

export default NewCount;