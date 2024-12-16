import ServiceForm from "@/app/components/Serviceform";
import Layout from "@/app/components/Layout";
const NewService = () => {
  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Add New Service</h2>
      <ServiceForm />
    </Layout>
  );
};

export default NewService;