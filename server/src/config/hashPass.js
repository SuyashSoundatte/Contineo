import argon2 from "argon2";

async function hashPassword(password) {
  const options = {
    type: argon2.argon2id,
    memoryCost: 2 ** 18,
    timeCost: 4,
    parallelism: 2,
    hashLength: 64,
    saltLength: 16,
  };

  const hashedPassword = await argon2.hash(password, options);
  return hashedPassword;
}

async function verifyPassword(hashedPassword, password) {
  const isValid = await argon2.verify(hashedPassword, password);
  return isValid;
}

export { hashPassword, verifyPassword };
