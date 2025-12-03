# Contributing to UFO Sightings API

First off, thank you for considering contributing to the UFO Sightings API! 🛸

This document provides guidelines for contributing to this project.

---

## Table of Contents

1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
3. [Development Setup](#development-setup)
4. [Coding Standards](#coding-standards)
5. [Commit Guidelines](#commit-guidelines)
6. [Pull Request Process](#pull-request-process)

---

## Code of Conduct

### Our Pledge

We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards

**Positive behavior includes:**
- Using welcoming and inclusive language
- Being respectful of differing viewpoints
- Gracefully accepting constructive criticism
- Focusing on what is best for the community

**Unacceptable behavior includes:**
- Trolling, insulting/derogatory comments
- Public or private harassment
- Publishing others' private information
- Other conduct which could reasonably be considered inappropriate

---

## How Can I Contribute?

### Reporting Bugs 🐛

Before creating bug reports, please check existing issues. When creating a bug report, include:

- **Clear title and description**
- **Steps to reproduce**
- **Expected behavior**
- **Actual behavior**
- **Environment** (OS, Node version, etc.)
- **Code samples** if applicable

**Template:**
```markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
1. Send request to '...'
2. With parameters '...'
3. See error

**Expected Behavior**
What you expected to happen.

**Actual Behavior**
What actually happened.

**Environment**
- OS: [e.g., Windows 10, macOS 14]
- Node: [e.g., 18.17.0]
- API Version: [e.g., 1.0.0]

**Additional Context**
Any other relevant information.
```

### Suggesting Features 💡

Feature suggestions are welcome! Please:

- **Check existing feature requests** first
- **Explain the use case** clearly
- **Describe the expected behavior**
- **Consider alternatives** you've thought about

**Template:**
```markdown
**Feature Request**
A clear description of the feature.

**Use Case**
Explain why this feature would be useful.

**Proposed Solution**
How you think it should work.

**Alternatives**
Other solutions you've considered.
```

### Code Contributions 👨‍💻

Areas where contributions are welcome:

1. **Bug fixes**
2. **Performance improvements**
3. **Documentation improvements**
4. **New filter options**
5. **Test coverage**
6. **Error handling improvements**
7. **API enhancements**

---

## Development Setup

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- Git

### Fork & Clone

```bash
# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/ufo-api.git
cd ufo-api

# Add upstream remote
git remote add upstream https://github.com/ORIGINAL_OWNER/ufo-api.git
```

### Install Dependencies

```bash
npm install
```

### Environment Setup

```bash
cp .env.example .env
# Edit .env with your configuration
```

### Run Locally

```bash
# Development mode with auto-reload
npm run dev

# Or production mode
npm start
```

### Verify Setup

```bash
# Test health endpoint
curl http://localhost:3000/health

# Should return:
# {"success":true,"status":"healthy",...}
```

---

## Coding Standards

### JavaScript Style

We follow standard JavaScript conventions:

```javascript
// ✅ Good
function getSightings(filters) {
  const data = loadData();
  return applyFilters(data, filters);
}

// ❌ Bad
function get_sightings(filters){
    var data=loadData()
    return applyFilters(data,filters)
}
```

### Key Principles

1. **Use `const` and `let`**, never `var`
2. **Meaningful variable names**
3. **Single responsibility** per function
4. **Keep functions small** (< 50 lines ideally)
5. **Add comments** for complex logic
6. **Handle errors** gracefully

### File Organization

```javascript
// 1. Imports
const express = require('express');
const { loadData } = require('./utils');

// 2. Constants
const MAX_LIMIT = 500;

// 3. Helper functions
function validateInput(input) {
  // ...
}

// 4. Main functions
function processRequest(req, res) {
  // ...
}

// 5. Exports
module.exports = {
  processRequest
};
```

### Comments

```javascript
// ✅ Good: Explain WHY, not WHAT
// Extract year handling 2-digit years as 1900s/2000s
const year = shortYear < 50 ? 2000 + shortYear : 1900 + shortYear;

// ❌ Bad: Obvious comment
// Add 1 to count
count = count + 1;
```

### Error Handling

```javascript
// ✅ Good: Specific error messages
try {
  const data = JSON.parse(jsonString);
} catch (error) {
  console.error('Failed to parse JSON:', error.message);
  throw new Error(`Invalid JSON format: ${error.message}`);
}

// ❌ Bad: Silent failures
try {
  const data = JSON.parse(jsonString);
} catch (error) {
  // Nothing
}
```

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation only
- **style**: Formatting, missing semicolons, etc.
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Performance improvement
- **test**: Adding missing tests
- **chore**: Updating build tasks, package manager configs, etc.

#### Examples

```bash
# Good commits
git commit -m "feat(filters): add locale filter for location types"
git commit -m "fix(validation): correct credibility range validation"
git commit -m "docs(readme): add examples for new endpoints"
git commit -m "perf(loader): optimize data parsing with streaming"

# Bad commits
git commit -m "fixed stuff"
git commit -m "WIP"
git commit -m "asdf"
```

### Detailed Commit Example

```
feat(statistics): add UFO shape distribution statistics

Added new statistics endpoint that shows distribution of UFO shapes
across all sightings. This helps researchers understand most common
UFO morphologies in historical data.

- Added ufoShapeDistribution to statistics response
- Counts each shape code occurrence
- Returns sorted by frequency

Closes #42
```

---

## Pull Request Process

### Before Submitting

1. **Update documentation** if needed
2. **Test your changes** thoroughly
3. **Follow coding standards**
4. **Update CHANGELOG.md** with your changes
5. **Ensure all tests pass** (when tests exist)

### PR Template

```markdown
## Description
Brief description of what this PR does.

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)
- [ ] Documentation update

## Related Issues
Fixes #(issue number)

## How Has This Been Tested?
Describe the tests you ran.

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have commented my code where necessary
- [ ] I have updated the documentation
- [ ] I have added tests (if applicable)
- [ ] All tests pass locally
- [ ] I have updated CHANGELOG.md
```

### Review Process

1. **Automated checks** will run (when CI/CD is set up)
2. **Maintainer review** within 48 hours
3. **Address feedback** if requested
4. **Approval & merge** once approved

### After Merge

- Your contribution will be credited in CHANGELOG
- Delete your branch (optional)
- Update your fork:
  ```bash
  git checkout main
  git pull upstream main
  git push origin main
  ```

---

## Project Structure

Understanding the codebase:

```
src/
├── app.js              # Express app setup
├── server.js           # Server entry point
├── data/
│   ├── loader.js       # Data loading & caching
│   └── hatch_udb.json  # UFO data (large file)
├── controllers/
│   └── sightingsController.js  # Business logic
├── routes/
│   └── sightings.js    # Route definitions
├── middleware/
│   ├── errorHandler.js # Error handling
│   └── validation.js   # Input validation
└── utils/
    ├── filters.js      # Filtering logic
    └── formatters.js   # Response formatting
```

---

## Testing

### Manual Testing

```bash
# Start server
npm start

# Test endpoints
curl http://localhost:3000/health
curl "http://localhost:3000/api/v1/sightings?limit=5"
curl http://localhost:3000/api/v1/statistics
```

### Automated Testing (Future)

```bash
# Run tests (when implemented)
npm test

# Run tests with coverage
npm run test:coverage
```

---

## Documentation

### Updating Documentation

When adding features, update:

1. **README.md** - Main documentation
2. **EXAMPLES.md** - Add usage examples
3. **ARCHITECTURE.md** - If changing structure
4. **CHANGELOG.md** - All changes
5. **Code comments** - Inline documentation

### Documentation Style

- Use **clear, simple language**
- Include **code examples**
- Show **expected output**
- Explain **why**, not just **what**

---

## Questions?

- **GitHub Issues**: For bugs and features
- **GitHub Discussions**: For questions and ideas
- **Email**: contribute@ufo-api.com (to be set up)

---

## Recognition

Contributors will be:
- Listed in CHANGELOG.md
- Credited in README.md (for significant contributions)
- Mentioned in release notes

---

## Thank You! 🙏

Every contribution, no matter how small, is valuable and appreciated!

Together, we're building the most comprehensive UFO sightings API for researchers worldwide. 🛸✨
