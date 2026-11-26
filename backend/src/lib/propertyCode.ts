const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no 0/O/1/I to avoid lookalikes
const CODE_LENGTH = 6;

export const MEMO_PREFIX = 'RP:';
export const MEMO_MAX_BYTES = 28; // Stellar MEMO_TEXT limit

export const generatePropertyCode = (): string => {
  let code = '';
  for (let i = 0; i < CODE_LENGTH; i += 1) {
    code += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return code;
};

export const buildPropertyMemo = (propertyCode: string): string => {
  const memo = `${MEMO_PREFIX}${propertyCode}`;
  if (Buffer.byteLength(memo, 'utf8') > MEMO_MAX_BYTES) {
    throw new Error(`Memo "${memo}" exceeds Stellar's ${MEMO_MAX_BYTES}-byte MEMO_TEXT limit`);
  }
  return memo;
};
