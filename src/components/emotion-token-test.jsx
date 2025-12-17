/** @jsxImportSource @emotion/react */
import { css, useTheme } from '@emotion/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

/**
 * Emotion Token Test Component
 * 
 * Comprehensive test of Emotion integration with design tokens.
 * Verifies:
 * - Theme provider is working
 * - Design tokens are accessible
 * - Dynamic styling with tokens works
 * - Runtime calculations work correctly
 */
export function EmotionTokenTest() {
  const theme = useTheme();
  const [testValue, setTestValue] = useState(50);

  // Test that we can access all token categories
  const tokenTests = {
    colors: {
      brandPrimary: theme.color.brand.primary[500],
      brandSecondary: theme.color.brand.secondary[500],
      surfaceAction: theme.color.surface.action,
      contentPrimary: theme.color.content.primary,
      contentAction: theme.color.content.action,
      borderAction: theme.color.border.action,
      signalError: theme.color.signal.error[500],
      signalSuccess: theme.color.signal.success[500],
    },
    spacing: {
      small: theme.spacing[2],
      medium: theme.spacing[4],
      large: theme.spacing[6],
    },
    borderRadius: {
      small: theme.borderRadius.sm,
      medium: theme.borderRadius.md,
      large: theme.borderRadius.lg,
    },
    borderWidth: {
      thin: theme.borderWidth.thin,
      medium: theme.borderWidth.medium,
    },
  };

  return (
    <div className="p-6 rounded-lg bg-surface-1 border border-default">
      <h2 className="text-2xl font-semibold mb-4 text-content-primary">
        Emotion Design Token Test
      </h2>
      
      {/* Test 1: Basic Token Access */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-content-primary">
          Test 1: Token Access Verification
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            css={css`
              padding: ${theme.spacing[3]}px;
              background-color: ${theme.color.brand.primary[500]};
              color: white;
              border-radius: ${theme.borderRadius.md}px;
              text-align: center;
              font-weight: 600;
            `}
          >
            Primary
          </div>
          <div
            css={css`
              padding: ${theme.spacing[3]}px;
              background-color: ${theme.color.surface.action};
              color: ${theme.color.content.onAction};
              border-radius: ${theme.borderRadius.md}px;
              text-align: center;
              font-weight: 600;
            `}
          >
            Action
          </div>
          <div
            css={css`
              padding: ${theme.spacing[3]}px;
              background-color: ${theme.color.signal.success[500]};
              color: white;
              border-radius: ${theme.borderRadius.md}px;
              text-align: center;
              font-weight: 600;
            `}
          >
            Success
          </div>
          <div
            css={css`
              padding: ${theme.spacing[3]}px;
              background-color: ${theme.color.signal.error[500]};
              color: white;
              border-radius: ${theme.borderRadius.md}px;
              text-align: center;
              font-weight: 600;
            `}
          >
            Error
          </div>
        </div>
      </div>

      {/* Test 2: Dynamic Calculations */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-content-primary">
          Test 2: Dynamic Calculations with Tokens
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-content-primary mb-2">
              Dynamic Width: {testValue}%
            </label>
            <div
              css={css`
                width: 100%;
                height: ${theme.spacing[6]}px;
                background-color: ${theme.color.neutral.grey[200]};
                border-radius: ${theme.borderRadius.md}px;
                overflow: hidden;
                border: ${theme.borderWidth.thin}px solid ${theme.color.border.default};
              `}
            >
              <div
                css={css`
                  width: ${testValue}%;
                  height: 100%;
                  background: linear-gradient(
                    90deg,
                    ${theme.color.brand.primary[400]} 0%,
                    ${theme.color.brand.primary[600]} 100%
                  );
                  transition: width 0.3s ease;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  color: white;
                  font-weight: 600;
                  font-size: ${theme.spacing[3]}px;
                `}
              >
                {testValue}%
              </div>
            </div>
            <div className="flex gap-2 mt-2">
              <Button size="sm" onClick={() => setTestValue(Math.max(0, testValue - 10))}>
                -10%
              </Button>
              <Button size="sm" onClick={() => setTestValue(Math.min(100, testValue + 10))}>
                +10%
              </Button>
              <Button size="sm" onClick={() => setTestValue(50)}>
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Test 3: Conditional Styling */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-content-primary">
          Test 3: Conditional Styling with Tokens
        </h3>
        <ConditionalCard testValue={testValue} />
      </div>

      {/* Test 4: Token Values Display */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3 text-content-primary">
          Test 4: Token Values (Runtime Access)
        </h3>
        <div className="p-4 bg-surface-1 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-content-primary mb-2">Colors:</p>
              <ul className="space-y-1 text-content-subtle">
                <li>Primary 500: <code className="text-xs">{tokenTests.colors.brandPrimary}</code></li>
                <li>Surface Action: <code className="text-xs">{tokenTests.colors.surfaceAction}</code></li>
                <li>Content Primary: <code className="text-xs">{tokenTests.colors.contentPrimary}</code></li>
                <li>Border Action: <code className="text-xs">{tokenTests.colors.borderAction}</code></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-content-primary mb-2">Spacing & Borders:</p>
              <ul className="space-y-1 text-content-subtle">
                <li>Spacing 2: <code className="text-xs">{tokenTests.spacing.small}px</code></li>
                <li>Spacing 4: <code className="text-xs">{tokenTests.spacing.medium}px</code></li>
                <li>Border Radius MD: <code className="text-xs">{tokenTests.borderRadius.medium}px</code></li>
                <li>Border Width Thin: <code className="text-xs">{tokenTests.borderWidth.thin}px</code></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Test 5: Complex Styling */}
      <div>
        <h3 className="text-lg font-semibold mb-3 text-content-primary">
          Test 5: Complex Styling with Multiple Tokens
        </h3>
        <div
          css={css`
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: ${theme.spacing[4]}px;
            padding: ${theme.spacing[4]}px;
            background-color: ${theme.color.surface.level2};
            border-radius: ${theme.borderRadius.lg}px;
            border: ${theme.borderWidth.thin}px solid ${theme.color.border.default};
          `}
        >
          {[100, 200, 300, 400, 500].map((shade) => (
            <div
              key={shade}
              css={css`
                padding: ${theme.spacing[3]}px;
                background-color: ${theme.color.brand.primary[shade]};
                color: ${shade >= 500 ? 'white' : theme.color.content.primary};
                border-radius: ${theme.borderRadius.md}px;
                text-align: center;
                font-weight: 600;
                border: ${theme.borderWidth.thin}px solid ${theme.color.brand.primary[shade + 100] || theme.color.brand.primary[900]};
                transition: transform 0.2s ease;
                &:hover {
                  transform: scale(1.05);
                }
              `}
            >
              Primary {shade}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Conditional Card Component - Tests state-based styling
function ConditionalCard({ testValue }) {
  const theme = useTheme();
  const isHigh = testValue > 70;
  const isLow = testValue < 30;

  return (
    <div
      css={css`
        padding: ${theme.spacing[4]}px;
        border-radius: ${theme.borderRadius.lg}px;
        border: ${theme.borderWidth.medium}px solid;
        transition: all 0.3s ease;
        background-color: ${isHigh
          ? theme.color.signal.success[500]
          : isLow
          ? theme.color.signal.error[500]
          : theme.color.signal.warning[500]};
        color: white;
        border-color: ${isHigh
          ? theme.color.signal.success[600]
          : isLow
          ? theme.color.signal.error[600]
          : theme.color.signal.warning[600]};
      `}
    >
      <p className="font-semibold mb-1">
        Status: {isHigh ? 'High' : isLow ? 'Low' : 'Medium'}
      </p>
      <p className="text-sm opacity-90">
        This card's color changes based on the test value using conditional logic with design tokens.
        Current value: {testValue}%
      </p>
    </div>
  );
}

export default EmotionTokenTest;

