import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputScrollView from "react-native-input-scroll-view";

const Container = styled.View`
  flex: 1;
  padding: 2% 5%;
`;

const DateTitle = styled.Text`
  margin-top: 15%
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;

const Emotions = styled.View`
  flex-direction: row;
  margin: 10% 0;
  align-items: center;
`;

const Emotion = styled.TouchableOpacity`
  background-color: ${colors.lightPinkColor};
  elevation: 3;
  padding: 10px;
  border-radius: 10px;
`;

const Title = styled.View`
margin-top: 10px
  margin-left: 15px;
  background-color: white;
  border-radius: 20px;
  padding-vertical: 2%;
  padding-horizontal: 2%;
  width: 300px;
`;
const TitleText = styled.Text`
  font-size: 24px;
`;

const SubtitleBox = styled.View`
margin-top: 20px
  background-color: white;
  border-radius: 20px;
  padding-vertical: 4%;
  padding-horizontal: 4%;
  height: 500px

`;

const Subtitle = styled.Text``;

export default function DetailJournal({ route: { params } }) {
  return (
    <Container>
      <DateTitle>{`${params.year}년 ${params.month}월 ${params.day}일`}</DateTitle>
      <Emotions>
        <Emotion>
          <MaterialCommunityIcons
            name={params.selectedEmotion}
            size={24}
            color={colors.redColor}
          />
        </Emotion>
        <Title>
          <TitleText>{params.diary}</TitleText>
        </Title>
      </Emotions>
      <InputScrollView>
        <SubtitleBox>
          <Subtitle>{params.sub}</Subtitle>
        </SubtitleBox>
      </InputScrollView>
    </Container>
  );
}
