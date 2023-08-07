import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/common/Navigation';
import Home from './components/routes/Home';
import Shop from './components/routes/Shop';
import Man from './components/routes/Man';
import Woman from './components/routes/Woman';
import About from './components/routes/About';
import Contact from './components/routes/Contact';
import SignIn from './components/auth/SignIn';
import SingUp from './components/auth/SignUp';
import Miniature from './components/routes/Miniature';
import Footer from './components/common/Footer';
import We from './components/routes/We';
import Faq from './components/routes/Faq'
import Product from './components/product/Product';



function App() {

 
  const routes = [
    { path: '/', component: <Home /> },
    { path: '/shop', component: <Shop /> },
    { path: '/man', component: <Man /> },
    { path: '/woman', component: <Woman /> },
    { path: '/about', component: <About /> },
    { path: '/contact', component: <Contact /> },
    { path: '/signin', component: <SignIn /> },
    { path: '/signup', component: <SingUp /> },
    { path: '/miniature', component: <Miniature /> },
    { path: '/we', component: <We /> },
    { path: '/faq', component: <Faq /> },
    { path: '/shop/:category/:key', component: <Product /> }
    
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
