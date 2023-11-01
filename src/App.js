// import { AuthProvider, AuthContext } from './hooks';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/common/Navigation';
import Home from './components/routes/Home';
import Shop from './components/routes/Shop';
import About from './components/routes/About';
import Contact from './components/routes/Contact';
// import Footer from './components/common/Footer';
import Faq from './components/routes/Faq';
import Test from './components/routes/Test';
import Product from './components/product/Product';
import Login from './components/auth/Login';
import Signup from './components/auth/SignUp';
import Category from './components/routes/Category';
import ProtectedRoutes from './hooks/ProtectedRoutes';
import Privacy from './components/routes/Privacy';
import TermsAndConditions from './components/routes/TermsAndConditions';
import Account from './components/auth/Account';
import Cart from './components/product/Cart';
import Admin from './components/routes/Admin';
import ProductUpload from './components/admin/ProductUpload';
import Dashboard from './components/admin/Dashboard';
import Notes from './components/admin/Notes';
import Checkout from './components/routes/Checkout';
import PaymentSuccess from './components/routes/PaymentSuccess';
import PaymentFailed from './components/routes/PaymentFailed';
import Orders from './components/admin/Orders';

function App() {
  const routes = [
    { path: '/', component: <Home /> },
    { path: '/about', component: <About /> },
    { path: '/contact', component: <Contact /> },
    { path: '/privacy', component: <Privacy /> },
    { path: '/terms', component: <TermsAndConditions /> },
    { path: '/faq', component: <Faq /> },
    { path: '/login', component: <Login /> },
    { path: '/signup', component: <Signup /> },
    { path: '/test', component: <Test /> },
    { path: '/account', component: <Account /> },
    { path: '/shop', component: <Shop /> },
    { path: '/shop/:productId', component: <Product /> },
    { path: '/shop/:category', component: <Category /> },
    { path: '/checkout', component: <Checkout /> },
    { path: '/cart', component: <Cart /> },
    { path: '/payment-success', component: <PaymentSuccess /> },
    { path: '/payment-failed', component: <PaymentFailed /> },
  ];

  return (
    <div className='flex flex-col lg:min-h-screen lg:bg-cover lg:bg-center lg:h-screen lg:bg-[url(https://firebasestorage.googleapis.com/v0/b/miniparfumqueen.appspot.com/o/images%2Fbg%2Fmpq-bg.jpg?alt=media&token=68c2375b-3f6c-4bae-9cab-536a93e035f4)]'>
      <Navigation />
      <Routes>
        {/* Map through the routes array and render the routes */}
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.component} />
        ))}
        {/* If no matching route is found, render the Home component */}
        <Route path='*' element={<Home />} />
        <Route
          path='/shop/vintage/'
          element={<Category category='vintage' />}
        />
        <Route path='/shop/parfum/' element={<Category category='perfume' />} />
        <Route path='/shop/sample/' element={<Category category='sample' />} />
        <Route
          path='/shop/miniature/'
          element={<Category category='miniature' />}
        />
        <Route
          path='/shop/soapandpowder/'
          element={<Category category='soap' />}
        />
        <Route path='/shop/gift/' element={<Category category='gift' />} />
        <Route path='/shop/gold/' element={<Category category='gold' />} />
        <Route path='/admin' element={<ProtectedRoutes />}>
          <Route index element={<Admin />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='upload' element={<ProductUpload />} />
          <Route path='notes' element={<Notes />} />
          <Route path='orders' element={<Orders />} />
          {/* <Route path="productsadm" element={<ProductsAdm />} /> */}
        </Route>
      </Routes>
      {/* <div className="snap-start flex items-end">
      <Footer />
        </div> */}
    </div>
  );
}

export default App;
