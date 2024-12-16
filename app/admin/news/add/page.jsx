import Layout from "@/app/components/Layout";
import NewsForm from "@/app/components/Newsform";
const NewService = () => {
  return (
    <Layout>
      <h2 className="text-3xl font-bold mb-6">Add New News</h2>
<NewsForm />
    </Layout>
  );
};

export default NewService;