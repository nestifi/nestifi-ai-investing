
# NestiFi Family Finance App

[https://nestifi.money](https://nestifi.money)

---

NestiFi is a secure, family-first financial management platform empowering parents and guardians to guide their families—including children—towards healthy financial futures. With NestiFi, families track spending, set investment goals, manage savings, and reward positive financial behaviors through a playful, intuitive app.

## Project Features

- Unified family home dashboard with account and member management
- Rewards, investment, and savings goals for children and adults
- Bank and NestiFi account switching
- Secure transaction flows (deposit, transfer, payment confirmation)
- Family circle and add user/invite flows
- QR code sharing for easy connections
- Analytics and statistics (charts, KPIs)

See [nestifi.money](https://nestifi.money) for more product information.

## Repo Structure

- **/src/pages/** – Main route views (one file per screen/flow)
- **/src/components/** – UI components (reusable, stateless)
- **/src/components/ui/** – Shared input and layout primitives (shadcn/ui)
- **/src/hooks/** – React hooks (fetching, state management)
- **/public/images/** – Custom PNGs, app icons, screenshots, QR codes, etc.
- **/docs/** (optional) – Project documentation and specs
- **README.md** – This file

## Getting Started

1. **Install Dependencies**

    ```sh
    npm install
    ```

2. **Start Local Development Server**

    ```sh
    npm run dev
    ```

    Visit [http://localhost:8080](http://localhost:8080) to view the app.

3. **Build for Production**

    ```sh
    npm run build
    ```

4. **Deploy / Publish**

    Use Lovable's interface or connect your own domain. See Lovable documentation for details.

## Adding Screens or Assets

- Place all new PNGs/images in `/public/images/`.
- To add new features/screens, create a new file in `/src/pages/` and reference it in your routing setup.

## Contribution & License

This project is a private prototype, developed for the NestiFi mobile application. For licensing information, contribution guidelines, or to report issues, please contact the NestiFi team or visit [nestifi.money](https://nestifi.money).

