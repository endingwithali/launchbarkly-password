# Change log

All notable changes to this package will be documented in this file.

## [1.3.1] - 2020-06-29
### Fixed:
- Incorporated [a fix](https://github.com/EventSource/eventsource/pull/130) from the upstream repository that avoids unnecessary delays when parsing a long message that is received in multiple chunks.

## [1.3.0] - 2020-04-23
### Added:
- A Node.js `http.Agent` can be specified using the `agent` option.

## [1.2.0] - 2020-04-03
### Added:
- New configuration options: `errorFilter` (determines how errors should be handled), `initialRetryDelayMillis` (delay interval for connection retries), `jitterRatio` (enables delay jitter), `maxBackoffMillis` (enables exponential backoff), `retryResetIntervalMillis` (enables reset of backoff).
- New event types: `end` (the server has closed the connection), `retrying` (provides information about upcoming connection retries).
- See `README.md` for more about these features.
This project adheres to [Semantic Versioning](http://semver.org).

## [1.1.0] - 2019-07- 09

### Added:
- The new option `skipDefaultHeaders`, if set to true, makes EventSource _not_ add the `Accept` and `Cache-Control` request headers that it would normally add. This may be necessary to avoid CORS problems in browsers if the stream URL is in another domain, since there are more restrictions on cross-origin requests that contain these headers.
- There is a new property, `EventSource.supportedOptions`, that indicates which custom options are available. See "Detecting supported features" in [`README.md`](README.md#detecting-supported-features).

## [1.0.0] - 2019-01-29
First release from this fork. Changes from the previous release of the upstream code (1.0.7) are as follows:

### Added:
- The optional `method` and `body` properties of the constructor options allow you to specify a different HTTP method from the default of `GET`, and to provide a request body if the specified method allows a body.

### Changed:
- The EventSource constructor is now a named export, not a default export. This is necessary in order to avoid a problem that  can happen when using Babel with ES6 code: the logic for converting CJS imports to ES6 imports does not work correctly if the default import has properties (`CONNECTING`, `OPEN`, `CLOSED`) but is also a function. Note that this is a breaking change if you were previously using the upstream code, but the only thing that needs to be changed is the import statement.
