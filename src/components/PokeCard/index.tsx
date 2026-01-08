import React, { memo } from 'react';
import type { SimplePokemon } from '@/types';
import {
  CardContainer,
  LeftSection,
  NameText,
  IdText,
  BadgesView,
  Badge,
  BadgeText,
  PokemonImage,
} from './styles';

interface PokeCardProperties {
  pokemon: SimplePokemon;
}

const PokeCardComponent = ({ pokemon }: PokeCardProperties) => {
  return (
    <CardContainer>
      <LeftSection>
        <NameText>{pokemon.name}</NameText>
        <IdText>#{pokemon.id.toString().padStart(3, '0')}</IdText>

        <BadgesView>
          {pokemon.types.map((pokemonType) => (
            <Badge key={pokemonType}>
              <BadgeText>{pokemonType.toUpperCase()}</BadgeText>
            </Badge>
          ))}
        </BadgesView>
      </LeftSection>

      <PokemonImage source={{ uri: pokemon.imageUrl }} />
    </CardContainer>
  );
};

export const PokeCard = memo(PokeCardComponent);
