import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <div className="app flex min-h-screen justify-center pt-12 pb-12 dark:bg-gray-800">
      <div>
        <h2 className="text-3xl font-bold mb-4 dark:text-slate-400">Twitter Clone made with React and Rails</h2>
        <h4 className="text-xl text-gray-700 dark:text-gray-500">To see tweets you can sign up or log in</h4>
        <Login />
      </div>
    </div>
  );
}

export default App;
