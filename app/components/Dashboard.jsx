import Layout from "./Layout";

const Dashboard = () => {
    return (
      <Layout>
        <h2 className="text-3xl font-bold mb-6">Dashboard</h2>
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-blue-500 p-6 rounded-lg text-white">
            <h3 className="text-xl">Total Users</h3>
            <p className="text-3xl">200</p>
          </div>
          <div className="bg-green-500 p-6 rounded-lg text-white">
            <h3 className="text-xl">Active Sessions</h3>
            <p className="text-3xl">45</p>
          </div>
          <div className="bg-yellow-500 p-6 rounded-lg text-white">
            <h3 className="text-xl">Reports Pending</h3>
            <p className="text-3xl">80</p>
          </div>
        </div>
      </Layout>
    );
  };
  
  export default Dashboard;