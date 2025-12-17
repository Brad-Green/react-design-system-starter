# Quick MCP Test Checklist

Use this checklist to quickly verify your MCP setup is working.

## Pre-Flight Check (2 minutes)

- [ ] Figma Desktop App is running (not browser)
- [ ] MCP server enabled in Figma preferences
- [ ] Cursor is open with this project
- [ ] `mcp.json` exists in project root

## Quick Test (1 minute)

Run the verification script:
```bash
npm run verify-mcp
```

Expected output:
- ✅ mcp.json exists
- ✅ figma-desktop server configured
- ✅ MCP server is responding

## Cursor Chat Test (2 minutes)

Open Cursor chat (`Ctrl+L` or `Cmd+L`) and try:

```
Can you access the Figma MCP server?
```

**Success**: Cursor acknowledges connection or shows Figma tools

## Generate Component Test (5 minutes)

1. Open Figma Desktop App
2. Select a component
3. Copy Figma URL (with node-id)
4. In Cursor chat:
```
Implement this Figma design: [paste URL]

Requirements:
- Follow AGENTS.md rules
- Use design tokens only
- Use shadcn/ui components
- Make it accessible
```

**Success**: Component generated with 100% AGENTS.md compliance

## Troubleshooting

**MCP server not responding?**
- Restart Figma Desktop App
- Check MCP is enabled in Figma preferences
- Verify port 3845 is accessible

**Cursor can't connect?**
- Restart Cursor completely
- Verify `mcp.json` is in project root
- Check Cursor version supports MCP

**Component has hardcoded values?**
- Point out issues to Cursor
- Reference AGENTS.md rules
- Show `submit-button.jsx` as example

## Full Guide

See `MCP_TESTING_GUIDE.md` for detailed instructions.

