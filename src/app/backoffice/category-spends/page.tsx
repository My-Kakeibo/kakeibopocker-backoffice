import { Hydrate } from '@tanstack/react-query';
import { hydrateGetCategorySpends } from '@/services/master-data/category-spends/hook';
import CategorySpendBackoffice from '@/services/master-data/category-spends/components/CategorySpendBackoffice';

export default async function CategorySpends() {
  const { dehydratedState } = await hydrateGetCategorySpends();

  return (
    <>
      <Hydrate state={dehydratedState}>
        <CategorySpendBackoffice />
      </Hydrate>
    </>
  );
}
