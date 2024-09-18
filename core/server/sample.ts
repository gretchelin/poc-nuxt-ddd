import { faker } from '@faker-js/faker';

export const USERS = {
  'appleblossom@mail.test': {
    name: faker.person.fullName(),
    email: 'appleblossom@mail.test',
    role: faker.person.jobType(),
    gender: faker.person.gender(),
    permission: ['dashboard', 'feature1', 'feature2', 'report'].reduce((acc, e) => {
      acc[e] = faker.datatype.boolean();
      return acc;
    }, {}),
  },
  'runningyak@mail.test': {
    name: faker.person.fullName(),
    email: 'appleblossom@mail.test',
    role: faker.person.jobType(),
    gender: faker.person.gender(),
    permission: ['dashboard', 'feature1', 'feature2', 'report'].reduce((acc, e) => {
      acc[e] = faker.datatype.boolean();
      return acc;
    }, {}),
  },
  'antsyfeet@mail.test': {
    name: faker.person.fullName(),
    email: 'appleblossom@mail.test',
    role: faker.person.jobType(),
    gender: faker.person.gender(),
    permission: ['dashboard', 'feature1', 'feature2', 'report'].reduce((acc, e) => {
      acc[e] = faker.datatype.boolean();
      return acc;
    }, {}),
  },
  'jackinabox@mail.test': {
    name: faker.person.fullName(),
    email: 'appleblossom@mail.test',
    role: faker.person.jobType(),
    gender: faker.person.gender(),
    permission: ['dashboard', 'feature1', 'feature2', 'report'].reduce((acc, e) => {
      acc[e] = faker.datatype.boolean();
      return acc;
    }, {}),
  },
};
