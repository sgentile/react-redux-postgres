export const loadState = (initialState=undefined) => {
  try{
    const serializedState = localStorage.getItem('state');
    if(serializedState === null){
      //if initialState is supplied use it - else return undefined...
      if(initialState === null) {
        return undefined;
      } else {
        return initialState;
      }
    }
    return JSON.parse(serializedState);
  } catch(err){
    console.log('error loading state', err);
    return undefined;
  }
};

export const saveState = (state) =>   {
  try{
    const serializedState = JSON.stringify(state);
    //redux... 'your state should be serializable'
    localStorage.setItem('state', serializedState);
  } catch(err) {
    console.log('error saving state', err);
  }
};
