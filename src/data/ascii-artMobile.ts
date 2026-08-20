/* Texto encerrado con "`" da problemas con "\", y texto encerrado con "String.raw" da problemas con "`".
   Usar cada uno dependiendo del ASCII que vaya a contener */
export type AsciiFontSize = `${number}rem` | `${number}px`;

export interface AsciiArt {
  art: string;
  alt: string;
  fontSize: AsciiFontSize;
  flushTop?: boolean;
}

export const heroAsciiArtMobile: AsciiArt = {
  art:
  `

  `,
  alt: 'Computadora de escritorio en ASCII',
  fontSize: '0.6rem',
};

export const servicesAsciiArtMobile: AsciiArt = {
  art: String.raw
  `
                   /^\
                  <( )>
                   \=/
                  <( )>
                   \=/
                  <( )>
                   \=/
  .=================X================.
 /                                    \
|  ░█▀▀░█▀▀░█▀▄░█░█░▀█▀░█▀▀░▀█▀░█▀█░█▀▀   |
|  ░▀▀█░█▀▀░█▀▄░▀▄▀░░█░░█░░░░█░░█░█░▀▀█   |
|  ░▀▀▀░▀▀▀░▀░▀░░▀░░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀   |
 \                                    /
  '-================================-'
  `,
  alt: 'Servicios - Arte en ASCII',
  fontSize: '0.6rem',
  flushTop: true,
};

export const proyectAsciiArtMobile: AsciiArt = {
  art: String.raw
  `
  // ╔─────────────────────────────╗
  // │ ╔═╗╦═╗╔═╗╦ ╦╔═╗╔═╗╔╦╗╔═╗╔═╗ │
  // │ ╠═╝╠╦╝║ ║╚╦╝║╣ ║   ║ ║ ║╚═╗ │
  // │ ╩  ╩╚═╚═╝ ╩ ╚═╝╚═╝ ╩ ╚═╝╚═╝ │
  // ╚─────────────────────────────╝
  `,
  alt: 'Proyectos - Arte en ASCII',
  fontSize: '0.6rem',
};

export const aboutAsciiArtMobile: AsciiArt = {
  art: String.raw
  `
  // .·:''''''''''''''''''''''''''''''''':·.
  // : :  .  .       __   __   __   __   : :
  // : :  |\/|  /\  |__) /  ' /  \ /__'  : :
  // : :  |  | /~~\ |  \ \__. \__/ .__/  : :
  // '·:.................................:·'
  `,
  alt: 'Sobre mí - Arte en ASCII',
  fontSize: '0.6rem',
};
