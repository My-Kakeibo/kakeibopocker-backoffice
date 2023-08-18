import { Hydrate } from '@tanstack/react-query';
import { hydrateGetCategoryBuys } from '@/services/master-data/category-buys/hook';
import CategoryBuyBackoffice from '@/services/master-data/category-buys/components/CategoryBuyBackoffice';

export default async function CategoryBuys() {
  const { dehydratedState } = await hydrateGetCategoryBuys();

  return (
    <>
      <Hydrate state={dehydratedState}>
        <CategoryBuyBackoffice />
      </Hydrate>
    </>
  );
}
