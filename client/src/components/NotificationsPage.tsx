import Sidebar from "./Sidebar";

const NotificationsPage = () => {
  return (
    <div className="py-4 min-h-screen dark:bg-gray-800">
      <div className="flex flex-row max-w-7xl mx-auto">
        <div className="basis-1/5">
          <Sidebar />
        </div>

        <div className="basis-3/5">Notifications Page</div>

        <div className="basis-1/5">
          <div className="flex justify-center">hashtag sidebar</div>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
