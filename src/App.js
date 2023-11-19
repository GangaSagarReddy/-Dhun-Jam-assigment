// import Home from "./Login";
// import Dashboard from "./Admindashboard";
// import { Routes } from "react-router-dom";
// import { BrowserRouter as Router, Route } from "react-router-dom";
// function App() {
//   return (
//     <div>
//       <Router>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>
//       </Router>
//     </div>
//   );
// }

// export default App;

// App.js
import React, { useState } from "react";
import Login from "./Login";
import AdminDashboard from "./Admindashboard";

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (userToken) => {
    setToken(userToken);
  };

  return (
    <div>
      {token ? (
        <AdminDashboard token={token} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;
