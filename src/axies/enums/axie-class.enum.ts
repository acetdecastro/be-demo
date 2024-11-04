import { registerEnumType } from '@nestjs/graphql';

export enum AxieClass {
  BEAST = 'Beast',
  PLANT = 'Plant',
  BUG = 'Bug',
  AQUATIC = 'Aquatic',
  BIRD = 'Bird',
  REPTILE = 'Reptile',
  MECH = 'Mech',
  DAWN = 'Dawn',
  DUSK = 'Dusk',
}

registerEnumType(AxieClass, {
  name: 'AxieClass',
});
