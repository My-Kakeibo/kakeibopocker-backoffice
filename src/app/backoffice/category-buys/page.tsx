import { Hydrate } from '@tanstack/react-query';
import { useHydrateGetCategoryBuys } from '@/services/master-data/category-buys/hook';
import CategoryBuyBackoffice from '@/components/templates/layouts/CategoryBuyBackoffice';

export default async function CategoryBuys() {
  const { dehydratedState } = await useHydrateGetCategoryBuys();

  return (
    <>
      <Hydrate state={dehydratedState}>
        <CategoryBuyBackoffice />
      </Hydrate>
    </>
  );
}
