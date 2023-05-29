import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Panel from "./admin"
import CatsList from "./components/CatsList"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<Panel />} />
        <Route path="/" element={<CatsList />} />
      </Routes>
    </Router>
  )
}

export default App

// import { useEffect, useState } from "react"
// import Cat from "./models/Cat"

// function App() {
//   const [cats, setCats] = useState<Cat[]>([])

//   useEffect(() => {
//     fetch("http://localhost:3000/cats")
//       .then((response) => response.json())
//       .then((data) => setCats(data))
//       .catch((error) => console.log(error))
//   }, [])

//   return (
//     <div>
//       <h1>Cats</h1>
//       <ul>
//         {cats.map((cat) => (
//           <li key={cat._id}>
//             <p>Name: {cat.name}</p>
//             <p>Age: {cat.age}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   )
// }

// export default App
