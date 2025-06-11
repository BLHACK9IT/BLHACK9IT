# Sample Snack app

Open the `App.js` file to start writing some code. You can preview the changes directly on your phone or tablet by scanning the **QR code** or use the iOS or Android emulators. When you're done, click **Save** and share the link!

When you're ready to see everything that Expo provides (or if you want to use your own editor) you can **Download** your project and use it with [expo cli](https://docs.expo.dev/get-started/installation/#expo-cli)).

All projects created in Snack are publicly available, so you can easily share the link to this project via link, or embed it on a web page with the `<>` button.

If you're having problems, you can tweet to us [@expo](https://twitter.com/expo) or ask in our [forums](https://forums.expo.dev/c/expo-dev-tools/61) or [Discord](https://chat.expo.dev/).

Snack is Open Source. You can find the code on the [GitHub repo](https://github.com/expo/snack).

App folder structure :
Ceasar Patries/
├── components/           # Reusable UI components (root level)
│   ├── Button.js
│   ├── ProductCard.js
│   └── DrawerMenu.js     # Future drawer navigation
│
├── constants/            # Global constants (root level)
│   ├── colors.js         # Color palette
│   └── routes.js         # Screen route names
│
├── src/
│   ├── api/
│   │   └── api.js        # PHP API configuration
│   │
│   ├── navigation/
│   │   ├── AppNavigator.js  # Main navigation stack
│   │   └── AuthStack.js     # Authentication flows
│   │
│   ├── screens/
│   │   ├── auth/            # Authentication screens
│   │   │   ├── LoginScreen.js
│   │   │   ├── RegisterScreen.js
│   │   │   └── ResetPasswordScreen.js
│   │   │
│   │   ├── home/            # Main app screens
│   │   │   ├── HomeScreen.js
│   │   │   ├── ProductListScreen.js
│   │   │   ├── ProductDetailScreen.js
│   │   │   └── CartScreen.js
│   │   │
│   │   └── WelcomeScreen.js  # Onboarding screen
│   │
│   └── utils/
│       └── helpers.js       # Utility functions
│
├── App.js                 # Root application component
└── index.js               # Entry point