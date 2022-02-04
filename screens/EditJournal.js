import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputScrollView from "react-native-input-scroll-view";
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

export default function EditJournal({
  navigation: { goBack },
  route: {
    params: { diaryInfo, key },
  },
}) {
  const { contextDB, setContextDB } = useContext(DBContext);
  const [selectedEmotion, setEmotion] = useState(diaryInfo.selectedEmotion);
  const [title, setTitle] = useState(diaryInfo.diary);
  const [subtitle, setSubTitle] = useState(diaryInfo.sub);
  const onChangeText = (text) => setTitle(text);
  const onChangeSubText = (text) => setSubTitle(text);
  const onEmotionPress = (face) => setEmotion(face);

  const onSubmit = () => {
    if (title === "" || selectedEmotion == null) {
      return Alert.alert("이모티콘 선택 또는 제목을 채워주세요.");
    }
    const editJournal = {
      [key]: {
        ...diaryInfo,
        selectedEmotion,
        sub: subtitle,
        diary: title,
        edit: true,
      },
    };
    setContextDB(editJournal);
    goBack();
  };

  return (
    <Container>
      <Title>{`${diaryInfo.year}년 ${diaryInfo.month}월 ${diaryInfo.day}일`}</Title>
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
          onChangeText={onChangeText}
          style={{ fontSize: 18 }}
        >
          {title}
        </Input>
        <Input
          placeholder="내용"
          value={subtitle}
          onChangeText={onChangeSubText}
          multiline
          style={{ marginTop: 30 }}
        ></Input>
        <Btn onPress={onSubmit}>
          <BtnText>저장</BtnText>
        </Btn>
      </InputScrollView>
    </Container>
  );
}
