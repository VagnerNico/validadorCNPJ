export function validateCnpj(cnpj: string): boolean {
  const newCnpj = cnpj.replace(/[^\d]+/g, ``);
  if (newCnpj.length !== 14) return false;
  if (newCnpj === `00000000000000`) return false;
  const validatorArray = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  const firstValidationDivision =
    newCnpj
      .substr(0, newCnpj.length - 2)
      .split(``)
      .reduce((acc: number, val: string, idx: number): number => {
        return acc + parseInt(val, 10) * validatorArray[idx];
      }, 0) % 11;
  const firstDigit = firstValidationDivision < 2 ? 0 : 11 - firstValidationDivision;
  if (firstDigit !== parseInt(newCnpj.charAt(12), 10)) return false;
  validatorArray.unshift(6);
  const secondValidationDivision =
    newCnpj
      .substr(0, newCnpj.length - 1)
      .split(``)
      .reduce((acc: number, val: string, idx: number): number => {
        return acc + parseInt(val, 10) * validatorArray[idx];
      }, 0) % 11;
  const secondDigit = secondValidationDivision < 2 ? 0 : 11 - secondValidationDivision;
  if (secondDigit !== parseInt(newCnpj.charAt(13), 10)) return false;
  return true;
}
