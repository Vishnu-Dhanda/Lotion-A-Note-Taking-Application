import { BrowserRouter, Routes, Route} from "react-router-dom";
import Layout from "./Layout.js"
import ViewNote from "./ViewNote.js";
import EditNote from "./EditNote.js"
import NoNote from "./NoNote.js"
function App() {
 
  return(
    
    <BrowserRouter>
    {/* <Layout/> */}
    {/* console.log(window.location.href);   */}
      <Routes>
        
        <Route path="/" element={<Layout/>}> 
        <Route path="/" element={<NoNote/>}></Route>
        <Route path="/ViewNote/:id" element={<ViewNote/>}></Route>
        <Route path="/EditNote/:id" element={<EditNote/>}></Route>
        </Route>
      
      </Routes>
      
    </BrowserRouter>

  )
}

export default App;
