# dSock Node Client

Node client for [dSock](https://github.com/Cretezy/dSock).

[GitHub](https://github.com/Cretezy/dSock-node) - [npm](https://www.npmjs.com/package/dsock)

## Installation

```bash
npm install dsock
# or
yarn add dsock
```

## Usage

```ts
const { dSockClient } = require("dsock");
# or
import { dSockClient } from "dsock";


const dsock = new dSockClient(dSockApiUrl, dSockToken);
```

### [Create claim](https://github.com/Cretezy/dSock#claims)

Create a claim for user authentication.

```ts
const claim = dsock.createClaim({
  user: "user",
  // optional
  session: "session",
  id: "id",
  channels: ["channel"],
  time: { duration: 30 }, // in seconds, or use `expiration` for seconds since epoch
});
```

### [Send message](https://github.com/Cretezy/dSock#sending-message)

Send a message to a target (one or many clients).

```ts
await dsock.send({
  data: JSON.stringify({ type: "hello-world" }), // any string or Buffer
  // target (choose one or many)
  user: "user",
  session: "session", // depends on `user
  id: "id",
  channel: "channel",
});
```

### [Disconnecting](https://github.com/Cretezy/dSock#disconnecting)

Disconnect a target (one or many clients).

```ts
await dsock.disconnect({
  keepClaims: false, // if to keep claims for target
  // target (choose one or many)
  user: "user",
  session: "session", // depends on `user
  id: "id",
  channel: "channel",
});
```

### [Info](https://github.com/Cretezy/dSock#info)

Get claim and connection info from a target (one or many clients).

```ts
const { claims, connections } = await dsock.info({
  // target (choose one or many)
  user: "user",
  session: "session", // depends on `user
  id: "id",
  channel: "channel",
});
```

### [Channels](https://github.com/Cretezy/dSock#channels)

Subscribe/unsubscribe a target to a channel (one or many clients).

```ts
await dsock.channelSubscribe("new-channel", {
  // target (choose one or many)
  user: "user",
  session: "session", // depends on `user
  id: "id",
  channel: "channel",
});


await dsock.channelUnsubscribe("new-channel", {
  // target (choose one or many)
  user: "user",
  session: "session", // depends on `user
  id: "id",
  channel: "channel",
});
```

## License

[MIT](./LICENSE)
