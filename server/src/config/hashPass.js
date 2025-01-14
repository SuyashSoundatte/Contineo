import argon2 from "argon2";

async function hashPassword(password){
  const options = {
    type: argon2.argon2id,        // Use Argon2id for better security
    memoryCost: 2 ** 18,          // 256 MiB memory
    timeCost: 4,                  // 4 iterations
    parallelism: 2,               // 2 threads for better performance
    hashLength: 64,               // 64 bytes hash length
    saltLength: 16,               // 16 bytes salt length
  };

  const hashedPassword = await argon2.hash(password, options);
  return hashedPassword;
};

async function verifyPassword(hashedPassword, password) { 
  const isValid = await argon2.verify(hashedPassword, password);
  return isValid;
};

export { hashPassword, verifyPassword };
