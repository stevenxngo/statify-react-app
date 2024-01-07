# Statify React app

A React app that uses the Spotify API to display your top artists and tracks. Made in conjunction with a [Node.js backend](https://github.com/stevenxngo/statify-node-app) and compatible with both desktop and mobile devices.

<iframe width="560" height="315" src="https://studio.youtube.com/video/BU8HIEu2OBM/edit" frameborder="0" allowfullscreen></iframe>

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [Premium Spotify account](https://www.spotify.com/us/)
- [Spotify Developer account](https://developer.spotify.com/dashboard/)

### Local Installation

1. Clone the repo
   ```sh
   git clone
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the following:
   ```sh
   REACT_APP_CLIENT_ID=your_client_id
   REACT_APP_REDIRECT_URI=http://localhost:3000/statify-react-app #or your frontend URI, must be the same as the one in your Spotify Developer dashboard
   REACT_APP_API_BASE=http://localhost:4000/api # or your backend URI
   REACT_APP_SCOPE = "user-top-read user-read-recently-played"
   ```
4. Start the app
   ```sh
   npm start
   ```
5. Follow the instructions in the [Node.js backend repo](https://github.com/stevenxngo/statify-node-app)
6. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

1. Click the "login" button to log in with your Spotify account.
2. Click the "top artists", "top tracks" or "top genres" button to display your top artists, tracks and genres, respectively.
3. Click the "logout" button to log out of your Spotify account.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Gallery

![Home page](/assets/anon_home.png)
![Top tracks page](/assets/desktop_tracks.png)
![Top artists page](/assets/desktop_artists.png)
![Top genres page](/assets/desktop_genres.png)
<img src="/assets/loggedin_mobile_home.png" alt="Logged in mobile home page" width="300">
<img src="/assets/mobile_tracks.png" alt="Mobile tracks page" width="300">
<img src="/assets/mobile_genres.png" alt="Mobile genres page" width="300">
