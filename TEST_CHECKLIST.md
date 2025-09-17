# Test Checklist

## Visual Checks

### Breakpoints
- [ ] 360px - Mobile (iPhone SE)
- [ ] 768px - Tablet (iPad)
- [ ] 1024px - Small Desktop
- [ ] 1280px - Medium Desktop
- [ ] 1536px - Large Desktop

### Marketing Page
- [ ] Header navigation works on all breakpoints
- [ ] Hero upload section displays correctly
- [ ] Trusted logos section displays correctly
- [ ] Workflow section displays correctly
- [ ] Features section displays correctly
- [ ] Footer displays correctly

### Pricing Page
- [ ] Plan cards display correctly
- [ ] Monthly/Annual toggle works
- [ ] Recommended plan is highlighted
- [ ] All features are listed correctly

### Dashboard
- [ ] Sidebar navigation works
- [ ] Sidebar collapses/expands correctly
- [ ] Projects grid displays correctly
- [ ] Empty state displays when no projects
- [ ] Loading state displays during data fetch
- [ ] Error state displays when data fetch fails

### Editor
- [ ] Split-screen layout displays correctly
- [ ] Left controls panel displays correctly
- [ ] Video preview displays correctly
- [ ] Timeline displays correctly
- [ ] All controls are accessible

## Interaction Checks

### Marketing Page
- [ ] URL import works correctly
- [ ] File upload drag and drop works
- [ ] File validation works (type/size)
- [ ] Loading states display during upload
- [ ] Error messages display for invalid files
- [ ] Success messages display for valid uploads

### Pricing Page
- [ ] Plan selection works
- [ ] Toggle between monthly/annual works
- [ ] CTA buttons navigate correctly

### Dashboard
- [ ] Sidebar navigation works
- [ ] Sidebar collapse/expand works
- [ ] New project button works
- [ ] Project cards link to editor
- [ ] Keyboard navigation works

### Editor
- [ ] Play/Pause button works
- [ ] Spacebar toggles play/pause
- [ ] J/K/L keys control playback
- [ ] I/O keys set in/out points
- [ ] S key splits clips
- [ ] Cmd/Ctrl+S saves project
- [ ] Captions toggle works
- [ ] Captions text editing works
- [ ] Reframe toggle works
- [ ] Aspect ratio selection works
- [ ] Timeline scrubbing works
- [ ] Export dialog opens

## Accessibility Checks
- [ ] All interactive elements are keyboard accessible
- [ ] Focus rings are visible
- [ ] ARIA labels are present
- [ ] Semantic HTML is used
- [ ] Color contrast meets WCAG 2.2 AA
- [ ] Screen reader navigation works

## Performance Checks
- [ ] Initial load time < 3s
- [ ] Editor loads within 2s
- [ ] No console errors
- [ ] Bundle size < 2MB
- [ ] Lighthouse score > 90