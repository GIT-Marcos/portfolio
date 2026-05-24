export function rot13(str: string): string {
  return str.replace(/[a-zA-Z]/g, (char) => {
    const base = char >= 'a' ? 97 : 65;
    return String.fromCharCode(((char.charCodeAt(0) - base + 13) % 26) + base);
  });
}
