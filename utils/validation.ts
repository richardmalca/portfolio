export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateName(name: string): boolean {
  return name.trim().length >= 2;
}

export function validateMessage(message: string): boolean {
  return message.trim().length >= 10;
}
