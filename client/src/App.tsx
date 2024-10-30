import "./App.css";
import Login from "./components/Login";

function App() {
  return (
    <div className="app flex justify-center py-12">
      <div>
        <h2 className="text-3xl font-bold mb-4">Twitter Clone made with React and Rails</h2>
        <h4 className="text-xl text-gray-700">To see tweets you can sign up or log in</h4>
        <Login />
      </div>
    </div>
  );
}

export default App;
