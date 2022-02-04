import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, ScrollView, Alert } from "react-native";
import styled from "styled-components/native";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DBContext } from "../context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlexRow_AlignCenter } from "../journalsStyles";

const Container = styled.View`
  flex:1
  background-color: white;
`;

const Center = styled.View`
  align-items: center;
  justify-content: center;
`;

const Header = styled.View`
flex-direction: row;
padding-top: 15%;
padding-bottom: 5%;
justify-content:space-between
padding-horizontal:10%
background-color: ${colors.redColor}
border-radius: 30px
`;

const Header_text = styled.Text`
  font-size: 28px;
`;

const Input = styled.TextInput`
  font-size: 18px;
  padding-vertical: 4%;
  margin: 5% 5% 0 5%;
  border-radius: 20px;
  border: 2px solid ${colors.darkBlueColor};
`;

const ToDo = styled(FlexRow_AlignCenter)`
  margin: 2% 5%;
  border-radius: 20px;
  justify-content: space-between;
`;

const ToDo_check_box = styled.TouchableOpacity`
  margin-right: 20px;
`;

const Color_box = styled(Center)`
  background-color:${colors.lightPinkColor}
  width: ${(props) => props.pixel}
  height: ${(props) => props.pixel}
  border-radius: 12px;
`;

const Check_box = styled(Center)`
  width: 40px;
  height: 40px;
`;

const ToDo_text = styled.Text`
  font-size: 16px;
  font-weight: 500;
  text-decoration: ${(props) => (props.selected ? "line-through" : null)};
  color: ${(props) => (props.selected ? colors.grayColor : "black")};
`;

const ToDo_input = styled.TextInput`
width: 250px
  border: 1px solid ${colors.darkBlueColor};
  padding-horizontal: 10px
  padding-vertical: 5px
`;

const Journal = styled(FlexRow_AlignCenter)`
  margin: 2% 5%;
  border-radius: 20px;
  justify-content: space-between;
`;

const Journal_text_box = styled.TouchableOpacity`
  width: 250px;
  margin-left: 13px;
`;

const Journal_date = styled.Text`
  font-size: 12px;
  opacity: 0.6;
`;
const Journal_text = styled.Text`
  font-size: 18px;
  line-height: 30px;
`;

const Journal_Btn = styled.TouchableOpacity`
  background-color: ${colors.redColor};
  width: 80px;
  height: 80px;
  border-radius: 40px;
  justify-content: center;
  align-items: center;
  bottom: 0px;
  position: absolute;
  bottom: 2%;
  right: 5%;
  elevation: 3;
  z-index: 1;
`;

const TODO_STORAGE_KEY = "@toDos";
const JOURNAL_STORAGE_KEY = "@contextDB";

export default function Note({ navigation: { navigate } }) {
  const { contextDB, setContextDB } = useContext(DBContext);
  const [todolist, setTodolist] = useState(true);
  const [text, setText] = useState("");
  const [toDos, setToDos] = useState({});
  const [diaries, setDiaries] = useState({});
  const [check, setCheck] = useState(false);
  const [edit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");

  const journal = () => setTodolist(false);
  const todo = () => setTodolist(true);
  const onChangeText = (payload) => setText(payload);
  const onChangeEditText = (payload) => setEditText(payload);

  useEffect(() => {
    loadToDos();
    loadJournals();
  }, []);

  useEffect(() => {
    if (Object.keys(contextDB).length > 0) {
      if (Object.values(contextDB)[0].edit === false) {
        addJournal(contextDB);
      }
      if (Object.values(contextDB)[0].edit === true) {
        editJournal(contextDB);
      }
    } else return;
  }, [contextDB]);

  const saveToDos = async (toSave) => {
    await AsyncStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(toSave));
  };
  const saveJournals = async (toSave) => {
    await AsyncStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(toSave));
  };

  const loadToDos = async () => {
    const toLoad = await AsyncStorage.getItem(TODO_STORAGE_KEY);
    setToDos(JSON.parse(toLoad));
  };

  const loadJournals = async () => {
    const toLoad = await AsyncStorage.getItem(JOURNAL_STORAGE_KEY);
    setDiaries(JSON.parse(toLoad));
  };

  const addJournal = async (newDiary) => {
    const newJournals = {
      ...newDiary,
      ...diaries,
    };
    setContextDB({});
    setDiaries(newJournals);
    await saveJournals(newJournals);
  };

  const addToDo = async () => {
    if (text === "") {
      return;
    }
    const newToDos = {
      [Date.now()]: { text, todolist, check, edit },
      ...toDos,
    };
    setToDos(newToDos);
    await saveToDos(newToDos);
    setText("");
  };

  const deleteJournal = (key) => {
    Alert.alert("", "수정 또는 삭제 하시겠습니까?", [
      { text: "취소" },
      {
        text: "수정",
        onPress: () => {
          const diaryInfo = diaries[key];
          navigate("EditJournal", { key, diaryInfo });
        },
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          const newJournal = { ...diaries };
          delete newJournal[key];
          setDiaries(newJournal);
          saveJournals(newJournal);
        },
      },
    ]);
  };

  const deleteToDo = (key) => {
    Alert.alert("", "수정 또는 삭제 하시겠습니까?", [
      { text: "취소" },
      {
        text: "수정",
        onPress: () => {
          editToDo(key);
        },
      },
      {
        text: "삭제",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[key];
          setToDos(newToDos);
          saveToDos(newToDos);
        },
      },
    ]);
  };

  const editToDo = async (key) => {
    const newToDos = { ...toDos };
    newToDos[key].edit = !newToDos[key].edit;
    setToDos(newToDos);
    await saveToDos(newToDos);
  };

  const editJournal = async (edit) => {
    const key = Object.keys(edit)[0];
    const diary = { ...diaries };
    diary[key] = edit[key];
    setContextDB({});
    setDiaries(diary);
    await saveJournals(diary);
  };

  const editSubmit = async (key) => {
    if (editText === "") {
      return;
    }
    const newToDos = { ...toDos };
    newToDos[key].text = editText;
    newToDos[key].edit = !newToDos[key].edit;
    setToDos(newToDos);
    await saveToDos(newToDos);
    setEditText("");
  };

  const isChecked = (key) => {
    const newToDos = { ...toDos };
    newToDos[key].check = !newToDos[key].check;
    setToDos(newToDos);
    saveToDos(newToDos);
  };

  return (
    <DBContext.Provider value={contextDB}>
      <Container>
        <Header>
          <TouchableOpacity onPress={todo}>
            <Header_text
              style={{
                color: todolist ? "white" : colors.pinkColor,
              }}
            >
              할 일
            </Header_text>
          </TouchableOpacity>
          <TouchableOpacity onPress={journal}>
            <Header_text
              style={{ color: !todolist ? "white" : colors.pinkColor }}
            >
              일기
            </Header_text>
          </TouchableOpacity>
        </Header>
        {todolist ? (
          <Input
            onSubmitEditing={addToDo}
            onChangeText={onChangeText}
            value={text}
            style={{ paddingHorizontal: 20 }}
            placeholderTextColor={colors.pinkColor}
            placeholder="Add a To Do List"
          ></Input>
        ) : (
          <Journal_Btn onPress={() => navigate("Journal")}>
            <Ionicons name="add" color="white" size={40} />
          </Journal_Btn>
        )}
        <ScrollView style={{ paddingTop: 40 }}>
          {Object.keys(toDos).map((key) =>
            toDos[key].todolist === todolist ? (
              <ToDo key={key}>
                <FlexRow_AlignCenter>
                  <ToDo_check_box onPress={() => isChecked(key)}>
                    {toDos[key].check ? (
                      <Color_box pixel="40px">
                        <Ionicons
                          name="checkmark-sharp"
                          size={20}
                          color={colors.redColor}
                        />
                      </Color_box>
                    ) : (
                      <Check_box>
                        <Ionicons
                          name="checkbox-outline"
                          size={20}
                          color={colors.grayColor}
                        />
                      </Check_box>
                    )}
                  </ToDo_check_box>

                  {!toDos[key].edit ? (
                    <ToDo_text selected={toDos[key].check}>
                      {toDos[key].text}
                    </ToDo_text>
                  ) : (
                    <ToDo_input
                      onChangeText={onChangeEditText}
                      onSubmitEditing={() => editSubmit(key)}
                      value={editText}
                      placeholder="입력하기"
                    ></ToDo_input>
                  )}
                </FlexRow_AlignCenter>
                <TouchableOpacity
                  onLongPress={() => deleteToDo(key)}
                  activeOpacity={0.6}
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={24}
                    color={colors.grayColor}
                  />
                </TouchableOpacity>
              </ToDo>
            ) : null
          )}
          {Object.keys(diaries).map((key) =>
            diaries[key].todolist === todolist ? (
              <Journal key={key}>
                <FlexRow_AlignCenter>
                  <Color_box pixel="50px">
                    <MaterialCommunityIcons
                      name={diaries[key].selectedEmotion}
                      size={24}
                      color={colors.redColor}
                    />
                  </Color_box>
                  <Journal_text_box
                    onPress={() =>
                      navigate("DetailJournal", { ...diaries[key] })
                    }
                  >
                    <Journal_date>{`${diaries[key].year}-${diaries[key].month}-${diaries[key].day}`}</Journal_date>
                    <Journal_text>{diaries[key].diary}</Journal_text>
                  </Journal_text_box>
                </FlexRow_AlignCenter>
                <TouchableOpacity
                  onLongPress={() => deleteJournal(key)}
                  activeOpacity={0.6}
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={24}
                    color={colors.grayColor}
                  />
                </TouchableOpacity>
              </Journal>
            ) : null
          )}
        </ScrollView>
      </Container>
    </DBContext.Provider>
  );
}
