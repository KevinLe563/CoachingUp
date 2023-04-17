import { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { LoadingContext } from '../context/LoadingContext';

export const useHttpClient = () => {
    const [error, setError] = useState<string>();
    const loading = useContext(LoadingContext);
    const initialVal : AbortController[] = [];
    const activeHttpRequests = useRef(initialVal);

    const sendRequest = useCallback(async (url : string, method = 'GET', headers = {}, body : (FormData | string | null) = null) => {
        // if (loadingMessage) {
        //     loading.setLoadingMessage(loadingMessage);
        // }
        loading.setLoading();
        // abort controller can be used to cancel the request. Useful in case the user quickly switches away the tab
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try {
            // for testing
            const sleep = (ms : number) => new Promise(r => setTimeout(r, ms));
            await sleep(1000);
            //
            const response = await fetch(url, {
                method,
                headers,
                body,
                signal: httpAbortCtrl.signal
            });

            const responseData = await response.json();

            activeHttpRequests.current = activeHttpRequests.current.filter(reqCtrl => reqCtrl !== httpAbortCtrl);

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            loading.setNotLoading();
            loading.clearLoadingMessage();
            return responseData;
        } catch(err) {
            setError((err as Error).message || 'Something went wrong. Please try again.');
            loading.setNotLoading();
            loading.clearLoadingMessage();
            throw err;
        }
    }, []);

    const errorHandler= () => {
        setError(undefined);
    }

    // abort the request on a rerender
    // useEffect(() => {
    //     return () => {
    //         try {
    //             activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());
    //         } catch(err){
    //             console.log(err)
    //         };
    //     };
    // }, []);

    return { sendRequest, error, errorHandler };
};