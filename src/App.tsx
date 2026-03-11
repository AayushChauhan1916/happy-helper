import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useMeQuery } from '@/redux/features/auth/auth.api';
import {
  bootstrapFinished,
  bootstrapStarted,
  clearUser,
  setUser,
} from '@/redux/features/auth/auth.slice';
import { hasAccessToken } from '@/lib/auth';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = hasAccessToken();
  const { data, isLoading, isFetching, isError } = useMeQuery(undefined, {
    skip: !isLoggedIn,
  });

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(clearUser());
      dispatch(bootstrapFinished());
      return;
    }

    if (isLoading || isFetching) {
      dispatch(bootstrapStarted());
      return;
    }

    if (isError || !data?.data) {
      localStorage.removeItem('accessToken');
      dispatch(clearUser());
      return;
    }

    dispatch(setUser(data.data));
    dispatch(bootstrapFinished());
  }, [dispatch, isLoggedIn, isLoading, isFetching, isError, data]);

  return <Outlet />;
}

export default App;
