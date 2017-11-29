const LocalStorageStore = require('obs-store/lib/localStorage')


const STORAGE_KEY = 'dapp-config'


// state persistence
const diskStore = new LocalStorageStore({ storageKey: STORAGE_KEY })

diskStore.subscribe(function showValue(value) {
  console.log('saw value:', value)
})


export const putState = (input) => {
  return diskStore.putState(input);
};

export const getState = () => {
  return diskStore.getState();
};