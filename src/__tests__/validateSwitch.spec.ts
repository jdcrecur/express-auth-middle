import validateSwitch from '../validateSwitch';
import { ValidateSwitchType } from '../enums/ValidateSwitchType';

test('should pass with an api key', () => {
  const resp = validateSwitch(
    ValidateSwitchType['x-auth'],
    {
      headers: {
        'x-api-key': '123'
      }
    },
    {
      xAuthorisationKey: '123'
    }
  );
  expect(resp).toBe(true);
});

test('should pass with basic username and password', () => {
  const resp = validateSwitch(
    ValidateSwitchType['basic-auth'],
    {
      headers: {
        authorization: 'Basic dXNlcjpwdw=='
      }
    },
    {
      basicAuthUname: 'user',
      basicAuthPword: 'pw'
    }
  );
  expect(resp).toBe(true);
});

test('should pass with basic username and password array', () => {
  const resp = validateSwitch(
    ValidateSwitchType['basic-auth'],
    {
      headers: {
        authorization: 'Basic dXNlcjpwdw=='
      }
    },
    {
      basicAuthArray: [{
        basicAuthUname: 'testuser',
        basicAuthPword: 'hello'
      }, {
        basicAuthUname: 'user',
        basicAuthPword: 'pw'
      }]
    }
  );
  expect(resp).toBe(true);
});
