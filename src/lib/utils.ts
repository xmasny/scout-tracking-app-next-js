import _ from 'lodash';
import { remove } from 'remove-accents';

export const toRoute = (string: string) => _.kebabCase(remove(string));

