# Next Steps - Project Roadmap

## Current Status: Phase 5 Complete ✅

All foundational work is complete. Figma MCP is working and has been successfully used to implement components.

**Completed Components**:
- ✅ Button (shadcn/ui)
- ✅ Card (shadcn/ui)
- ✅ SubmitButton (from Figma)
- ✅ Input (shadcn/ui)
- ✅ Label (shadcn/ui)
- ✅ Dialog (shadcn/ui)

---

## Immediate Next Steps

### 1. Generate More Components from Figma

**Figma MCP is Working!** Use it to:
1. Open Figma Desktop App
2. Select a frame/component
3. In your editor, prompt: "Implement this design from Figma: [paste Figma URL]"
4. Or use: "Implement my current Figma selection"

**Expected Output**:
- ✅ AGENTS.md-compliant code
- ✅ Semantic design token-based styling
- ✅ shadcn/ui foundation
- ✅ No hardcoded values
- ✅ Accurate color extraction from Figma variables

**Components to Generate**:
- [ ] Navigation components (Navbar, Sidebar, Breadcrumbs, Tabs)
- [ ] Additional form components (Select, Checkbox, Radio, Switch)
- [ ] Feedback components (Alert, Toast, Tooltip)
- [ ] Data display components (Table, List, Badge, Avatar)
- [ ] Layout components (Container, Grid, Stack, Spacer)

### 2. Document New Components

**For each generated component**:
1. Create Storybook story (`.stories.jsx`)
2. Add multiple variants/states
3. Test theme switching
4. Verify accessibility (0 violations)
5. Add to component library

**Template** (follow `submit-button.stories.jsx` or `card.stories.jsx` pattern):
- Default story
- Variants/states stories
- Theme comparison
- Interactive examples
- Form/layout context examples

**Current Stories**: 33+ (Button: 15+, Card: 11, SubmitButton: 7)

---

### 3. Expand Figma Code Connect ✅ IN PLACE

**Status**: Code Connect is set up and working! Button and Card components are connected.

**Completed**:
- ✅ Button component connected (node-id: 33-185)
- ✅ Card component connected (node-id: 70-46)
- ✅ Code examples visible in Figma Dev Mode
- ✅ Configuration files ready (`figma.config.json`, `*.figma.jsx` files)

**Next**: Add Code Connect for more components as needed:
- [ ] Input component
- [ ] Label component
- [ ] SubmitButton component
- [ ] Any new components you generate

---

## Ongoing Development

### 4. Build Component Library

**Process**:
1. Identify components needed from Figma
2. Generate with MCP (GitHub Copilot/Cursor)
3. Verify AGENTS.md compliance
4. Create Storybook documentation
5. Test in application
6. Add to component library

**Component Categories**:
- **Layout**: Container, Grid, Stack, Spacer
- **Navigation**: Navbar, Sidebar, Breadcrumbs, Tabs
- **Forms**: Input (✅ Done), Label (✅ Done), Select, Checkbox, Radio, Switch
- **Feedback**: Alert, Toast, Modal (✅ Done - Dialog), Tooltip
- **Data Display**: Table, List, Badge, Avatar
- **Actions**: Button (✅ Done), IconButton, ButtonGroup

### 5. Maintain AGENTS.md Compliance

**For Every Component**:
- ✅ Use design tokens (no hardcoded values)
- ✅ Tailwind for structure
- ✅ Emotion only if dynamic styling needed
- ✅ shadcn/ui as foundation where available
- ✅ Accessible (ARIA, keyboard navigation)
- ✅ Theme-aware (light/dark automatic)

**Verification Checklist**:
- [ ] No hex codes (`#...`)
- [ ] No pixel values (`16px`, `p-[16px]`)
- [ ] No arbitrary values (`bg-[#...]`)
- [ ] All colors reference tokens (`bg-primary-500`)
- [ ] All spacing references tokens (`p-4`, `gap-2`)
- [ ] Theme switching works

### 6. Expand Storybook Documentation

**Current Stories**: 33+ (Button: 15+, Card: 11, SubmitButton: 7)

**Add Stories For**:
- [ ] Component variations
- [ ] Interactive states
- [ ] Form integrations
- [ ] Layout examples
- [ ] Theme comparisons
- [ ] Accessibility demos

**Running Storybook**:
```bash
npm run storybook
# Opens at http://localhost:6006
```

---

## Advanced (Optional)

### 7. Emotion Integration ✅ COMPLETED

**Status**: Emotion is installed and integrated with dynamic theme switching. It is a core part of the styling system, not optional.

**What's Done**:
- ✅ `@emotion/react` and `@emotion/styled` installed
- ✅ Theme wrapper created (`src/theme/emotionTheme.js`)
- ✅ ThemeProvider integrated in `src/main.jsx`
- ✅ Demo component created showing dynamic styling capabilities
- ✅ Runtime theme access working via `useTheme()` hook
- ✅ Fully integrated into the hybrid styling approach

**Reference**: See `src/components/emotion-token-test.jsx` for examples

### 8. TypeScript Migration (Optional)

**Benefits**:
- Type safety for design tokens
- Better IDE autocomplete
- Catch errors at compile time

**Steps**:
1. Install TypeScript
   ```bash
   npm install -D typescript @types/react @types/react-dom
   ```

2. Create type definitions for tokens
   ```typescript
   // types/tokens.d.ts
   export interface DesignTokens {
     colorBrandPrimary500: string;
     spacing4: number;
     // ... all tokens
   }
   ```

3. Convert components to `.tsx` gradually

### 9. CI/CD Integration

**Automate**:
- Token builds (`npm run tokens:build`)
- Storybook builds (`npm run build-storybook`)
- Component testing
- Accessibility checks
- Visual regression testing (Chromatic)

---

## Success Metrics

### Component Quality
- [ ] 100% AGENTS.md compliance
- [ ] 0 accessibility violations
- [ ] All components have Storybook documentation
- [ ] Theme switching works for all components

### Development Velocity
- [ ] 5+ components per week
- [ ] <30 minutes per component (with MCP)
- [ ] <10 minutes documentation per component

### Design System Adoption
- [ ] All components use design tokens
- [ ] Zero hardcoded values in codebase
- [ ] Consistent component architecture
- [ ] Full Figma-to-code integration

---

## Quick Reference Commands

```bash
# Token management
npm run tokens:build              # Rebuild design tokens

# Development
npm run dev                        # Start dev server (localhost:5173)
npm run storybook                  # Start Storybook (localhost:6006)

# Figma integration
npx figma connect publish          # Publish Code Connect (when ready)

# Testing
npm run build                      # Production build
npm run build-storybook           # Build Storybook static site
```

---

## Documentation Reference

**Core Documentation**:
- `AGENTS.md` - AI governance rules (READ FIRST)
- `SESSION_SUMMARY.md` - Complete project history
- `NEXT_STEPS.md` - This file

**Figma Integration**:
- `FIGMA_CODE_CONNECT_GUIDE.md` - Code Connect setup (when Figma plan upgraded)
- `mcp.json` - MCP configuration file (✅ Working)

**Storybook**:
- `STORYBOOK_SETUP.md` - Storybook configuration guide
- `.storybook/` - Storybook configuration files

**Phase Reports**:
- `PHASE5_COMPLIANCE_REPORT.md` - Compliance verification
- `PHASE5_FINAL_SUMMARY.md` - Phase 5 complete summary

---

## Support & Resources

**If You Need Help**:
1. Check relevant documentation file (see above)
2. Review AGENTS.md for governance rules
3. Look at existing components (Button, Card, SubmitButton) as examples
4. Check Storybook for component patterns

**External Resources**:
- Figma MCP Docs: https://developers.figma.com/docs/figma-mcp-server/
- shadcn/ui Docs: https://ui.shadcn.com/
- Tailwind Docs: https://tailwindcss.com/
- Style Dictionary: https://amzn.github.io/style-dictionary/

---

## Project Goals Achieved ✅

✅ Design token system established
✅ CSS variables for theming
✅ JavaScript theme exports for Emotion
✅ Tailwind integrated with design tokens
✅ shadcn/ui component library setup
✅ Storybook documentation platform
✅ AI governance system (AGENTS.md)
✅ Figma MCP integrated and working
✅ Semantic design tokens extracted from Figma
✅ 100% compliant component generation proven
✅ Theme switching (light/dark) working
✅ Components implemented from Figma (SubmitButton)
✅ Code Connect in place (Button and Card connected)
✅ Emotion fully integrated (not optional)

**You're ready to build!** 🚀

**Next**: Continue generating components from your Figma file using the working Figma MCP integration.
