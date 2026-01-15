/**
 * Emotion Theme Wrapper
 * 
 * Structures the flat design token exports into a nested theme object
 * for use with Emotion's ThemeProvider.
 * 
 * This provides runtime access to design tokens for dynamic styling.
 * 
 * Updated to work with GitHub token structure (FDB tokens)
 */

import * as lightTokens from '../../build/js/theme-light.js';

/**
 * Structure flat token exports into nested theme object
 * Maps GitHub FDB tokens to the expected theme structure
 */
function structureTheme(tokens) {
  // Use FDB purple as primary brand color
  const primaryColor = tokens.rawColorsMode1FdbOfficialPurple || '#672cbf';
  const darkBlue = tokens.rawColorsMode1FdbOfficialDarkBlue || '#104e64';
  
  return {
    color: {
      brand: {
        primary: {
          50: tokens.rawColorsMode1Slate50,
          100: tokens.rawColorsMode1Slate100,
          200: tokens.rawColorsMode1Slate200,
          300: tokens.rawColorsMode1Slate300,
          400: tokens.rawColorsMode1Slate400,
          500: primaryColor,  // FDB Purple
          600: primaryColor,  // FDB Purple
          700: darkBlue,      // FDB Dark Blue
          800: darkBlue,      // FDB Dark Blue
          900: darkBlue,      // FDB Dark Blue
        },
        secondary: {
          50: tokens.rawColorsMode1Neutral50,
          100: tokens.rawColorsMode1Neutral100,
          200: tokens.rawColorsMode1Neutral200,
          300: tokens.rawColorsMode1Neutral300,
          400: tokens.rawColorsMode1Neutral400,
          500: tokens.rawColorsMode1Neutral500,
          600: tokens.rawColorsMode1Neutral600,
          700: tokens.rawColorsMode1Neutral700,
          800: tokens.rawColorsMode1Neutral800,
          900: tokens.rawColorsMode1Neutral900,
        },
      },
      neutral: {
        grey: {
          50: tokens.rawColorsMode1Neutral50,
          100: tokens.rawColorsMode1Neutral100,
          200: tokens.rawColorsMode1Neutral200,
          300: tokens.rawColorsMode1Neutral300,
          400: tokens.rawColorsMode1Neutral400,
          500: tokens.rawColorsMode1Neutral500,
          600: tokens.rawColorsMode1Neutral600,
          700: tokens.rawColorsMode1Neutral700,
          800: tokens.rawColorsMode1Neutral800,
          900: tokens.rawColorsMode1Neutral900,
          950: tokens.rawColorsMode1Neutral950,
        },
      },
      signal: {
        success: {
          500: tokens.semanticColorsFdbChartStaticGreen2 || '#00c951',
          600: tokens.semanticColorsFdbChartStaticGreen3 || '#00a63e',
        },
        warning: {
          500: tokens.semanticColorsFdbChartStaticAmber2 || '#fe9a00',
          600: tokens.semanticColorsFdbChartStaticAmber3 || '#e17100',
        },
        error: {
          500: tokens.semanticColorsFdbChartStaticRose2 || '#ff2056',
          600: tokens.semanticColorsFdbChartStaticRose3 || '#ec003f',
        },
        info: {
          500: tokens.semanticColorsFdbChartStaticBlue2 || '#2b7fff',
          600: tokens.semanticColorsFdbChartStaticBlue3 || '#155dfc',
        },
      },
      surface: {
        base: tokens.semanticColorsFdbGeneralBackground,
        level1: tokens.semanticColorsFdbGeneralSecondary,
        level2: tokens.semanticColorsFdbGeneralMuted,
        level3: tokens.semanticColorsFdbGeneralAccent,
        action: tokens.semanticColorsFdbGeneralPrimary,
        disabled: tokens.semanticColorsFdbUnofficialBorder1,
      },
      content: {
        primary: tokens.semanticColorsFdbGeneralForeground,
        subtle: tokens.semanticColorsFdbGeneralMutedForeground,
        muted: tokens.semanticColorsFdbGeneralMutedForeground,
        action: tokens.semanticColorsFdbGeneralPrimary,
        onAction: tokens.semanticColorsFdbGeneralPrimaryForeground,
        disabled: tokens.semanticColorsFdbGeneralMutedForeground,
      },
      border: {
        default: tokens.semanticColorsFdbGeneralBorder,
        action: tokens.semanticColorsFdbGeneralPrimary,
        disabled: tokens.semanticColorsFdbUnofficialBorder3,
      },
    },
    spacing: {
      0: tokens.spacingFdbAbsolute0,
      1: tokens.spacingFdbAbsolute1,
      2: tokens.spacingFdbAbsolute2,
      3: tokens.spacingFdbAbsolute3,
      4: tokens.spacingFdbAbsolute4,
      5: tokens.spacingFdbAbsolute5,
      6: tokens.spacingFdbAbsolute6,
      8: tokens.spacingFdbAbsolute8,
      10: tokens.spacingFdbAbsolute10,
      12: tokens.spacingFdbAbsolute12,
      16: tokens.spacingFdbAbsolute16,
      20: tokens.spacingFdbAbsolute20,
      24: tokens.spacingFdbAbsolute24,
    },
    borderRadius: {
      none: tokens.borderRadiiFdbSemanticRoundedNone,
      sm: tokens.borderRadiiFdbSemanticRoundedSm,
      md: tokens.borderRadiiFdbSemanticRoundedMd,
      lg: tokens.borderRadiiFdbSemanticRoundedLg,
      xl: tokens.borderRadiiFdbSemanticRoundedXl,
    },
    borderWidth: {
      none: 0,
      thin: 1,
      medium: 2,
      thick: 4,
    },
  };
}

// Create structured theme objects
export const lightTheme = structureTheme(lightTokens);
// Dark theme uses same tokens for now (light theme only per user request)
export const darkTheme = lightTheme;

// Export theme type for TypeScript (if needed in future)
// export type Theme = typeof lightTheme;

