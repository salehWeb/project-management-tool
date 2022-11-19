import Swal from 'sweetalert2';
import { GetToken } from "../api";
import { useCallback, useEffect, useState, useMemo } from 'react'
import useGetUser from "./useGetUser";
import { useRouter } from 'next/router';
import checkExpirationDateJwt from '../functions/checkExpirationDateJwt';

const getTokenHandler = async () => {
  return await GetToken().catch((err) => {
    Swal.fire("Some Think Want Wrong !", `<div class="flex flex-col">
    <h3>Place Try To Religion</h3>
    <p>Error: ${err.response.data.massage}</p>
    </div>`, 'question');
  });
};


export default function TokenHandler() {
  const [user] = useGetUser();
  const [check, setCheck] = useState(0);
  const [isExpired, setIsExpired] = useState(false);
  const router = useRouter();

  const allowedPathsOptions = useMemo(() => {
    return ["/login", "/sing-up", "/"];
  }, [])


  const checkErrorAndGetToken = useCallback(async () => {
    if (!user || !allowedPathsOptions.includes(router.pathname)) {
      await Swal.fire("You must be logged in", "Error", 'error');
      router.push("/login");
      return;
    }
    await getTokenHandler();
  }, [allowedPathsOptions, router, user])


  useEffect(() => {
    checkErrorAndGetToken()
  }, [checkErrorAndGetToken])


  const CheckEveryTwoMinutes = useCallback(async () => {
    const interval = setInterval(async () => {
      setIsExpired(checkExpirationDateJwt(user?.token as string));
      if (user && isExpired) await checkErrorAndGetToken()
      setCheck(check + 1)
    }, 1000 * 60 * 2); // every 2 minutes
    return () => clearInterval(interval);

  }, [check, checkErrorAndGetToken, isExpired, user])


  useEffect(() => {
    CheckEveryTwoMinutes()
  }, [check, CheckEveryTwoMinutes])
}