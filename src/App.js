// import { AuthProvider, AuthContext } from './hooks';
import { Route, Routes,  } from 'react-router-dom';
import './App.css';
import Navigation from './components/common/Navigation';
import Home from './components/routes/Home';
import Shop from './components/routes/Shop';
import About from './components/routes/About';
import Contact from './components/routes/Contact';
import Miniature from './components/routes/Miniature';
import Footer from './components/common/Footer';
import Faq from './components/routes/Faq'
import Product from './components/product/Product';
import Login from './components/auth/Login';
import Signup from './components/auth/SignUp';
import Category from './components/routes/Category';
import ProtectedRoutes from './hooks/ProtectedRoutes';
import Sample from './components/routes/Sample';
import Privacy from './components/routes/Privacy';
import TermsAndConditions from './components/routes/TermsAndConditions';
import Account from './components/auth/Account';
import Cart from './components/product/Cart';
import Admin from './components/routes/Admin';
import ProductUpload from './components/admin/ProductUpload';
import Dashboard from './components/admin/Dashboard';
import Man from './components/routes/Man';
import Woman from './components/routes/Woman';



function App() {
  
 
  const routes = [
    { path: '/', component: <Home /> },
    { path: '/about', component: <About /> },
    { path: '/contact', component: <Contact /> },
    { path: '/privacy', component: <Privacy /> },
    { path: '/terms', component: <TermsAndConditions /> },
    { path: '/faq', component: <Faq /> },
    { path: '/login', component:  <Login /> }, 
    { path: '/signup', component: <Signup /> },
    { path: '/account', component: <Account /> },
    { path: '/shop', component: <Shop /> },
    { path: '/shop/:category/:productId', component: <Product /> },
    { path: '/shop/:category', component: <Category /> },
    { path: '/miniature', component: <Miniature /> },
    { path: '/sample', component: <Sample /> },
    { path: '/man', component: <Man /> },
    { path: '/woman', component: <Woman /> },



    { path: '/checkout', component: <Cart /> }
    
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
        <Route path="/admin" element={<ProtectedRoutes />} >
          <Route index element={<Admin />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="upload" element={<ProductUpload />} />
          {/* <Route path="productsadm" element={<ProductsAdm />} /> */}
        </Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
