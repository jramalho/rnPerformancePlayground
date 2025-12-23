# GitHub Copilot Instructions - React Native Performance Playground

## Core Principles

### Object Calisthenics Rules
1. **One level of indentation per method** - Extract nested logic into separate functions
2. **Don't use ELSE keyword** - Use early returns, guard clauses, or polymorphism
3. **Wrap all primitives and strings** - Create types/interfaces for domain concepts
4. **First class collections** - Wrap collections in their own classes/types
5. **One dot per line** - Avoid chaining, use intermediate variables (except for builders)
6. **Don't abbreviate** - Use descriptive, full names for variables and functions
7. **Keep all entities small** - Max 50 lines per file, functions should be 5-10 lines
8. **No more than two instance variables per class** - Keep components focused
9. **No getters/setters** - Prefer immutability and direct property access

### KISS (Keep It Simple, Stupid)
- Prefer simple solutions over clever ones
- Avoid premature optimization
- Write code that's easy to read and understand
- If you need comments to explain logic, refactor instead
- One responsibility per function/component

## React Native Specific Guidelines

### Performance Best Practices
- **Memoization**: Use `React.memo` for components that render often with same props
- **Callbacks**: Always wrap callbacks in `useCallback` to prevent unnecessary re-renders
- **Values**: Use `useMemo` for expensive computations
- **FlatList**: Always provide `keyExtractor`, use `getItemLayout` when possible
- **Image optimization**: Use appropriate image sizes, consider caching strategies
- **Avoid inline objects/arrays**: Create them outside render or memoize them

### Component Structure
```typescript
// ✅ Good: Small, focused component
const UserAvatar = ({ uri }: { uri: string }) => (
  <Image source={{ uri }} style={styles.avatar} />
);

// ❌ Bad: Component doing too much
const UserProfile = () => {
  // Multiple responsibilities, too large
};
```

### Hooks Rules
- Always declare hooks at the top level
- Custom hooks must start with `use`
- Keep hooks focused - one responsibility per hook
- Extract complex logic into custom hooks

### TypeScript Strict Mode
- Enable strict mode in tsconfig.json
- No `any` types - use `unknown` if type is truly unknown
- Define proper interfaces for all props and data structures
- Use discriminated unions for different states

### Navigation
- Type all navigation params
- Use typed navigation hooks
- Keep navigation logic in navigator files
- Screens should receive typed props

### File Organization
```
src/
  components/     # Reusable UI components
  screens/        # Screen components
  navigation/     # Navigation configuration
  services/       # API calls and business logic
  hooks/          # Custom hooks
  types/          # TypeScript types and interfaces
  utils/          # Pure utility functions
  constants/      # App-wide constants
```

### Naming Conventions
- Components: PascalCase (e.g., `UserProfile.tsx`)
- Hooks: camelCase with `use` prefix (e.g., `useUserData.ts`)
- Utils: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`)
- Types: PascalCase with descriptive names (e.g., `UserProfile`, `NavigationParams`)

### Testing
- Write tests for business logic and utilities
- Test custom hooks
- Use meaningful test descriptions
- Follow AAA pattern: Arrange, Act, Assert

### Code Style
- Use functional components only
- Prefer const over let
- Use destructuring for props and objects
- Use template literals for strings with variables
- Avoid default exports - prefer named exports
- Extract magic numbers into named constants

## Examples

### ✅ Good: Following Object Calisthenics and KISS

```typescript
interface PokemonId {
  value: number;
}

interface PokemonName {
  value: string;
}

const fetchPokemonById = async (id: PokemonId): Promise<PokemonName> => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id.value}`);
  
  if (!response.ok) {
    throw new Error('Pokemon not found');
  }
  
  const data = await response.json();
  return { value: data.name };
};

const PokemonDisplay = ({ name }: { name: PokemonName }) => (
  <Text>{name.value}</Text>
);
```

### ❌ Bad: Violating principles

```typescript
// Multiple levels of indentation, abbreviations, using else, no types
const getPkmn = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  if (res.ok) {
    const d = await res.json();
    if (d.name) {
      return d.name;
    } else {
      return 'Unknown';
    }
  } else {
    return null;
  }
};
```

## Quick Checklist
- [ ] No function longer than 10 lines?
- [ ] No more than one level of indentation?
- [ ] No else keywords?
- [ ] All primitives wrapped in types?
- [ ] Descriptive names without abbreviations?
- [ ] TypeScript strict types?
- [ ] Memoized where appropriate?
- [ ] Single responsibility?
- [ ] Early returns for guard clauses?
- [ ] Named exports instead of default?
