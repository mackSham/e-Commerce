import { CATEGORIES, SUBCATEGORIES } from '../../data/dummyData';

const initialState = {
  category: CATEGORIES,
  subCategory: SUBCATEGORIES,
};
const categorytReducer = (state = initialState, action) => {
  return state;
};

export default categorytReducer;
