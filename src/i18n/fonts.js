import {
  Archivo,
  Newsreader,
  IBM_Plex_Mono,
  Noto_Serif,
  Noto_Sans_Arabic,
  Noto_Sans_SC,
} from 'next/font/google'

/**
 * Three faces do the Latin/Cyrillic work; two more cover the scripts the Latin
 * faces have no glyphs for.
 *
 * Archivo and Newsreader carry Latin, Latin-Ext and Cyrillic, so Spanish,
 * Italian, Polish, Vietnamese and Russian all render in the real brand type.
 * Arabic and Chinese do not exist in those files at all — without a face that
 * covers them the browser silently substitutes whatever it has, and the page
 * loses its typography exactly where it can least afford to look unconsidered.
 *
 * The extra faces are attached as CSS variables and only switched on by
 * :lang() rules, so a Spanish reader never pays for the Chinese font.
 */
export const archivo = Archivo({
  subsets: ['latin', 'latin-ext'],
  axes: ['wdth'],
  variable: '--font-display',
  display: 'swap',
})

export const newsreader = Newsreader({
  /* Newsreader ships latin, latin-ext and vietnamese only — no Cyrillic.
     Asking for it is a build error, and shipping without noticing would have
     left every Russian paragraph in a system fallback. */
  subsets: ['latin', 'latin-ext', 'vietnamese'],
  axes: ['opsz'],
  variable: '--font-body',
  display: 'swap',
})

/** Body serif for Cyrillic, switched on by :lang(ru). */
export const notoSerif = Noto_Serif({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  variable: '--font-cyrillic',
  display: 'swap',
})

export const plexMono = IBM_Plex_Mono({
  subsets: ['latin', 'latin-ext', 'cyrillic'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '700'],
  variable: '--font-arabic',
  display: 'swap',
})

export const notoSc = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-cjk',
  display: 'swap',
})

/** Every font variable, for the <html> class. */
export const FONT_CLASS = [
  archivo.variable,
  newsreader.variable,
  plexMono.variable,
  notoSerif.variable,
  notoArabic.variable,
  notoSc.variable,
].join(' ')
