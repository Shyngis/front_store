import "./App.css";
import { Pages } from "./Components/Pages/Pages";

function App() {
  const { fetch: originalFetch } = window;

  window.fetch = async (...args) => {
    let [resource, config] = args;

    const response = await originalFetch(resource, config);
    if(response.status == 401) {
      window.location.href="/";
    }
    return response;
  };

  return (
    <>
      <div className="container">
        <Pages />
      </div>
    </>
  );
}

export default App;
