# Yanji Social

<img src="https://img.shields.io/github/stars/ngtrgiabao/yanji-social"/> <img src="https://img.shields.io/github/issues/ngtrgiabao/yanji-social"/> ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/ngtrgiabao/yanji-social) <img src="https://img.shields.io/github/license/ngtrgiabao/yanji-social"/>

## Many thanks to our contributors

<p>
<a href="https://github.com/ngtrgiabao/yanji-social/graphs/contributors"><img src="https://contrib.rocks/image?repo=ngtrgiabao/yanji-social" width="50px" height="50px" alt="contributors"/></a>
</p>

### 🍍 Logo
<img src="https://github.com/ngtrgiabao/yanji-social/assets/95952006/6c1efcec-17cd-469f-aa45-495d0bb70a90" width="50px" height="50px" alt="logo"/>


# Overview

![image](frontend/src/assets/screenshots/image-1.png)
![image](frontend/src/assets/screenshots/image-2.png)
![image](frontend/src/assets/screenshots/image-3.png)
![image](frontend/src/assets/screenshots/image-4.png)
![image](frontend/src/assets/screenshots/image-5.png)
![image](frontend/src/assets/screenshots/image-6.png)
![image](frontend/src/assets/screenshots/image-7.png)
![image](frontend/src/assets/screenshots/image-8.png)
![image](frontend/src/assets/screenshots/image-9.png)

## 🌳Frontend
The frontend structure is organized into various components and pages, promoting modularity and maintainability. Notable folders include:

```
├───assets
│   ├───avatar
│   ├───background
│   ├───icons
│   ├───logo
│   ├───screenshots
│   ├───stories-images
│   └───video
├───business
├───components
│   ├───audio
│   ├───common
│   │   ├───button
│   │   ├───dialog
│   │   ├───embed
│   │   ├───input
│   │   ├───otp-input
│   │   └───popup
│   │       └───style
│   ├───conversation
│   ├───follower
│   ├───message
│   ├───paragraph
│   ├───providers
│   └───ui
│       ├───3d-card
│       ├───avatar
│       ├───bookmark
│       ├───card
│       │   └───style
│       ├───comment
│       ├───contact
│       ├───custom-theme
│       │   └───style
│       ├───media
│       ├───post
│       │   └───style
│       ├───preview
│       ├───setting
│       ├───social-bio
│       └───theme
├───context
│   └───theme
├───helpers
│   └───constants
├───hooks
├───pages
│   ├───admin
│   │   ├───components
│   │   │   ├───navigation
│   │   │   └───tables
│   │   │       ├───posts
│   │   │       │   └───delete
│   │   │       └───users
│   │   │           ├───delete
│   │   │           └───upsert
│   │   └───styles
│   ├───auth
│   │   ├───components
│   │   └───style
│   ├───bookmarks
│   │   ├───components
│   │   └───styles
│   ├───explore
│   │   ├───components
│   │   └───styles
│   ├───home
│   │   ├───components
│   │   └───styles
│   ├───info-card
│   ├───loading
│   │   ├───components
│   │   └───style
│   ├───messages
│   │   ├───components
│   │   └───styles
│   ├───networkError
│   │   ├───components
│   │   └───styles
│   ├───notification
│   │   ├───components
│   │   └───styles
│   ├───personal
│   │   ├───components
│   │   └───styles
│   ├───postPreview
│   │   ├───components
│   │   └───styles
│   ├───term
│   │   ├───components
│   │   └───styles
│   └───_404
│       └───style
├───redux
│   └───request
├───services
├───shared
│   └───layout
│       └───navigation
│           └───style
├───styles
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
SOCKET_PORT=9000
FRONTEND_URL="your_frontend_url"
MONGODB_URI="mongodb_remote_link"
CLOUD_STORAGE_NAME=""
CLOUD_STORAGE_API_KEY=""
CLOUD_SECRET_KEY=""
CLOUD_FOLDER_NAME=""
PlayFabSettingsDeveloperSecretKey=""
PlayFabSettingsTitleId=""
USER_GMAIL=""
PWD_GMAIL=""************
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
REACT_APP_CAPTCHA_SITE_KEY=""
REACT_APP_CAPTCHA_SECRET_KEY=""
REACT_APP_DEPLOY_URL=""
REACT_APP_ADMIN_ID=""
```
