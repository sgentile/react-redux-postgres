import * as ACTIONS from './actionTypes';

export default function toggleLoading(isLoading) {
  return {
    type: ACTIONS.LOADING_STATUS,
    isLoading
  };
}
