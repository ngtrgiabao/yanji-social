# Yanji Social

### 🍍 Logo
<img src="https://github.com/ngtrgiabao/yanji-social/assets/95952006/6c1efcec-17cd-469f-aa45-495d0bb70a90" width="50px" height="50px" alt="logo"/>


# Overview

![image](https://github.com/ngtrgiabao/yanji-social/assets/95952006/b4830770-6894-4308-a25e-04b06fbc868c)
![image](https://github.com/ngtrgiabao/yanji-social/assets/95952006/114a7763-84bf-4f08-a893-e7661af7c06c)
![image](https://github.com/ngtrgiabao/yanji-social/assets/95952006/1d33e99b-a817-4624-8d2a-27f38ee94dc7)
![image](https://github.com/ngtrgiabao/yanji-social/assets/95952006/3773824c-196e-4096-bb7a-50053447c02b)
![image](https://github.com/ngtrgiabao/yanji-social/assets/95952006/87378a65-4cbd-46fd-b59e-a1a08def1bcd)
![image](https://github.com/ngtrgiabao/yanji-social/assets/95952006/e25f6884-db7f-4fd4-8372-4a4b36c8283c)
![image](https://github.com/ngtrgiabao/yanji-social/assets/95952006/b3982371-7b45-4d41-9784-131775f888a6)
![image](https://github.com/ngtrgiabao/yanji-social/assets/95952006/725e3f26-ff57-49d6-b2e4-05888f62bea1)

## 🌳Frontend
The frontend structure is organized into various components and pages, promoting modularity and maintainability. Notable folders include:

```
├───assets
│   ├───avatar
│   ├───background
│   ├───icons
│   ├───logo
│   ├───stories-images
│   └───video
├───business
├───components
│   └───style
├───context
│   └───theme
├───hooks
├───layout
│   └───navigation
│       └───style
├───pages
│   ├───bookmarks
│   ├───explore
│   ├───form
│   │   └───style
│   ├───home
│   │   ├───customTheme
│   │   │   └───style
│   │   └───style
│   ├───loading
│   │   └───style
│   ├───messages
│   │   └───style
│   ├───networkError
│   ├───notification
│   ├───personal
│   │   └───style
│   ├───postPreview
│   └───_404
│       └───style
├───redux
│   └───request
├───services
├───style
│   ├───animations
│   ├───constants
│   └───responsive
│       ├───big-tablet
│       ├───mobile
│       │   └───layout
│       └───small-laptop
└───utils
```

- assets: Holds avatar images, background images, icons, logos, stories images, and videos.
- business: Business-related functionalities.
- components: Reusable UI components.
- context: Manages the theme context.
- hooks: Custom React hooks.
- layout: Defines the application's layout, including navigation components.
- pages: Individual pages such as bookmarks, explore, form, home, loading, messages, network error, notification, personal, post preview, and a custom 404 page.
- redux: Redux state management for requests.
services: Backend services.
- style: Contains animations, constants, and responsive design for various devices.
- utils: Utility functions.

## 🌳Backend
The backend is structured with the following key components:
```
└───app
    ├───config
    ├───controllers
    ├───middleware
    ├───models
    ├───routes
    └───utils
```
- app: Main application folder.
  - config: Configuration settings.
  - controllers: Request handlers.
  - middleware: Middleware functions.
  - models: Data models.
  - routes: Application routes.
  - utils: Utility functions.

### [ 🥰 ] To run the app, you need to have config below

## BACKEND .env

<!-- ----- BACKEND .env ----- -->
```
SOCKET_PORT=8000
FRONTEND_URL="your_frontend_url"
MONGODB_URI="mongodb_remote_link"
CLOUD_STORAGE_NAME=""
CLOUD_STORAGE_API_KEY=""
CLOUD_SECRET_KEY=""
CLOUD_FOLDER_NAME=""
PlayFabSettingsDeveloperSecretKey=""
PlayFabSettingsTitleId=""
<!-- FRONTEND_URL="deploy_link" -->
<!-- MONGODB_URI="mongodb_local_link" -->
```

## FRONTEND .env
```
<!-- NEED CLOUDINARY ACCOUNT TO USE -->
REACT_APP_SOCKET_URL="your_backend_url"
REACT_APP_CLOUD_UPLOAD_PRESET=""
REACT_APP_CLOUD_STORAGE_NAME=""
REACT_APP_CLOUD_FOLDER=""
<!-- REACT_APP_SOCKET_URL="link_deploy_frontend" -->
```
