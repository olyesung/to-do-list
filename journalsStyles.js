import styled from "styled-components/native";
import colors from "./colors";

export const Container = styled.View`
  flex: 1;
  padding: 2% 5%;
`;

export const Title = styled.Text`
  margin-top: 15% 
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;

export const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10% 0;
`;

export const Emotion = styled.TouchableOpacity`
  background-color: ${colors.lightPinkColor};
  elevation: 3;
  padding: 10px;
  border-radius: 10px;
`;

export const Input = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding-vertical: 4%;
  padding-horizontal: 4%;
`;

export const Btn = styled.TouchableOpacity`
  background-color: ${colors.redColor};
  padding-vertical: 4%;
  align-items: center;
  border-radius: 20px;
  margin: 5% 0;
`;

export const BtnText = styled.Text`
  color: white;
  font-weight: 500;
  font-size: 18px;
`;

export const FlexRow_AlignCenter = styled.View`
  flex-direction: row;
  align-items: center;
`;
