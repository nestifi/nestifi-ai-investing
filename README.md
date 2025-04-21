
# NestiFi Family Finance App

[https://nestifi.money](https://nestifi.money)

---

NestiFi is a secure, family-first financial management platform empowering parents and guardians to guide their families—including children—towards healthy financial futures. With NestiFi, families track spending, set investment goals, manage savings, and reward positive financial behaviors through a playful, intuitive app.

---

## Features

- Unified family home dashboard with account and member management
- Rewards, investment, and savings goals for children and adults
- Bank and NestiFi account switching
- Secure transaction flows (deposit, transfer, payment confirmation)
- Family circle and add user/invite flows
- QR code sharing for easy connections
- Analytics and statistics (charts, KPIs)

See [nestifi.money](https://nestifi.money) for more product information.

---

## Project Structure

- **/src/pages/** – Main route views (one file per screen/flow)
- **/src/components/** – UI components (reusable, stateless)
- **/src/components/ui/** – Shared input and layout primitives (shadcn/ui)
- **/src/hooks/** – React hooks (fetching, state management)
- **/public/images/** – PNGs, app icons, screenshots, QR codes, uploaded images
- **/docs/** (optional) – Project documentation and specs
- **README.md** – This file

---

## Getting Started

1. **Clone the Repository**
   ```sh
   git clone <YOUR_GIT_URL>
   cd <YOUR_PROJECT_NAME>
   ```

2. **Install Dependencies**
   ```sh
   npm install
   ```

3. **Start Local Dev Server**
   ```sh
   npm run dev
   ```
   Open [http://localhost:8080](http://localhost:8080) in your browser.

4. **Build for Production**
   ```sh
   npm run build
   ```

5. **Deploy / Publish**
   Use the Lovable interface, or connect your own domain (see [Lovable docs](https://docs.lovable.dev/user-guides/deployment)).

---

## Adding Screens or Assets

- Place all new PNGs/images in `/public/images/`.
- Reference assets in your UI code via a public path.
- Never include sensitive info or personal data in your images.

---

## Contributing

We welcome contributions to NestiFi! Please follow these best practices:

- **Code Style**: Follow the patterns and formatting already in the codebase.
- **Commit Messages**: Use clear, concise, and [Conventional Commit](https://www.conventionalcommits.org/en/v1.0.0/) format (e.g., `feat: add user profile`, `fix: correct goal calculation`).
- **Branching**: Create a feature branch (e.g., `feature/onboarding-carousel`).
- **Pull Requests**: 
  - Clearly describe what and why changes were made.
  - Reference issues or feature requests if possible.
  - Make sure your code builds locally before submitting.
  - Assign reviewers and be ready to discuss or rework your PR.
- **Security**: Never commit passwords, secrets, or personal information.
- **License**: This is a private prototype. For licensing info, email the NestiFi team.

---

## Documentation

- See [`/docs`](./docs) for further technical documentation and specs.

---

## License & Contact

This project is a private prototype, developed for the NestiFi mobile application.
For licensing information, contribution guidelines, or to report issues, please contact the NestiFi team via [nestifi.money](https://nestifi.money).

