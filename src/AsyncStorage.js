import AsyncStorage from "@react-native-async-storage/async-storage";

const TODO_STORAGE_KEY = "@toDos";
const JOURNAL_STORAGE_KEY = "@contextDB";

// ToDos
export const saveToDos = async (toSave) => {
  await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(toSave));
};

export const loadToDos = async (setToDos) => {
  const toLoad = await AsyncStorage.getItem(TODO_STORAGE_KEY);
  setToDos(JSON.parse(toLoad));
};

// Journal
export const saveJournals = async (toSave) => {
  await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(toSave));
};

export const loadJournals = async (setDiaries) => {
  const toLoad = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);
  setDiaries(JSON.parse(toLoad));
};
