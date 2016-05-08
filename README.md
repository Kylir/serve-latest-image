# Serve Latest Image

NodeJS application to serve the latest image of a repository.

The goal is to put this on a Raspberry Pi with a camera and be able to see the latest image recorded.

## How does it work?

Run the script and pass in parameter the path you want to scan.

For instance, to scan `C:\images` and return the content of the latest file do:

```
node index.js C:\images
```

