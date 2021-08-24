import { useMemo, useState, useEffect } from 'react';
import '../scss/global.scss';
import 'semantic-ui-css/semantic.min.css';
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AuthContext from '../context/AuthContext';
import jwtDecode from 'jwt-decode';
import { setToken, getToken, removeToken } from '../api/token';
import { useRouter } from 'next/router';
import { getProductsCart, addProductsCart, countProductsCart} from '../api/cart';
import CartContext from '../context/CartContext';

function MyApp({ Component, pageProps }) {

  
  const [reloadUser, setreloadUser] = useState(false)
  const [auth, setAuth] = useState(undefined)
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setrReloadCart] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id,
      });
    } else {
      setAuth(null);
    }

  }, [reloadUser]);
  
  useEffect(() => {
    setTotalProductsCart(countProductsCart());
    setrReloadCart(false);
  }, [reloadCart, auth])

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id
    });
  }

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  }
  
  const setReloadUser = () => {
    setreloadUser(!reloadUser);
  }

  const addProduct = (product) => {
    const token = getToken();
    if (token) {
      addProductsCart(product);
      setrReloadCart(true);
    } else {
      toast.warning("Para comprar un juego tienes que iniciar sesión");
    }
  };


  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [auth]
  );
  
  const cartData = useMemo(() => ({
    productsCart: totalProductsCart,
    addProductCart: (product) => addProduct(product),
    getProductsCart: getProductsCart,
    removeProductCart: () => null,
    removeAllProductsCart: () => null
  }), [totalProductsCart]);

  if (auth === undefined) return null;

  return (
    <AuthContext.Provider value={authData}>
      <CartContext.Provider value={ cartData }>
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
        />
      </CartContext.Provider>
    </AuthContext.Provider>
  )
}

export default MyApp
