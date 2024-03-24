import { User } from '@prisma/client';

/**
 * Returns the file name without the extension from the given file path.
 * @param filePath - The file path including the file name and extension.
 * @returns The file name without the extension.
 */
export function getFileNameWithoutExtension(filePath: string): string {
  const fileNameWithExtension: string = filePath.split('\\').pop() || '';
  const fileName: string = fileNameWithExtension.split('.').slice(0, -1).join('.');
  return fileName;
}

/**
 * Returns a string of coin emojis based on the number of coins.
 * @param coins - The number of coins to convert to emojis.
 * @returns A string of coin emojis.
 */
export function getCoinEmojis(coins: number): string {
  let coinString: string = '';
  for (let i: number = 0; i < coins; i++) {
    coinString += '🪙';
  }
  return coinString;
}

/**
 * Returns a formatted string of the top ten users.
 * @param userArray - The array of users.
 * @returns A formatted string of the top ten users.
 */
export function topTenMessageFormatter(userArray: User[]): string {
  let formattedString: string = '```\n';
  userArray.forEach((user, index) => {
    formattedString += `${((index + 1).toString() + '.').padEnd(3)} ${(
      user.name ?? 'unknown'
    ).padEnd(12)} ${user.moneyAmount.toString().padStart(4)} 🪙\n`;
  });
  return formattedString + '```';
}
