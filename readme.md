# Takara.ai Website Repository

<img src="https://takara.ai/images/logo-24/TakaraAi.svg" width="200" />

![Build Status](https://img.shields.io/badge/build-passing-brightgreen)
![Dependencies](https://img.shields.io/badge/dependencies-up%20to%20date-brightgreen)
![License](https://img.shields.io/badge/license-proprietary-orange)

Welcome to the public repository of the Takara.ai website, handcrafted with ❤️ by Jordan Legg, CEO of Takara.ai Ltd.

## Overview

This repository hosts the source code for the official website of Takara.ai Ltd. It showcases our commitment to cutting-edge web technologies and innovative design.

## Handcrafted by Our CEO

This project is not just a representation of our company's technical capabilities, but also a personal endeavor of our CEO, Jordan Legg. His hands-on approach and dedication to excellence are reflected in every aspect of this website.

## Ownership and License

All code, work, and structure contained in this repository are the exclusive property of Takara.ai Ltd. This repository is public for viewing purposes, showcasing our commitment to transparency and quality.

### Restrictions

- **No Reproduction or Redistribution**: Replicating or distributing the code, in part or whole, is prohibited.
- **No Modification**: Modification of the code or use in other projects without permission from Takara.ai Ltd. is not allowed.
- **Viewing Only**: This repository is intended for viewing and reference purposes only.

## Contributions

While we appreciate interest in our work, we are not accepting contributions to this repository. However, feedback and suggestions are welcome and can be submitted as issues in the repository.

<!-- ## Contact

For inquiries or more information about our work, please reach out to us at [contact email or link]. -->

# Development

## Conventional Commits Specification:

1. **Structure**: Each commit message consists of a header, a body, and a footer. The header has a mandatory type, an optional scope, and a required description:

   ```
   <type>(<scope>): <description>

   [optional body]

   [optional footer(s)]
   ```

2. **Type**: This describes the kind of change that the commit is introducing. Common types include:

   - `feat`: Introduces a new feature.
   - `fix`: Patches a bug.
   - `chore`: Other changes that don't modify `src` or `test` files.
   - `docs`: Adds or alters documentation.
   - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc).
   - `refactor`: A code change that neither fixes a bug nor adds a feature.
   - `perf`: A code change that improves performance.
   - `test`: Adding missing tests or correcting existing tests.
   - `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm).
   - `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs).

3. **Scope**: An optional part of the format that provides additional contextual information, like the module or component affected by the change.

4. **Description**: A brief, imperative mood description of the change:

   - Use the present tense: "change" not "changed" nor "changes".
   - No dot (.) at the end.

5. **Body**: An optional longer description of the change. It should provide a meaningful commit message, which:

   - Explains the context of the change.
   - Describes the impact and the rationale behind the change.
   - Can contain multiple paragraphs and bullet points.

6. **Footer**: Optional. Used for referencing issue tracker IDs, pull request numbers, etc. Examples:
   - `BREAKING CHANGE: <description>` for introducing breaking changes.
   - `Closes #123, #456` for listing related issues or pull requests.

### Benefits of Conventional Commits:

- **Automatic Versioning and Changelog Generation**: Tools like semantic-release can use these standardized messages to determine version bumps and generate changelogs.
- **Improved Readability**: Makes the commit history easier to read and understand.
- **Facilitates Team Communication**: Ensures that all team members follow a consistent commit style.

### Example Commit Message:

```
feat(authentication): implement JWT based auth system

The new authentication system uses JSON Web Tokens (JWT) to manage user sessions securely. This change includes necessary updates to the user model and database schema.

Closes #42
```
