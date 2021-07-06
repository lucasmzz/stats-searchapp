import React from "react";
import Search from "./components/Search";

import "./styles.css";

export default function App() {
  //THINGS TO ADD:
  // 1. Pagination for easing the result scrolling
  // 2. Implement a debounced or throttled search to avoid overheating the API
  // 3. Split the Search Results Card in a separate component.
  // 4. Implement a results list where you can pick the one you are interested and navigate to it later on.

  return (
    <div className="App">
      <Search />
    </div>
  );
}
