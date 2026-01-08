import styled from '@emotion/native';

export const CARD_HEIGHT = 120;

export const CardContainer = styled.View`
  height: ${CARD_HEIGHT}px;
  margin: 12px 8px;
  border-radius: 10px;
  border-width: 2px;
  border-color: #1F2937;
  flex-direction: row;
  justify-content: space-between;
`;

export const LeftSection = styled.View`
  flex: 1;
  gap: 4px;
`;

export const NameText = styled.Text`
  font-size: 18px;
  font-weight: 800;
  color: #111;
`;

export const IdText = styled.Text`
  font-size: 12px;
  font-weight: 700;
  opacity: 0.7;
`;

export const BadgesView = styled.View`
  flex-direction: row;
  gap: 6px;
  margin-top: 6px;
`;

export const Badge = styled.View`
  background-color: #f2f2f2;
  border-radius: 4px;
  padding: 4px 8px;
`;

export const BadgeText = styled.Text`
  font-size: 11px;
  font-weight: 700;
`;

export const PokemonImage = styled.Image`
  width: 96px;
  height: 96px;
  resize-mode: contain;
`;