import React from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import InputScrollView from "react-native-input-scroll-view";
import {
  Container,
  Emotion,
  FlexRow_AlignCenter,
  Title,
} from "../journalsStyles";

const Emotions = styled(FlexRow_AlignCenter)`
  margin: 10% 0;
`;

const Text_box = styled.View`
margin-top: ${(props) => props.marginTop}
  background-color: white;
  border-radius: 20px;
  padding-vertical: ${(props) => props.padding}
  padding-horizontal: ${(props) => props.padding}
`;
const TitleText = styled.Text`
  font-size: 24px;
`;

const Subtitle = styled.Text``;

export default function DetailJournal({ route: { params } }) {
  return (
    <Container>
      <Title>{`${params.year}년 ${params.month}월 ${params.day}일`}</Title>
      <Emotions>
        <Emotion>
          <MaterialCommunityIcons
            name={params.selectedEmotion}
            size={24}
            color={colors.redColor}
          />
        </Emotion>
        <Text_box
          marginTop="10px"
          padding="2%"
          style={{ marginLeft: 15, width: 300 }}
        >
          <TitleText>{params.diary}</TitleText>
        </Text_box>
      </Emotions>
      <InputScrollView>
        <Text_box marginTop="20px" padding="4%" style={{ height: 500 }}>
          <Subtitle>{params.sub}</Subtitle>
        </Text_box>
      </InputScrollView>
    </Container>
  );
}
