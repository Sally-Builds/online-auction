const Pusher = require('pusher');

// exports.pusher = new Pusher({
//   appId: process.env.PUSHER_APP_ID,
//   key: process.env.PUSHER_KEY,
//   secret: process.env.PUSHER_SECRET,
//   cluster: 'eu',
//   encrypted: true,
// });
exports.pusher = new Pusher({
  appId: '1145864',
  key: '2492ef4c479ac6a3152c',
  secret: '58ca30bb7755a2155afb',
  cluster: 'eu',
  encrypted: true,
});
