import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import InputScrollView from "react-native-input-scroll-view";
import { Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DBContext } from "../context";
import emotions from "../emotions";
import {
  Btn,
  BtnText,
  Container,
  Emotion,
  Emotions,
  Input,
  Title,
} from "../journalsStyles";

export default function Journal({ navigation: { goBack } }) {
  const { contextDB, setContextDB } = useContext(DBContext);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  const [selectedEmotion, setEmotion] = useState(null);
  const [diary, setDiary] = useState("");
  const [sub, setSub] = useState("");

  const onChangeText = (text) => setDiary(text);
  const onChangeSubText = (text) => setSub(text);
  const onEmotionPress = (face) => setEmotion(face);

  const onSubmit = () => {
    if (diary === "" || selectedEmotion == null) {
      return Alert.alert("이모티콘 선택 또는 제목을 채워주세요.");
    }
    const newJournal = {
      [Date.now()]: {
        diary,
        selectedEmotion,
        todolist: false,
        year,
        month,
        day,
        sub,
        edit: false,
      },
    };
    setContextDB(newJournal);

    goBack();
  };

  return (
    <Container>
      <Title>{`${year}년 ${month}월 ${day}일`}</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion key={index} onPress={() => onEmotionPress(emotion)}>
            <MaterialCommunityIcons
              name={emotion}
              size={24}
              color={
                emotion === selectedEmotion ? colors.redColor : colors.pinkColor
              }
            />
          </Emotion>
        ))}
      </Emotions>
      <InputScrollView>
        <Input
          placeholder="제목"
          value={diary}
          onChangeText={onChangeText}
          style={{ fontSize: 18 }}
        />
        <Input
          placeholder="내용"
          value={sub}
          onChangeText={onChangeSubText}
          multiline
          style={{ marginTop: 30 }}
        />
        <Btn onPress={onSubmit}>
          <BtnText>저장</BtnText>
        </Btn>
      </InputScrollView>
    </Container>
  );
}
