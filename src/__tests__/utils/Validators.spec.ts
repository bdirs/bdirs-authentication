import Validator from '../../utils/Validators';

describe('Validators', () => {

  it('should return true if email is valid', () => {
    const valid = Validator.validateEmail('fahd@mail.com');
    expect(valid).toBeTruthy();
  });

  it('should return false if email is invalid', () => {
    const valid = Validator.validateEmail('fahd@mailcom');
    expect(valid).toBeFalsy();
  });

  it('should return a strong property if password contains alphanumeric character, a number, upperCase charater, a special character, and of length > 8', () => {
    const response = Validator.validatePassword('2aHd@mail1com');
    expect(response).toEqual({ strength: 'strong', valid: true });
  });

  it('should return a medium property if password contains alphanumeric character, a number, upperCase charater, and of length > 6', () => {
    const response = Validator.validatePassword('2aHdmallom');
    expect(response).toEqual({ strength: 'medium', valid: true });
  });

  it('should return a weak property if password does\'not contain atleast an alphanumeric character, a number, upperCase charater, and of length < 6', () => {
    const response = Validator.validatePassword('mlcom');
    expect(response).toEqual({ strength: 'weak', valid: false });
  });
});
