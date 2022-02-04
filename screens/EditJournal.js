import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputScrollView from "react-native-input-scroll-view";
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
        <TitleInput placeholder="제목" onChangeText={onChangeText}>
          {title}
        </TitleInput>
        <Input
          placeholder="내용"
          value={subtitle}
          onChangeText={onChangeSubText}
          multiline
        ></Input>
        <Btn onPress={onSubmit}>
          <BtnText>저장</BtnText>
        </Btn>
      </InputScrollView>
    </Container>
  );
}
