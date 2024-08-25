import {expect, test} from '@jest/globals';
import catsList from './catsList'

test('should be an array of strings', function(){
  expect(Array.isArray(catsList)).toBe(true)
  catsList.forEach(element => {
    expect(typeof element).toBe('string')
  });
});