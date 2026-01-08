import styled from '@emotion/native';

export const CARD_HEIGHT = 180;

const TYPE_COLORS: Record<string, string> = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
};

export const getTypeColor = (type: string): string => {
  return TYPE_COLORS[type.toLowerCase()] || '#777777';
};

export const DarkBorder = styled.View`
  background-color: #374151;
  padding: 4px;
  border-radius: 24px;
`;

export const LightBorder = styled.View`
  background-color: #6b7280;
  padding: 10px;
  border-radius: 24px;
`;


export const CardContainer = styled.View`
  background-color: #f3f4f6;
  padding: 24px;
  overflow: hidden;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const HeaderPill = styled.View`
  background-color: #2563eb;
  padding: 6px 12px;
  border-radius: 20px;
  margin-right: 8px;
  width: 100%;
  align-items: center;
`;

export const HeaderHalfChip = styled.View`
  background-color: #dc2626;
  padding: 6px 12px;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  margin-right: 8px;
  transform-origin: left center;
  transform: [{ rotate: '-15deg' }];
`;

export const DiagonalWrapper = styled.View`
  transform: [{ rotate: '-15deg' }];
`;

export const DiagonalContent = styled.View`
  transform: [{ rotate: '15deg' }];
`;

export const NameText = styled.Text`
  font-size: 26px;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.6);
  letter-spacing: 1px;
`;

export const ContentRow = styled.View`
  flex-direction: row;
  padding: 16px;
  gap: 16px;
  background-color: #f8f9fa;
`;

export const ImageCard = styled.View`
  width: 140px;
  height: 140px;
  background-color: #ffffff;
  border-radius: 16px;
  border-width: 4px;
  border-color: #1a202c;
  padding: 8px;
  justify-content: center;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 6px;
  elevation: 6;
`;

export const PokemonImage = styled.Image`
  width: 120px;
  height: 120px;
  resize-mode: contain;
`;

export const RightSection = styled.View`
  flex: 1;
  gap: 12px;
  justify-content: space-between;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

export const IdBadge = styled.View`
  background-color: #4a5568;
  padding: 8px 14px;
  border-radius: 12px;
  border-width: 3px;
  border-color: #1a202c;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  elevation: 3;
`;

export const IdText = styled.Text`
  font-size: 18px;
  font-weight: 900;
  color: #ffffff;
`;

export const BadgesView = styled.View`
  flex-direction: row;
  gap: 6px;
  flex-wrap: wrap;
  flex: 1;
`;

interface BadgeProps {
  typeColor: string;
}

export const Badge = styled.View<BadgeProps>`
  background-color: ${props => props.typeColor};
  border-radius: 10px;
  padding: 8px 14px;
  border-width: 3px;
  border-color: #1a202c;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.3;
  shadow-radius: 3px;
  elevation: 3;
`;

export const BadgeText = styled.Text`
  font-size: 14px;
  font-weight: 900;
  color: #ffffff;
  text-shadow: 2px 2px 3px rgba(0, 0, 0, 0.4);
`;

export const StatsContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  flex-wrap: wrap;
`;

export const StatBox = styled.View`
  background-color: #ffffff;
  padding: 10px;
  border-radius: 12px;
  border-width: 3px;
  border-color: #1a202c;
  min-width: 65px;
  align-items: center;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.15;
  shadow-radius: 3px;
  elevation: 3;
`;

export const StatLabel = styled.Text`
  font-size: 11px;
  font-weight: 800;
  color: #6b7280;
  margin-bottom: 2px;
`;

export const StatValue = styled.Text`
  font-size: 20px;
  font-weight: 900;
  color: #1a202c;
`;