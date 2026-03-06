import { useDummyAuthCheckQuery } from '@/redux/features/auth/auth.api';

export default function Home() {
  const { isFetching, isError, isSuccess } = useDummyAuthCheckQuery(undefined, {
    pollingInterval: 20_000,
    refetchOnMountOrArgChange: true,
  });

  return (
    <div>
      <p>Home Page</p>
      <p>Dummy auth check: {isFetching ? 'checking...' : 'idle'}</p>
      <p>Status: {isSuccess ? 'success' : isError ? 'failed' : 'waiting'}</p>
    </div>
  );
}
