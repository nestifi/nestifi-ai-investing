## 👋 NestiFi Prototype
This project is an Expo-based app using pnpm as the package manager, with eslint and prettier configured for consistent code quality and formatting. Below you will find instructions for setting up the project and the development environment.

## ⚙️ Prerequisites
Before you begin, make sure you have the following tools and libraries installed:

- Node.js (LTS version recommended)
- [pnpm](https://pnpm.io/) package manager 
- IDE supporting Prettier and ESLint ([VSCode](https://code.visualstudio.com/) is recommended)
- You also need to install and set up Android Studio and Xcode to compile and run Android and iOS projects on your local machine.  
See the following on how to set up these tools:
[Local app development](https://docs.expo.dev/guides/local-app-development/#prerequisites)

## ▶️ Running the app
1. Clone the repository
2. Install dependencies with `pnpm install`
3. Build and run locally with `pnpm ios`

## 🚀 Release new iOS version on TestFlight
1. Install fastlane
2. Adjust `apple_id` in `ios/fastlane/Matchfile`
3. Adjust `git_url` and `username` in `ios/fastlane/Appfile`
4. Create `ios/fastlane/.env.default` with
```
FASTLANE_USER=your_appleid@apple.com
FASTLANE_APPLE_APPLICATION_SPECIFIC_PASSWORD=abcd-efgh-ijkl-mnop
```
5. Ask for access and passphrase to certificates repository. Then configure profiles with `fastlane match development --readonly` and `fastlane match appstore --readonly`.
6. Make sure that `CFBundleShortVersionString` and `CFBundleVersion` are valid, fastlane will increment them automatically
7. Run `fastlane:build-and-upload-to-testflight`
