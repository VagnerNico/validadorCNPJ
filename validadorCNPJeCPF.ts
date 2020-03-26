export function validateCpf(receivedCpf: string | undefined): boolean {
  if (!receivedCpf) return false;
  const cpf = receivedCpf.replace(/[^\d]+/g, ``);
  if (cpf.length !== 11) return false;
  if (cpf === `00000000000`) return false;
  const validatorArray = [10, 9, 8, 7, 6, 5, 4, 3, 2];
  const firstValidationDivision =
    (cpf
      .substr(0, cpf.length - 2)
      .split(``)
      .reduce((acc: number, val: string, idx: number): number => {
        return acc + parseInt(val, 10) * validatorArray[idx];
      }, 0) *
      10) %
    11;
  const firstDigit = firstValidationDivision > 9 ? 0 : firstValidationDivision;
  if (firstDigit !== parseInt(cpf.charAt(9), 10)) return false;
  validatorArray.unshift(11);
  const secondValidationDivision =
    (cpf
      .substr(0, cpf.length - 1)
      .split(``)
      .reduce((acc: number, val: string, idx: number): number => {
        return acc + parseInt(val, 10) * validatorArray[idx];
      }, 0) *
      10) %
    11;
  const secondDigit = secondValidationDivision > 9 ? 0 : secondValidationDivision;
  if (secondDigit !== parseInt(cpf.charAt(10), 10)) return false;
  return true;
}

export function validateCnpj(cnpj: string | undefined): boolean {
  if (!cnpj) return true;
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
