import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import InputScrollView from "react-native-input-scroll-view";
import { Alert } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DBContext } from "../context";

const Container = styled.View`
  flex: 1;
  padding: 2% 5%;
`;

const Title = styled.Text`
  margin-top: 15% 
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;

const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10% 0;
`;

const Emotion = styled.TouchableOpacity`
  background-color: ${colors.lightPinkColor};
  elevation: 3;
  padding: 10px;
  border-radius: 10px;
`;

const TitleInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding-vertical: 4%;
  padding-horizontal: 4%;
  font-size: 18px;
`;

const Input = styled.TextInput`
margin-top: 30px
  background-color: white;
  border-radius: 20px;
  padding-vertical: 4%;
  padding-horizontal: 4%;

`;

const Btn = styled.TouchableOpacity`
  background-color: ${colors.redColor};
  padding-vertical: 4%;
  align-items: center;
  border-radius: 20px;
  margin: 5% 0;
`;
const BtnText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
`;

const emotions = [
  "emoticon-kiss-outline",
  "emoticon-lol-outline",
  "emoticon-excited-outline",
  "emoticon-tongue-outline",
  "emoticon-cool-outline",
  "emoticon-wink-outline",
];

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
        <TitleInput
          placeholder="제목"
          value={diary}
          onChangeText={onChangeText}
        />
        <Input
          placeholder="내용"
          value={sub}
          onChangeText={onChangeSubText}
          multiline
        />
        <Btn onPress={onSubmit}>
          <BtnText>저장</BtnText>
        </Btn>
      </InputScrollView>
    </Container>
  );
}
