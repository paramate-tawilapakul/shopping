import { createSelector } from 'reselect';

const selectShop = state => state.shop;

// shop.collections is objects
export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
);

// convert obj to arr
export const selectCollectionsForPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectCollections],
    collections => collections[collectionUrlParam]
  );
