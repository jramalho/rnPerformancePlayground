import React, { memo, useMemo } from 'react';
import { 
  Canvas, 
  RoundedRect, 
  Skia, 
  Text as SkiaText,
  matchFont,
  Group,
  vec,
  Image as SkiaImage,
  useImage,
  Path
} from '@shopify/react-native-skia';
import { View, Dimensions, Platform } from 'react-native';
import type { SimplePokemon } from '@/types';
import { getTypeColor } from './styles';

interface PokeCardProperties {
  pokemon: SimplePokemon;
}

const CARD_WIDTH = Dimensions.get('window').width - 32;
const CARD_HEIGHT = 240;

const capitalizeFirstLetter = (text: string): string => {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

const PokeCardComponent = ({ pokemon }: PokeCardProperties) => {
  // Configurações de cores
  const blueColor = Skia.Color('#2563eb');
  const redColor = Skia.Color('#dc2626');
  const darkBorderColor = Skia.Color('#374151');
  const lightBorderColor = Skia.Color('#6b7280');
  const cardBgColor = Skia.Color('#f3f4f6');
  const whiteColor = Skia.Color('#ffffff');
  const darkTextColor = Skia.Color('#1a202c');
  const grayTextColor = Skia.Color('#6b7280');
  const yellowColor = Skia.Color('#f59e0b');
  const purpleColor = Skia.Color('#9333ea');
  const cyanColor = Skia.Color('#0ea5e9');
  
  // Configurações das bordas
  const outerBorderRadius = 24;
  const middleBorderRadius = 20;
  const innerBorderRadius = 16;
  
  // Load image
  const pokemonImage = useImage(pokemon.imageUrl);
  
  // Fontes
  const titleFont = matchFont({ 
    fontFamily: Platform.select({ ios: 'Helvetica-Bold', android: 'sans-serif-black', default: 'System' }),
    fontSize: 26,
    fontWeight: 'bold'
  });
  
  const numberFont = matchFont({ 
    fontFamily: Platform.select({ ios: 'Helvetica-Bold', android: 'sans-serif-black', default: 'System' }),
    fontSize: 16,
    fontWeight: 'bold'
  });
  
  const typeFont = matchFont({ 
    fontFamily: Platform.select({ ios: 'Helvetica-Bold', android: 'sans-serif-black', default: 'System' }),
    fontSize: 14,
    fontWeight: 'bold'
  });
  
  const statLabelFont = matchFont({ 
    fontFamily: Platform.select({ ios: 'Helvetica-Bold', android: 'sans-serif-black', default: 'System' }),
    fontSize: 11,
    fontWeight: 'bold'
  });
  
  const statValueFont = matchFont({ 
    fontFamily: Platform.select({ ios: 'Helvetica-Bold', android: 'sans-serif-black', default: 'System' }),
    fontSize: 18,
    fontWeight: 'bold'
  });
  
  const buttonFont = matchFont({ 
    fontFamily: Platform.select({ ios: 'Helvetica-Bold', android: 'sans-serif-black', default: 'System' }),
    fontSize: 12,
    fontWeight: 'bold'
  });
  
  // Criar path para o header diagonal
  const headerPath = useMemo(() => {
    const path = Skia.Path.Make();
    const headerHeight = 60;
    const angle = 10;
    const offset = Math.tan((angle * Math.PI) / 180) * headerHeight;
    
    path.moveTo(16, 16);
    path.lineTo(CARD_WIDTH - 16 - offset, 16);
    path.lineTo(CARD_WIDTH - 16, 16 + headerHeight);
    path.lineTo(16 + offset, 16 + headerHeight);
    path.close();
    
    return path;
  }, []);
  
  // Criar path para a parte vermelha do header
  const redHeaderPath = useMemo(() => {
    const path = Skia.Path.Make();
    const headerHeight = 60;
    const angle = 10;
    const offset = Math.tan((angle * Math.PI) / 180) * headerHeight;
    const splitPoint = CARD_WIDTH * 0.7;
    
    path.moveTo(splitPoint - offset, 16);
    path.lineTo(CARD_WIDTH - 16 - offset, 16);
    path.lineTo(CARD_WIDTH - 16, 16 + headerHeight);
    path.lineTo(splitPoint, 16 + headerHeight);
    path.close();
    
    return path;
  }, []);
  
  return (
    <View style={{ width: CARD_WIDTH, height: CARD_HEIGHT, alignSelf: 'center', marginVertical: 16 }}>
      <Canvas style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}>
        {/* Borda externa escura */}
        <RoundedRect
          x={0}
          y={0}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          r={outerBorderRadius}
          color={darkBorderColor}
        />
        
        {/* Borda média clara */}
        <RoundedRect
          x={4}
          y={4}
          width={CARD_WIDTH - 8}
          height={CARD_HEIGHT - 8}
          r={middleBorderRadius}
          color={lightBorderColor}
        />
        
        {/* Borda interna escura */}
        <RoundedRect
          x={14}
          y={14}
          width={CARD_WIDTH - 28}
          height={CARD_HEIGHT - 28}
          r={innerBorderRadius}
          color={darkBorderColor}
        />
        
        {/* Background do card */}
        <RoundedRect
          x={16}
          y={16}
          width={CARD_WIDTH - 32}
          height={CARD_HEIGHT - 32}
          r={innerBorderRadius - 2}
          color={cardBgColor}
        />
        
        {/* Header diagonal azul */}
        <Path path={headerPath} color={blueColor} />
        
        {/* Header diagonal vermelho (parte direita) */}
        <Path path={redHeaderPath} color={redColor} />
        
        {/* Nome do Pokemon no header */}
        <SkiaText
          x={CARD_WIDTH / 2 - 50}
          y={50}
          text={capitalizeFirstLetter(pokemon.name)}
          font={titleFont}
          color={whiteColor}
        />
        
        {/* Área de conteúdo - Box da imagem (lado esquerdo) */}
        <Group>
          {/* Borda do box da imagem */}
          <RoundedRect
            x={24}
            y={88}
            width={130}
            height={130}
            r={16}
            color={darkTextColor}
          />
          
          {/* Background branco do box da imagem */}
          <RoundedRect
            x={28}
            y={92}
            width={122}
            height={122}
            r={14}
            color={whiteColor}
          />
          
          {/* Imagem do pokemon */}
          {pokemonImage && (
            <SkiaImage
              image={pokemonImage}
              x={38}
              y={102}
              width={102}
              height={102}
              fit="contain"
            />
          )}
        </Group>
        
        {/* Badge do número - lado direito superior */}
        <Group>
          <RoundedRect
            x={165}
            y={88}
            width={70}
            height={32}
            r={12}
            color={darkTextColor}
          />
          <RoundedRect
            x={168}
            y={91}
            width={64}
            height={26}
            r={10}
            color={Skia.Color('#4a5568')}
          />
          <SkiaText
            x={178}
            y={109}
            text={`#${pokemon.id.toString().padStart(3, '0')}`}
            font={numberFont}
            color={whiteColor}
          />
        </Group>
        
        {/* Badges dos tipos */}
        {pokemon.types.map((pokemonType, index) => {
          const badgeX = 245 + index * 70;
          const typeColor = Skia.Color(getTypeColor(pokemonType));
          
          return (
            <Group key={pokemonType}>
              <RoundedRect
                x={badgeX}
                y={88}
                width={65}
                height={32}
                r={10}
                color={darkTextColor}
              />
              <RoundedRect
                x={badgeX + 3}
                y={91}
                width={59}
                height={26}
                r={8}
                color={typeColor}
              />
              <SkiaText
                x={badgeX + 12}
                y={109}
                text={capitalizeFirstLetter(pokemonType)}
                font={typeFont}
                color={whiteColor}
              />
            </Group>
          );
        })}
        
        {/* Stats boxes */}
        {pokemon.stats && (
          <Group>
            {/* HP */}
            <Group>
              <RoundedRect x={165} y={130} width={65} height={45} r={12} color={darkTextColor} />
              <RoundedRect x={168} y={133} width={59} height={39} r={10} color={whiteColor} />
              <SkiaText x={180} y={148} text="HP" font={statLabelFont} color={grayTextColor} />
              <SkiaText x={179} y={165} text={pokemon.stats.hp.toString()} font={statValueFont} color={darkTextColor} />
            </Group>
            
            {/* ATK */}
            <Group>
              <RoundedRect x={240} y={130} width={65} height={45} r={12} color={darkTextColor} />
              <RoundedRect x={243} y={133} width={59} height={39} r={10} color={whiteColor} />
              <SkiaText x={251} y={148} text="ATK" font={statLabelFont} color={grayTextColor} />
              <SkiaText x={254} y={165} text={pokemon.stats.attack.toString()} font={statValueFont} color={darkTextColor} />
            </Group>
            
            {/* DEF */}
            <Group>
              <RoundedRect x={165} y={185} width={65} height={45} r={12} color={darkTextColor} />
              <RoundedRect x={168} y={188} width={59} height={39} r={10} color={whiteColor} />
              <SkiaText x={178} y={203} text="DEF" font={statLabelFont} color={grayTextColor} />
              <SkiaText x={179} y={220} text={pokemon.stats.defense.toString()} font={statValueFont} color={darkTextColor} />
            </Group>
            
            {/* SPD */}
            <Group>
              <RoundedRect x={240} y={185} width={65} height={45} r={12} color={darkTextColor} />
              <RoundedRect x={243} y={188} width={59} height={39} r={10} color={whiteColor} />
              <SkiaText x={251} y={203} text="SPD" font={statLabelFont} color={grayTextColor} />
              <SkiaText x={254} y={220} text={pokemon.stats.speed.toString()} font={statValueFont} color={darkTextColor} />
            </Group>
          </Group>
        )}
        
        {/* Botões inferiores */}
        <Group>
          {/* Botão "Zumbido Sônico" */}
          <RoundedRect
            x={24}
            y={CARD_HEIGHT - 50}
            width={120}
            height={36}
            r={18}
            color={darkTextColor}
          />
          <RoundedRect
            x={27}
            y={CARD_HEIGHT - 47}
            width={114}
            height={30}
            r={15}
            color={yellowColor}
          />
          <SkiaText
            x={32}
            y={CARD_HEIGHT - 27}
            text="Zumbido Sônico"
            font={buttonFont}
            color={whiteColor}
          />
          
          {/* Botão "Chama Dracônica" */}
          <RoundedRect
            x={154}
            y={CARD_HEIGHT - 50}
            width={120}
            height={36}
            r={18}
            color={darkTextColor}
          />
          <RoundedRect
            x={157}
            y={CARD_HEIGHT - 47}
            width={114}
            height={30}
            r={15}
            color={purpleColor}
          />
          <SkiaText
            x={162}
            y={CARD_HEIGHT - 27}
            text="Chama Dracônica"
            font={buttonFont}
            color={whiteColor}
          />
          
          {/* Botão "Ver Detalhes" */}
          <RoundedRect
            x={284}
            y={CARD_HEIGHT - 50}
            width={100}
            height={36}
            r={18}
            color={darkTextColor}
          />
          <RoundedRect
            x={287}
            y={CARD_HEIGHT - 47}
            width={94}
            height={30}
            r={15}
            color={cyanColor}
          />
          <SkiaText
            x={295}
            y={CARD_HEIGHT - 27}
            text="Ver Detalhes"
            font={buttonFont}
            color={whiteColor}
          />
        </Group>
      </Canvas>
    </View>
  );
};

export const PokeCard = memo(PokeCardComponent);
