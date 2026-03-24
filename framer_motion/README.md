# Motion (Framer Motion) Demo

Small Vite + React playground using `motion/react`.

## Run

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Docker (production build)

Build the image:

```bash
docker build -t framer-motion-demo .
```

Run the container:

```bash
docker run --rm -p 8080:80 framer-motion-demo
```

Then open http://localhost:8080

Note (Windows): if you see an error connecting to `dockerDesktopLinuxEngine`, start Docker Desktop and ensure it’s running Linux containers.
