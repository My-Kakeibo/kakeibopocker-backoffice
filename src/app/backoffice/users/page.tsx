import { Hydrate } from '@tanstack/react-query';
import { hydrateGetUsers } from '@/services/master-data/users/hook';
import UserBackoffice from '@/services/master-data/users/components/UserBackoffice';

export default async function Users() {
  const { dehydratedState } = await hydrateGetUsers();

  return (
    <>
      <Hydrate state={dehydratedState}>
        <UserBackoffice />
      </Hydrate>
    </>
  );
}
