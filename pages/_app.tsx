import '../styles/globals.css'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar';
import CircularProgress from '@mui/material/CircularProgress';
import Main from '../components/Main';
import Swal from 'sweetalert2';
import { GetToken } from "../api";
import { useCallback, useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router';
import checkExpirationDateJwt from '../functions/checkExpirationDateJwt';
import { IUser } from '../types/user';

export default function App({ Component, pageProps }: AppProps) {
  const [isBrowser, setIsBrowser] = useState(false)


  useEffect(() => { setIsBrowser(true) }, []);

  return (
    <>
      <NextNProgress />
      <TokenHandler />
      {isBrowser ? (
        <div className="bg-blue-50 overflow-x-hidden">
          <Main>
            <main className="flex">
              <Component {...pageProps} />
            </main>
          </Main>
        </div>
      ) : (
        <CircularProgress />
      )}
    </>
  )
}



const getTokenHandler = async (): Promise<string | undefined> => {
  return await GetToken()
    .then((res) => { return res.data.token })
    .catch((err) => {
      if (!err) return;
      Swal.fire("Some Think Want Wrong !", `<div class="flex flex-col">
      <h3>Place Try To Religion</h3>
      <p>Error: ${err.response.data.massage}</p>
      </div>`, 'question');
    });
};


export function TokenHandler() {
  const [user, setUser] = useState<IUser | null>(null)
  const getUser = useCallback(() => {
      const data: IUser | null = JSON.parse(localStorage.getItem("user") || JSON.stringify(null));
      if (data) setUser(data);
  }, [])

  useEffect(() => {
      getUser()
  }, [])


  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true)
  }, [])
  const allowedPathsOptions = useMemo(() => {
    return ["/login", "/sing-up", "/"];
  }, [])


  const checkErrorAndGetToken = useCallback(async () => {
    if (isBrowser && !user && !allowedPathsOptions.includes(router.pathname)) {
      await Swal.fire("You must be logged in", "Error", 'error');
      router.push("/login");
      return;
    }

    const token = await getTokenHandler();
    if (!token) return;
    
    if (!user) getUser();
     
    let userData = { id: user?.id, createdAt: user?.createdAt, email: user?.email,
      firstName: user?.firstName, lastName: user?.lastName, role: user?.role, token };
      
    localStorage.setItem("user", JSON.stringify(userData));
    getUser();

  }, [])


  useEffect(() => {
    checkErrorAndGetToken()
  }, [checkErrorAndGetToken])


  useEffect(() => {
    const interval = setInterval(async () => {
      console.log(user?.token)
      setIsExpired(checkExpirationDateJwt(user?.token as string));
      if (user && isExpired) await checkErrorAndGetToken()

    }, 1000 * 50); // every 50 Seconds
    return () => clearInterval(interval);

  }, [])

  return <></>;
}