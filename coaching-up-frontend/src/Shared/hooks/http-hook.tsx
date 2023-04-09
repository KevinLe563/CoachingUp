import { useState, useContext, useCallback, useRef, useEffect } from 'react';
import { LoadingContext } from '../context/LoadingContext';

export const useHttpClient = () => {
    const [error, setError] = useState<string>();
    const loading = useContext(LoadingContext);
    const initialVal : AbortController[] = [];
    const activeHttpRequests = useRef(initialVal);

    const sendRequest = useCallback(async (url : string, method = 'GET', body = null, headers = {}) => {
        loading.setLoading();
        // abort controller can be used to cancel the request. Useful in case the user quickly switches away the tab
        const httpAbortCtrl = new AbortController();
        activeHttpRequests.current.push(httpAbortCtrl);
        try {
            const response = await fetch(url, {
                method,
                body,
                headers,
                signal: httpAbortCtrl.signal
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.message);
            }

            return responseData;
        } catch(err) {
            setError((err as Error).message || 'Something went wrong. Please try again.');
        }
        loading.setNotLoading();
    }, []);

    const resetError= () => {
        setError(undefined);
    }

    useEffect(() => {
        return () => {
         activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort());   
        };
    }, []);

    return { sendRequest, error, resetError };
};