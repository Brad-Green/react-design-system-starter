/**
 * Emotion Theme Wrapper
 * 
 * Structures the flat design token exports into a nested theme object
 * for use with Emotion's ThemeProvider.
 * 
 * This provides runtime access to design tokens for dynamic styling.
 */

import * as lightTokens from '../../build/js/theme-light.js';
import * as darkTokens from '../../build/js/theme-dark.js';

/**
 * Structure flat token exports into nested theme object
 */
function structureTheme(tokens) {
  return {
    color: {
      brand: {
        primary: {
          50: tokens.colorBrandPrimary50,
          100: tokens.colorBrandPrimary100,
          200: tokens.colorBrandPrimary200,
          300: tokens.colorBrandPrimary300,
          400: tokens.colorBrandPrimary400,
          500: tokens.colorBrandPrimary500,
          600: tokens.colorBrandPrimary600,
          700: tokens.colorBrandPrimary700,
          800: tokens.colorBrandPrimary800,
          900: tokens.colorBrandPrimary900,
        },
        secondary: {
          50: tokens.colorBrandSecondary50,
          100: tokens.colorBrandSecondary100,
          200: tokens.colorBrandSecondary200,
          300: tokens.colorBrandSecondary300,
          400: tokens.colorBrandSecondary400,
          500: tokens.colorBrandSecondary500,
          600: tokens.colorBrandSecondary600,
          700: tokens.colorBrandSecondary700,
          800: tokens.colorBrandSecondary800,
          900: tokens.colorBrandSecondary900,
        },
      },
      neutral: {
        grey: {
          50: tokens.colorNeutralGrey50,
          100: tokens.colorNeutralGrey100,
          200: tokens.colorNeutralGrey200,
          300: tokens.colorNeutralGrey300,
          400: tokens.colorNeutralGrey400,
          500: tokens.colorNeutralGrey500,
          600: tokens.colorNeutralGrey600,
          700: tokens.colorNeutralGrey700,
          800: tokens.colorNeutralGrey800,
          900: tokens.colorNeutralGrey900,
          950: tokens.colorNeutralGrey950,
        },
      },
      signal: {
        success: {
          500: tokens.colorSignalSuccess500,
          600: tokens.colorSignalSuccess600,
        },
        warning: {
          500: tokens.colorSignalWarning500,
          600: tokens.colorSignalWarning600,
        },
        error: {
          500: tokens.colorSignalError500,
          600: tokens.colorSignalError600,
        },
        info: {
          500: tokens.colorSignalInfo500,
          600: tokens.colorSignalInfo600,
        },
      },
      surface: {
        base: tokens.colorSurfaceBase,
        level1: tokens.colorSurfaceLevel1,
        level2: tokens.colorSurfaceLevel2,
        level3: tokens.colorSurfaceLevel3,
        action: tokens.colorSurfaceAction,
        disabled: tokens.colorSurfaceDisabled,
      },
      content: {
        primary: tokens.colorContentPrimary,
        subtle: tokens.colorContentSubtle,
        muted: tokens.colorContentMuted,
        action: tokens.colorContentAction,
        onAction: tokens.colorContentOnAction,
        disabled: tokens.colorContentDisabled,
      },
      border: {
        default: tokens.colorBorderDefault,
        action: tokens.colorBorderAction,
        disabled: tokens.colorBorderDisabled,
      },
    },
    spacing: {
      0: tokens.spacing0,
      1: tokens.spacing4,
      2: tokens.spacing8,
      3: tokens.spacing12,
      4: tokens.spacing16,
      5: tokens.spacing20,
      6: tokens.spacing24,
      8: tokens.spacing32,
      10: tokens.spacing40,
      12: tokens.spacing48,
      16: tokens.spacing64,
      20: tokens.spacing80,
      24: tokens.spacing96,
    },
    borderRadius: {
      none: tokens.borderRadiusNone,
      sm: tokens.borderRadiusSm,
      md: tokens.borderRadiusMd,
      lg: tokens.borderRadiusLg,
      xl: tokens.borderRadiusXl,
    },
    borderWidth: {
      none: tokens.borderWidthNone,
      thin: tokens.borderWidthThin,
      medium: tokens.borderWidthMedium,
      thick: tokens.borderWidthThick,
    },
  };
}

// Create structured theme objects
export const lightTheme = structureTheme(lightTokens);
export const darkTheme = structureTheme(darkTokens);

// Export theme type for TypeScript (if needed in future)
// export type Theme = typeof lightTheme;

