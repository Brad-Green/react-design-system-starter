/** @jsxImportSource @emotion/react */
import { useState } from 'react'
import { css, useTheme } from '@emotion/react'
import './App.css'
import { Button } from '@/components/ui/button'
import { EmotionTokenTest } from '@/components/emotion-token-test'
import ZampleModal from '@/components/zample-modal'
import EditUserModal from '@/components/edit-user-modal'

function App() {
  const [showModal, setShowModal] = useState(true)
  const [showEditUserModal, setShowEditUserModal] = useState(false)

  return (
    <div className="min-h-screen p-8 transition-all duration-300" style={{ 
      backgroundColor: 'var(--color-surface-base)',
      color: 'var(--color-content-primary)',
    }}>
      {/* Zample Modal */}
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          onClick={() => setShowModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <ZampleModal onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}

      {/* Edit User Modal */}
      <EditUserModal 
        open={showEditUserModal}
        onOpenChange={setShowEditUserModal}
        defaultValues={{
          username: 'johndoe',
          email: 'john.doe@example.com'
        }}
      />

      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--color-brand-primary-500)' }}>
          Phase 3: Hybrid Setup Demo
        </h1>
        
        <p className="text-lg mb-8" style={{ color: 'var(--color-content-subtle)' }}>
          Tailwind CSS + shadcn/ui + Design Tokens
        </p>

        {/* Button Variants & Modals Section */}
        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'var(--color-surface-level-1)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-content-primary)' }}>
            Button Variants & Modals
          </h2>
          <div className="flex gap-4 flex-wrap">
            <Button onClick={() => setShowEditUserModal(true)} variant="default">
              Open Edit User Modal
            </Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="destructive">Destructive Button</Button>
          </div>
        </div>

        {/* Shadcn Button Variants */}
        <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'var(--color-surface-level-1)' }}>
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--color-content-primary)' }}>
            shadcn/ui Button Component
          </h2>
          <div className="flex gap-4 flex-wrap items-center">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </div>


        {/* Tailwind Utilities with Design Tokens */}
        <div className="mb-8 p-6 rounded-lg bg-surface-2">
          <h2 className="text-2xl font-semibold mb-4 text-content-primary">
            Tailwind Classes with Design Tokens
          </h2>
          <p className="mb-4 text-content-subtle">
            Now using Tailwind classes mapped to semantic design tokens: <code className="bg-surface-1 text-content-primary px-2 py-1 rounded">bg-surface-action</code>, <code className="bg-surface-1 text-content-primary px-2 py-1 rounded">text-content-primary</code>, <code className="bg-surface-1 text-content-primary px-2 py-1 rounded">p-6</code>, etc.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-surface-action text-content-on-action text-center font-semibold">
              Primary
            </div>
            <div className="p-4 rounded-lg bg-secondary-500 text-white text-center font-semibold">
              Secondary
            </div>
            <div className="p-4 rounded-lg bg-success text-white text-center font-semibold">
              Success
            </div>
            <div className="p-4 rounded-lg bg-error text-white text-center font-semibold">
              Error
            </div>
          </div>
        </div>

        {/* Token-Based Styling Examples */}
        <div className="mb-8 p-6 rounded-xl bg-surface-1 border border-default">
          <h2 className="text-2xl font-semibold mb-4 text-content-primary">
            Token-Based Styling Examples
          </h2>
          <div className="space-y-4">
            {/* Spacing Examples */}
            <div className="p-4 bg-neutral-50 rounded-md">
              <h3 className="font-semibold text-content-primary mb-2">Spacing Tokens</h3>
              <div className="flex gap-2 items-center flex-wrap">
                <div className="p-1 bg-primary-200 text-primary-900 rounded">p-1 (4px)</div>
                <div className="p-2 bg-primary-200 text-primary-900 rounded">p-2 (8px)</div>
                <div className="p-3 bg-primary-200 text-primary-900 rounded">p-3 (12px)</div>
                <div className="p-4 bg-primary-200 text-primary-900 rounded">p-4 (16px)</div>
                <div className="p-6 bg-primary-200 text-primary-900 rounded">p-6 (24px)</div>
              </div>
            </div>

            {/* Border Radius Examples */}
            <div className="p-4 bg-neutral-50 rounded-md">
              <h3 className="font-semibold text-content-primary mb-2">Border Radius Tokens</h3>
              <div className="flex gap-3 items-center flex-wrap">
                <div className="p-3 bg-secondary-500 text-white rounded-sm">rounded-sm</div>
                <div className="p-3 bg-secondary-500 text-white rounded-md">rounded-md</div>
                <div className="p-3 bg-secondary-500 text-white rounded-lg">rounded-lg</div>
                <div className="p-3 bg-secondary-500 text-white rounded-xl">rounded-xl</div>
              </div>
            </div>

            {/* Color Scale Examples */}
            <div className="p-4 bg-neutral-50 rounded-md">
              <h3 className="font-semibold text-content-primary mb-2">Color Scale Tokens</h3>
              <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
                <div className="h-12 bg-primary-50 rounded border border-default" title="primary-50"></div>
                <div className="h-12 bg-primary-100 rounded" title="primary-100"></div>
                <div className="h-12 bg-primary-200 rounded" title="primary-200"></div>
                <div className="h-12 bg-primary-300 rounded" title="primary-300"></div>
                <div className="h-12 bg-primary-400 rounded" title="primary-400"></div>
                <div className="h-12 bg-primary-500 rounded" title="primary-500"></div>
                <div className="h-12 bg-primary-600 rounded" title="primary-600"></div>
                <div className="h-12 bg-primary-700 rounded" title="primary-700"></div>
                <div className="h-12 bg-primary-800 rounded" title="primary-800"></div>
                <div className="h-12 bg-primary-900 rounded" title="primary-900"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Emotion Demo Section */}
        <EmotionDemo />

        {/* Comprehensive Token Test */}
        <EmotionTokenTest />

        {/* Status Section */}
        <div className="p-6 rounded-lg bg-surface-3">
          <h2 className="text-2xl font-semibold mb-4 text-content-primary">
            ✅ Phase 3 Complete - All Steps Done!
          </h2>
          <ul className="space-y-2 text-content-subtle">
            <li>✅ Tailwind CSS installed and configured</li>
            <li>✅ shadcn/ui framework initialized</li>
            <li>✅ Button component added and working</li>
            <li>✅ Import aliases configured (@/components, @/lib)</li>
            <li>✅ <strong className="text-content-primary">Design tokens mapped to Tailwind theme</strong></li>
            <li>✅ <strong className="text-content-primary">All Tailwind classes using CSS variables</strong></li>
            <li>✅ <strong className="text-content-primary">Theme switching works across all components</strong></li>
            <li>✅ <strong className="text-content-primary">Emotion installed and ThemeProvider configured</strong></li>
            <li>✅ <strong className="text-content-primary">Runtime theme access for dynamic styling</strong></li>
          </ul>
          <div className="mt-6 p-4 bg-info/10 border-l-4 border-info rounded-r-lg">
            <p className="text-content-primary font-semibold mb-2">🎉 Key Achievement:</p>
            <p className="text-content-subtle text-sm">
              You now have a complete hybrid styling system! Use <code className="bg-surface-1 text-content-primary px-2 py-1 rounded">bg-surface-action</code> for static styles, and Emotion's <code className="bg-surface-1 text-content-primary px-2 py-1 rounded">css</code> prop for dynamic, runtime-dependent styling with design tokens!
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}

// Emotion Demo Component - Shows dynamic styling with theme access
function EmotionDemo() {
  const theme = useTheme();
  const [progress, setProgress] = useState(45);
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="mb-8 p-6 rounded-lg bg-surface-1 border border-default">
      <h2 className="text-2xl font-semibold mb-4 text-content-primary">
        Emotion Dynamic Styling Demo
      </h2>
      <p className="mb-4 text-content-subtle">
        This component demonstrates Emotion's runtime theme access and dynamic styling capabilities.
      </p>
      
      <div className="space-y-4">
        {/* Progress Bar with Dynamic Width */}
        <div>
          <label className="block text-sm font-medium text-content-primary mb-2">
            Progress: {progress}%
          </label>
          <div
            css={css`
              width: 100%;
              height: 24px;
              background-color: ${theme.color.neutral.grey[200]};
              border-radius: ${theme.borderRadius.md}px;
              overflow: hidden;
              position: relative;
            `}
          >
            <div
              css={css`
                width: ${progress}%;
                height: 100%;
                background-color: ${isActive ? theme.color.surface.action : theme.color.neutral.grey[400]};
                transition: width 0.3s ease, background-color 0.3s ease;
                border-radius: ${theme.borderRadius.md}px;
              `}
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              size="sm"
              onClick={() => setProgress(Math.max(0, progress - 10))}
            >
              -10%
            </Button>
            <Button
              size="sm"
              onClick={() => setProgress(Math.min(100, progress + 10))}
            >
              +10%
            </Button>
            <Button
              size="sm"
              variant={isActive ? "default" : "secondary"}
              onClick={() => setIsActive(!isActive)}
            >
              {isActive ? "Deactivate" : "Activate"}
            </Button>
          </div>
        </div>

        {/* Dynamic Color Card */}
        <div
          css={css`
            padding: ${theme.spacing[4]}px;
            border-radius: ${theme.borderRadius.lg}px;
            background-color: ${isActive 
              ? theme.color.surface.action 
              : theme.color.neutral.grey[200]};
            color: ${isActive 
              ? theme.color.content.onAction 
              : theme.color.content.primary};
            transition: all 0.3s ease;
            border: ${theme.borderWidth.thin}px solid ${isActive 
              ? theme.color.border.action 
              : theme.color.border.default};
          `}
        >
          <p className="font-semibold mb-2">
            Dynamic Theme-Aware Card
          </p>
          <p className="text-sm opacity-90">
            This card's colors change based on the active state, using Emotion's runtime theme access.
            Colors are: {isActive ? 'Action Purple' : 'Neutral Gray'}
          </p>
        </div>

        {/* Theme Token Display */}
        <div className="p-4 bg-neutral-50 rounded-md">
          <p className="text-sm font-medium text-content-primary mb-2">
            Current Theme Values (from Emotion):
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
            <div>
              <span className="text-content-muted">Primary:</span>
              <div 
                className="w-full h-8 rounded mt-1"
                css={css`
                  background-color: ${theme.color.brand.primary[500]};
                `}
              />
              <code className="text-[10px]">{theme.color.brand.primary[500]}</code>
            </div>
            <div>
              <span className="text-content-muted">Action:</span>
              <div 
                className="w-full h-8 rounded mt-1"
                css={css`
                  background-color: ${theme.color.surface.action};
                `}
              />
              <code className="text-[10px]">{theme.color.surface.action}</code>
            </div>
            <div>
              <span className="text-content-muted">Spacing 4:</span>
              <div className="text-content-primary font-mono">
                {theme.spacing[4]}px
              </div>
            </div>
            <div>
              <span className="text-content-muted">Border Radius MD:</span>
              <div className="text-content-primary font-mono">
                {theme.borderRadius.md}px
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App
