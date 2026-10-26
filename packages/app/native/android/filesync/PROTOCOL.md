# FileSync wire protocol

FileSync speaks a subset of the **LocalSend v2** protocol, so it interoperates
with existing LocalSend apps. In zugriff the sender is the files app on android
(`FileSyncPlugin.java` and `LocalSend.java` here, the `sync` view of
`apps/files`); the receiver is the official LocalSend app, which needs nothing
from this side (the node desktop daemon of the original project,
`pulgasari/wallpaperfx`, speaks the same subset). keep the sender within what
LocalSend v2 defines.

## Roles (v0)

- **phone = sender** (android app). picks files, uploads them.
- **desktop = receiver** (node daemon). accepts and writes files to a target dir.

Auto-sync and the reverse direction are later phases.

## Transport

- one tcp server per device on port **53317** (configurable), `https` (self-signed)
  or `http`. the desktop defaults to https. when the client knows the server's
  `fingerprint` (from discovery or a `filesync://` uri) it **pins** the tls cert:
  the leaf cert's sha256 must equal the fingerprint, else the connection is
  refused. a manually typed target with no known fingerprint falls back to
  trust-all on the lan (v0).
- api base path: `/api/localsend/v2`.
- discovery is udp multicast on `224.0.0.167:53317` (announce datagrams). v0 uses
  manual pairing (ip / `filesync://` uri), so discovery is optional.

## Device info dto

Sent in `info` fields and returned by `/info`:

```json
{
  "alias": "Pixel 7",
  "version": "2.1",
  "deviceModel": "Pixel 7",
  "deviceType": "mobile",        // mobile | desktop
  "fingerprint": "<stable per-install id>",
  "port": 53317,
  "protocol": "https",           // https | http
  "download": false
}
```

On multicast datagrams only, an extra `"announce": true|false` is added.

## Upload flow

### 0. pin (optional)

when the receiver has a pin configured, the sender must pass it as a query
param on prepare-upload: `POST .../prepare-upload?pin=<pin>`. a missing/wrong pin
is answered `401`, and the sender prompts the user and retries.

### 1. `POST /api/localsend/v2/prepare-upload`

request:
```json
{
  "info": { ...sender device info... },
  "files": {
    "<fileId>": { "id": "<fileId>", "fileName": "photo.jpg", "size": 12345, "fileType": "image/jpeg" }
  }
}
```

response `200`:
```json
{ "sessionId": "<id>", "files": { "<fileId>": "<token>" } }
```

- `403` (or `204`) → the receiver declined (e.g. auto-accept off + user rejected).
- other non-200 → error.

### 2. `POST /api/localsend/v2/upload?sessionId=<id>&fileId=<fileId>&token=<token>`

body = the raw file bytes (not multipart). response `200` on success; `403`
for an unknown session / wrong token; `409` if that file was already received.

### 3. `POST /api/localsend/v2/cancel?sessionId=<id>` (optional)

aborts the session; the receiver removes any partial files.

## Other endpoints the receiver answers

- `GET  /api/localsend/v2/info` → this device's info dto.
- `POST /api/localsend/v2/register` → body = peer info; records the peer and
  returns our info (http discovery fallback).

## Receiver rules

- filenames are reduced to a safe basename inside the target dir; collisions get
  a ` (n)` suffix. traversal (`../`) can never escape the target dir.
- auto-accept on (default) → `prepare-upload` returns tokens immediately.
  auto-accept off → the request is held until the local web ui accepts/declines
  (60s timeout → decline).
- persistent pairing: a sender whose `info.fingerprint` is in the receiver's
  `trustedDevices` list is accepted without a prompt even when auto-accept is off.
  the web ui adds a device to that list ("künftig ohne Nachfrage annehmen" on a
  request) and can remove it again. this is a receiver-local trust list, not part
  of the wire shape — the sender sends the same `prepare-upload` either way.

## Fingerprint

with https the `fingerprint` is the **sha256 of the server's tls certificate**
(lowercase hex of the DER), computed identically on both ends
(`desktop/src/device.js` `certFingerprint`, android `LocalSend.sha256Hex`). over
plain http (no cert) it falls back to a stable random per-install id and pinning
does not apply.

## Known v0 deviations from full LocalSend

- no `prepare-download`/`download` (reverse direction), no file previews/thumbnails.
- the pin is passed once per prepare-upload (no separate session-pin handshake).
