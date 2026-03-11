import { authApi } from './auth.api';
import { clearUser, setUser, bootstrapStarted } from './auth.slice';
import type { AppDispatch } from '@/redux/app/store';
import { getDashboardPathByRole } from '@/lib/auth';

export async function completeAuthSession(
  accessToken: string,
  dispatch: AppDispatch,
): Promise<string> {
  localStorage.setItem('accessToken', accessToken);
  dispatch(bootstrapStarted());

  try {
    const meResponse = await dispatch(authApi.endpoints.me.initiate()).unwrap();
    dispatch(setUser(meResponse.data));
    return getDashboardPathByRole(meResponse.data.role);
  } catch (error) {
    localStorage.removeItem('accessToken');
    dispatch(clearUser());
    throw error;
  }
}
