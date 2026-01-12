# Contributing to AI Video Studio

Thank you for your interest in contributing to AI Video Studio! This document provides guidelines and instructions for contributing.

## Code of Conduct

We are committed to providing a welcoming and inclusive environment. Please be respectful and considerate in your interactions.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, Node.js version, etc.)

### Suggesting Features

Feature suggestions are welcome! Please create an issue with:
- A clear, descriptive title
- Detailed description of the feature
- Use cases and benefits
- Any relevant examples or mockups

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/aisha123khalif-code/aisha123khalif-code.git
   cd aisha123khalif-code
   ```

2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Follow the coding standards below
   - Write meaningful commit messages
   - Add tests if applicable
   - Update documentation

4. **Test your changes**
   ```bash
   npm start
   # Manually test the application
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Add feature: your feature description"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**
   - Provide a clear description
   - Reference any related issues
   - Include screenshots for UI changes

## Coding Standards

### JavaScript

- Use ES6+ features
- Use `const` and `let` instead of `var`
- Use meaningful variable and function names
- Add comments for complex logic
- Use async/await instead of callbacks
- Handle errors appropriately

**Example:**
```javascript
// Good
const getUserById = async (userId) => {
  try {
    const user = await db.query('SELECT * FROM users WHERE id = ?', [userId]);
    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Avoid
function getUser(id, callback) {
  db.query('SELECT * FROM users WHERE id = ?', [id], function(err, user) {
    if (err) {
      callback(err);
    } else {
      callback(null, user);
    }
  });
}
```

### CSS

- Use CSS custom properties (variables)
- Follow BEM naming convention when applicable
- Keep specificity low
- Mobile-first responsive design
- Use semantic class names

**Example:**
```css
/* Good */
.card {
  background: var(--bg-color);
  border-radius: 8px;
  padding: 2rem;
}

.card__title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

/* Avoid */
div.myCard {
  background: #fff;
  border-radius: 8px;
}
```

### HTML

- Use semantic HTML5 elements
- Include proper accessibility attributes
- Use meaningful IDs and classes
- Proper indentation

**Example:**
```html
<!-- Good -->
<nav class="navbar" role="navigation" aria-label="Main navigation">
  <button id="theme-toggle" aria-label="Toggle theme">
    <i class="fa-solid fa-moon"></i>
  </button>
</nav>

<!-- Avoid -->
<div class="nav">
  <div onclick="toggleTheme()">
    <i class="fa-solid fa-moon"></i>
  </div>
</div>
```

## Project Structure

```
aisha123khalif-code/
├── database/           # SQL schemas and queries
├── server/            # Backend code
│   ├── controllers/   # Business logic
│   ├── routes/        # API routes
│   └── db/           # Database utilities
├── public/           # Frontend code
│   ├── css/          # Stylesheets
│   └── js/           # JavaScript files
└── docs/             # Documentation
```

## Development Workflow

### Setting Up Development Environment

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. Initialize database:
   ```bash
   npm run install-db
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

### Making Changes

1. **Backend Changes**
   - Add/modify controllers in `server/controllers/`
   - Add/modify routes in `server/routes/`
   - Update database schema in `database/schema.sql`
   - Document API changes in `API_DOCUMENTATION.md`

2. **Frontend Changes**
   - Modify HTML in `public/index.html`
   - Update styles in `public/css/styles.css`
   - Add logic in `public/js/app.js`
   - Test in both light and dark themes
   - Test responsive design

3. **Database Changes**
   - Update `database/schema.sql`
   - Add migration notes in commit message
   - Test with fresh database setup

### Testing

Currently, the project doesn't have automated tests. When adding tests:

1. Create a `tests/` directory
2. Use a testing framework like Jest or Mocha
3. Write unit tests for controllers
4. Write integration tests for API endpoints
5. Add test scripts to `package.json`

## Documentation

- Update README.md for major feature changes
- Update API_DOCUMENTATION.md for API changes
- Add inline comments for complex logic
- Include JSDoc comments for functions

**Example:**
```javascript
/**
 * Creates a new video generation request
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @returns {Promise<void>}
 */
const createVideo = async (req, res) => {
  // Implementation
};
```

## Commit Messages

Write clear, descriptive commit messages:

```bash
# Good
git commit -m "Add video status polling feature"
git commit -m "Fix icon export bug in Safari"
git commit -m "Update README with API examples"

# Avoid
git commit -m "fix bug"
git commit -m "updates"
git commit -m "wip"
```

**Format:**
```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

## Questions?

If you have questions, feel free to:
- Open an issue
- Reach out to the maintainers
- Check existing issues and PRs

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to AI Video Studio! 🎉
