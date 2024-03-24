Deno + React native + Expo app to notify when a long running task is done.

## Installation

You will need a Deno build from this branch (going to be merged in Deno soon):

```shell
gh repo clone littledivy/deno
git checkout expo_react_native

cargo build --release --bin=deno
```

## Usage

Start Expo and connect via Expo Go app:
```shell
EXPO_OFFLINE=1 deno task start
```

```shell
# Now procastinate until the build is done
./notify.ts 'cargo build --release'
```
