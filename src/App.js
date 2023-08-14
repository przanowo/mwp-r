// import { AuthProvider, AuthContext } from './hooks';
import { Route, Routes,  } from 'react-router-dom';
import './App.css';
import Navigation from './components/common/Navigation';
import Home from './components/routes/Home';
import Shop from './components/routes/Shop';
import Man from './components/routes/Man';
import Woman from './components/routes/Woman';
import About from './components/routes/About';
import Contact from './components/routes/Contact';
import Miniature from './components/routes/Miniature';
import Footer from './components/common/Footer';
import We from './components/routes/We';
import Faq from './components/routes/Faq'
import Product from './components/product/Product';
import Login from './components/auth/Login';
import Signup from './components/auth/SignUp';
import ProductUpload from './components/routes/ProductUpload';
import Vintage from './components/routes/Vintage';
import Category from './components/routes/Category';
// import ProtectedRoute from './hooks/ProtectedRoutes';



function App() {
  
 
  const routes = [
    { path: '/', component: <Home /> },
    { path: '/about', component: <About /> },
    { path: '/contact', component: <Contact /> },
    { path: '/we', component: <We /> },
    { path: '/faq', component: <Faq /> },
    { path: '/login', component:  <Login /> }, 
    { path: '/signup', component: <Signup /> },
    { path: '/shop', component: <Shop /> },
    { path: '/shop/:category/:productId', component: <Product /> },
    { path: '/shop/:category', component: <Category /> },
    // { path: '/shop/vintage', component: <Vintage /> },
    // { path: '/shop/miniature', component: <Miniature /> },
    // { path: '/shop/miniatureB', component: <Miniature /> },
    // { path: '/shop/sample', component: <Miniature /> },
    // { path: '/shop/sampler', component: <Miniature /> },
    // { path: '/shop/woman', component: <Woman /> },
    // { path: '/shop/man', component: <Man /> },
    // { path: '/upload', component: <ProtectedRoute element={<ProductUpload />} /> }
    { path: '/upload', component: <ProductUpload /> }
    
  ];
      
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <Routes>
        {/* Map through the routes array and render the routes */}
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
        {/* If no matching route is found, render the Home component */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
