import { Ingredient } from './ingredient.model';
import { from } from 'rxjs';
describe('Ingredient', () => {
  it('should create an instance', () => {
    expect(new Ingredient()).toBeTruthy();
  });
});
