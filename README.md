Deno + React native + Expo app to notify when a long running task is done.

## Usage

Start Expo and connect via Expo Go app:
```shell
EXPO_OFFLINE=1 deno task start
```

```shell
# Now procastinate until the build is done
./notify.ts 'cargo build --release'
```
