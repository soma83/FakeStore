import {Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import ProductDetail from "./pages/ProductDetail"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const App = () => (
  <div className="min-h-screen bg-gray-50">
    <Layout>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/product/:id" element={<ProductDetail/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Layout>
  </div>
);

export default App;
