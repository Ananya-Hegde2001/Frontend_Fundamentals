import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  Reorder,
  motion,
  useAnimationControls,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
  useReducedMotion,
  useSpring,
} from "motion/react";

const ambientTransition = {
  duration: 14,
  repeat: Infinity,
  ease: "easeInOut",
};

const CONTROLS_STORAGE_KEY = "motion-lab.controls.v1";
const CHIP_ORDER_STORAGE_KEY = "motion-lab.chipOrder.v1";

const DEFAULT_CONTROLS = Object.freeze({
  stiffness: 260,
  damping: 24,
  reduceMotion: false,
});

const VIEWPORT_ONCE = Object.freeze({ once: true, amount: 0.28 });

const heroContainerVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.06,
      delayChildren: 0.06,
    },
  },
};

const heroItemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.22, ease: "easeOut" },
  },
};

const navTransitionVariants = {
  initial: {
    opacity: 0,
    pointerEvents: "none",
  },
  cover: {
    opacity: 1,
    pointerEvents: "auto",
    transition: { duration: 0.18, ease: "easeOut" },
  },
  uncover: {
    opacity: 0,
    pointerEvents: "none",
    transition: { duration: 0.22, ease: "easeIn" },
  },
};

function useParallax(value, distance) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function clampNumber(value, min, max, fallback) {
  const num = Number(value);
  if (!Number.isFinite(num)) return fallback;
  return Math.min(max, Math.max(min, num));
}

function loadControlsFromStorage() {
  if (typeof window === "undefined") return DEFAULT_CONTROLS;
  try {
    const raw = window.localStorage?.getItem(CONTROLS_STORAGE_KEY);
    if (!raw) return DEFAULT_CONTROLS;
    const parsed = JSON.parse(raw);

    return {
      stiffness: clampNumber(parsed?.stiffness, 80, 520, DEFAULT_CONTROLS.stiffness),
      damping: clampNumber(parsed?.damping, 8, 44, DEFAULT_CONTROLS.damping),
      reduceMotion: Boolean(parsed?.reduceMotion),
    };
  } catch {
    return DEFAULT_CONTROLS;
  }
}

function persistControlsToStorage(controls) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage?.setItem(CONTROLS_STORAGE_KEY, JSON.stringify(controls));
  } catch {
    // ignore
  }
}

function loadChipOrderFromStorage(allowedIds) {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage?.getItem(CHIP_ORDER_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;

    const allowed = new Set(allowedIds);
    const next = [];
    for (const id of parsed) {
      if (typeof id === "string" && allowed.has(id) && !next.includes(id)) next.push(id);
    }
    for (const id of allowedIds) {
      if (!next.includes(id)) next.push(id);
    }
    return next;
  } catch {
    return null;
  }
}

function persistChipOrderToStorage(order) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage?.setItem(CHIP_ORDER_STORAGE_KEY, JSON.stringify(order));
  } catch {
    // ignore
  }
}

export default function App() {
  const systemReducedMotion = useReducedMotion();

  const [theme, setTheme] = useState(() => {
    if (typeof document !== "undefined") {
      const t = document.documentElement?.dataset?.theme;
      if (t === "light" || t === "dark") return t;
    }

    if (typeof window !== "undefined") {
      const stored = window.localStorage?.getItem("theme");
      if (stored === "light" || stored === "dark") return stored;
      const prefersDark =
        window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
      return prefersDark ? "dark" : "light";
    }

    return "dark";
  });

  const labRef = useRef(null);
  const deckRef = useRef(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const [controls, setControls] = useState(() => loadControlsFromStorage());
  const { stiffness, damping, reduceMotion } = controls;

  const [modeState, setModeState] = useState(true);

  const chipData = useMemo(
    () => [
      {
        id: "drag",
        label: "Drag me",
        detail:
          "Drag interactions are buttery with springs — try changing stiffness/damping in Motion Controls.",
      },
      {
        id: "hover",
        label: "Hover me",
        detail:
          "Hover states work best when they’re subtle: lift, glow, and micro-scale are usually enough.",
      },
      {
        id: "tap",
        label: "Tap me",
        detail:
          "Tap feedback should be instant. If it feels delayed, reduce damping or shorten durations.",
      },
    ],
    []
  );

  const chipById = useMemo(() => {
    const map = new Map();
    for (const chip of chipData) map.set(chip.id, chip);
    return map;
  }, [chipData]);

  const allowedChipIds = useMemo(() => chipData.map((c) => c.id), [chipData]);

  const [chipOrder, setChipOrder] = useState(() => {
    const stored = loadChipOrderFromStorage(allowedChipIds);
    return stored ?? allowedChipIds;
  });
  const [selectedChipId, setSelectedChipId] = useState(null);

  const deck = useMemo(
    () => [
      {
        id: "holo",
        title: "Hologlass",
        subtitle: "Swipe me left/right",
      },
      {
        id: "warp",
        title: "Warp Drive",
        subtitle: "Velocity-based throws",
      },
      {
        id: "nebula",
        title: "Nebula",
        subtitle: "Springy enter/exit",
      },
    ],
    []
  );

  const [deckIndex, setDeckIndex] = useState(0);
  const [deckDir, setDeckDir] = useState(1);

  const cardTransition = useMemo(
    () => ({ type: "spring", stiffness, damping }),
    [stiffness, damping]
  );

  const motionOff = Boolean(reduceMotion || systemReducedMotion);
  const ambientEnabled = !motionOff;

  const [navTarget, setNavTarget] = useState(null);
  const navTransition = useAnimationControls();

  const { scrollYProgress } = useScroll();
  const scrollProgressSpring = useSpring(scrollYProgress, {
    stiffness: 320,
    damping: 38,
    restDelta: 0.001,
  });
  const scrollProgress = motionOff ? scrollYProgress : scrollProgressSpring;

  const parallaxContainerRef = useRef(null);
  const { scrollYProgress: galleryScrollYProgress } = useScroll({
    container: parallaxContainerRef,
  });
  const galleryProgressSpring = useSpring(galleryScrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const galleryProgress = motionOff ? galleryScrollYProgress : galleryProgressSpring;

  const spotlightX = useMotionValue(140);
  const spotlightY = useMotionValue(80);
  const spotlightXSpring = useSpring(spotlightX, { stiffness: 240, damping: 28 });
  const spotlightYSpring = useSpring(spotlightY, { stiffness: 240, damping: 28 });
  const spotlightXpx = useMotionTemplate`${spotlightXSpring}px`;
  const spotlightYpx = useMotionTemplate`${spotlightYSpring}px`;

  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  const tiltXSpring = useSpring(tiltX, { stiffness: 240, damping: 26 });
  const tiltYSpring = useSpring(tiltY, { stiffness: 240, damping: 26 });

  const activeDeckCard = deck[deckIndex % deck.length];

  const selectedChip = selectedChipId ? chipById.get(selectedChipId) : null;

  const scrollTo = useCallback(
    (ref) => {
    const node = ref?.current;
    if (!node) return;
    node.scrollIntoView({
      behavior: motionOff ? "auto" : "smooth",
      block: "start",
    });
    },
    [motionOff]
  );

  useEffect(() => {
    if (!navTarget) return;
    let cancelled = false;

    const run = async () => {
      try {
        navTransition.set("initial");
        await navTransition.start("cover");
        if (cancelled) return;

        scrollTo(navTarget === "lab" ? labRef : deckRef);

        await navTransition.start("uncover");
        if (cancelled) return;
        setNavTarget(null);
      } catch {
        setNavTarget(null);
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [navTarget, navTransition, scrollTo]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.dataset.theme = theme;
    try {
      window.localStorage?.setItem("theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const lastSavedControls = useRef("");
  useEffect(() => {
    const serialized = JSON.stringify(controls);
    if (serialized === lastSavedControls.current) return;
    lastSavedControls.current = serialized;
    persistControlsToStorage(controls);
  }, [controls]);

  const lastSavedChipOrder = useRef("");
  useEffect(() => {
    const serialized = JSON.stringify(chipOrder);
    if (serialized === lastSavedChipOrder.current) return;
    lastSavedChipOrder.current = serialized;
    persistChipOrderToStorage(chipOrder);
  }, [chipOrder]);

  useEffect(() => {
    if (!selectedChipId) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setSelectedChipId(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedChipId]);

  return (
    <MotionConfig
      reducedMotion={motionOff ? "always" : "never"}
      transition={cardTransition}
    >
      <div className="page">
        <AnimatePresence>
          {navTarget ? (
            <motion.div
              key="navTransition"
              className="pageTransition"
              variants={navTransitionVariants}
              initial="initial"
              animate={navTransition}
              exit="initial"
              aria-hidden="true"
            />
          ) : null}
        </AnimatePresence>

        <motion.div
          className="scrollProgress"
          aria-hidden="true"
          style={{ scaleX: scrollProgress }}
        />
        {ambientEnabled ? (
          <>
            <motion.div
              className="bgBlob bgBlobA"
              aria-hidden="true"
              animate={{ x: [0, 24, 0], y: [0, -18, 0], scale: [1, 1.06, 1] }}
              transition={ambientTransition}
            />
            <motion.div
              className="bgBlob bgBlobB"
              aria-hidden="true"
              animate={{ x: [0, -18, 0], y: [0, 22, 0], scale: [1, 1.05, 1] }}
              transition={{ ...ambientTransition, duration: 16 }}
            />
          </>
        ) : null}

        <header className="header">
          <div className="nav">
            <div className="brand">
              <span className="brandDot" aria-hidden="true" />
              <span className="brandText">Motion Lab</span>
            </div>

            <div className="navPills">
              <motion.button
                className="pill"
                type="button"
                onClick={() => {
                  if (motionOff) {
                    scrollTo(labRef);
                    return;
                  }
                  setNavTarget("lab");
                }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 520, damping: 32 }}
              >
                Lab
              </motion.button>
              <motion.button
                className="pill"
                type="button"
                onClick={() => {
                  if (motionOff) {
                    scrollTo(deckRef);
                    return;
                  }
                  setNavTarget("deck");
                }}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 520, damping: 32 }}
              >
                Deck
              </motion.button>

              <motion.button
                className="pill"
                type="button"
                aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 520, damping: 32 }}
              >
                {theme === "dark" ? "Dark" : "Light"}
              </motion.button>
            </div>
          </div>

          <div className="hero">
            <motion.div
              className="heroLeft"
              initial={motionOff ? false : "hidden"}
              animate={motionOff ? { opacity: 1, y: 0 } : "show"}
              variants={motionOff ? undefined : heroContainerVariants}
            >
              <motion.h1 className="heroTitle" variants={heroItemVariants}>
                Build <span className="heroGradient">ridiculous</span> UI motion
              </motion.h1>
              <motion.p className="heroSubtitle" variants={heroItemVariants}>
                Spotlight + 3D tilt, reorder, swipe throws, and spring tuning — all in a
                single page.
              </motion.p>

              <motion.div className="heroBullets" variants={heroItemVariants}>
                <div className="bullet">Cursor spotlight + parallax tilt</div>
                <div className="bullet">Reorder chips + shared-layout detail</div>
                <div className="bullet">Swipe deck with velocity throws</div>
              </motion.div>

              <motion.div className="heroCtas" variants={heroItemVariants}>
                <motion.button
                  className="cta ctaPrimary"
                  type="button"
                  onClick={() => scrollTo(labRef)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 520, damping: 32 }}
                >
                  Jump to Lab
                </motion.button>
                <motion.button
                  className="cta ctaSecondary"
                  type="button"
                  onClick={() => scrollTo(deckRef)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 520, damping: 32 }}
                >
                  Throw the Deck
                </motion.button>
              </motion.div>

              <motion.div className="controls" variants={heroItemVariants}>
                <motion.button
                  className="button"
                  type="button"
                  aria-pressed={isExpanded}
                  onClick={() => setIsExpanded((v) => !v)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  Toggle layout
                </motion.button>
                <motion.button
                  className="button"
                  type="button"
                  aria-pressed={isVisible}
                  onClick={() => setIsVisible((v) => !v)}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                >
                  Toggle presence
                </motion.button>
              </motion.div>
            </motion.div>

            <motion.div
              className="heroRight"
              initial={motionOff ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: motionOff ? 0.01 : 0.32, ease: "easeOut" }}
            >
              <div className="heroCard">
                <div className="heroCardTop">
                  <div className="heroPill">Live springs</div>
                  <div className="heroPill">Drag + reorder</div>
                </div>
                <div className="heroCardTitle">Try moving your cursor</div>
                <div className="heroCardSub">The main card reacts with a spotlight + tilt.</div>
                <div className="heroCardHint">Scroll for the playground ↓</div>
              </div>
            </motion.div>
          </div>
        </header>

      <motion.main
        className="stage"
        initial={motionOff ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionOff ? 0.01 : 0.24, ease: "easeOut" }}
      >
        <motion.section
          ref={labRef}
          className={
            isExpanded
              ? "card cardExpanded cardSpotlight"
              : "card cardSpotlight"
          }
          layout
          transition={cardTransition}
          whileHover={{ y: -2 }}
          style={{
            "--mx": spotlightXpx,
            "--my": spotlightYpx,
            transformPerspective: 900,
            rotateX: motionOff ? 0 : tiltXSpring,
            rotateY: motionOff ? 0 : tiltYSpring,
          }}
          onPointerMove={(e) => {
            if (motionOff) return;
            const rect = e.currentTarget.getBoundingClientRect();
            const localX = e.clientX - rect.left;
            const localY = e.clientY - rect.top;

            spotlightX.set(localX);
            spotlightY.set(localY);

            const px = localX / rect.width;
            const py = localY / rect.height;
            tiltY.set((px - 0.5) * 10);
            tiltX.set(-(py - 0.5) * 8);
          }}
          onPointerLeave={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            spotlightX.set(rect.width * 0.5);
            spotlightY.set(rect.height * 0.25);
            tiltX.set(0);
            tiltY.set(0);
          }}
        >
          <div className="cardContent">
            <div className="cardTop">
              <motion.div
                className="badge"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.98 }}
                transition={cardTransition}
              >
                Lab
              </motion.div>
              <div className="cardText">
                <h2 className="cardTitle">Motion Lab</h2>
                <p className="cardSubtitle">
                  Cursor spotlight, drag, and reorder — all spring-tuned.
                </p>
              </div>
            </div>

            <motion.div
              className="dragBox"
              drag
              dragConstraints={{ left: -40, right: 40, top: -20, bottom: 20 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              whileDrag={{ scale: 1.06 }}
              transition={cardTransition}
            >
              Drag
            </motion.div>

            <div className="sectionTitle">Reorder</div>
            <Reorder.Group
              axis="y"
              values={chipOrder}
              onReorder={setChipOrder}
              as="ul"
              className="list"
            >
              {chipOrder.map((id) => {
                const chip = chipById.get(id);
                if (!chip) return null;

                return (
                  <Reorder.Item
                    key={chip.id}
                    value={chip.id}
                    as="li"
                    className="listItem reorderItem"
                    layoutId={`chip-${chip.id}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open details for ${chip.label}`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.99 }}
                    transition={cardTransition}
                    onClick={() => setSelectedChipId(chip.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedChipId(chip.id);
                      }
                    }}
                  >
                    <span className="grip" aria-hidden="true" />
                    <span className="chipText">{chip.label}</span>
                  </Reorder.Item>
                );
              })}
            </Reorder.Group>

            <AnimatePresence>
              {selectedChip ? (
                <motion.div
                  className="chipDetail"
                  layoutId={`chip-${selectedChip.id}`}
                  initial={motionOff ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={motionOff ? { opacity: 0 } : { opacity: 0, y: 10 }}
                  transition={motionOff ? { duration: 0.01 } : cardTransition}
                >
                  <div className="chipDetailHeader">
                    <div className="chipDetailTitle">{selectedChip.label}</div>
                    <motion.button
                      className="iconButton"
                      type="button"
                      aria-label="Close"
                      onClick={() => setSelectedChipId(null)}
                      whileHover={{ y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 520, damping: 32 }}
                    >
                      ×
                    </motion.button>
                  </div>
                  <div className="chipDetailBody">{selectedChip.detail}</div>
                  <div className="chipDetailHint">Press ESC to close</div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </motion.section>

        <section className="side">
          <div className="sideTitle">Motion Controls</div>

          <div className="controlsPanel">
            <div className="field">
              <label className="label" htmlFor="stiffness">
                Stiffness
                <span className="value">{stiffness}</span>
              </label>
              <input
                id="stiffness"
                className="range"
                type="range"
                min={80}
                max={520}
                step={10}
                value={stiffness}
                onChange={(e) => {
                  const next = clampNumber(e.target.value, 80, 520, DEFAULT_CONTROLS.stiffness);
                  setControls((c) => ({ ...c, stiffness: next }));
                }}
              />
            </div>

            <div className="field">
              <label className="label" htmlFor="damping">
                Damping
                <span className="value">{damping}</span>
              </label>
              <input
                id="damping"
                className="range"
                type="range"
                min={8}
                max={44}
                step={1}
                value={damping}
                onChange={(e) => {
                  const next = clampNumber(e.target.value, 8, 44, DEFAULT_CONTROLS.damping);
                  setControls((c) => ({ ...c, damping: next }));
                }}
              />
            </div>

            <div className="toggleRow">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={reduceMotion}
                  onChange={(e) =>
                    setControls((c) => ({ ...c, reduceMotion: e.target.checked }))
                  }
                />
                <span className="toggleText">Reduce motion</span>
              </label>
            </div>

            <div className="toggleRow">
              <motion.button
                className="button"
                type="button"
                onClick={() => setControls(DEFAULT_CONTROLS)}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                Reset controls
              </motion.button>
            </div>
          </div>

          <div className="sideDivider" />

          <div className="sideTitle">Presence</div>
          <div className="presenceSlot">
            <AnimatePresence mode="popLayout">
              {isVisible ? (
                <motion.div
                  key="presence"
                  className="presence"
                  initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
                >
                  <strong>AnimatePresence</strong> handles mount/unmount animations.
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          <div className="sideDivider" />

          <div className="sideTitle">Swipe Deck</div>
          <div className="deck" ref={deckRef}>
            <AnimatePresence custom={deckDir} mode="popLayout">
              <DeckCard
                key={activeDeckCard.id + deckIndex}
                dir={deckDir}
                card={activeDeckCard}
                motionOff={motionOff}
                transition={cardTransition}
                onThrow={(dir) => {
                  setDeckDir(dir);
                  setDeckIndex((i) => i + 1);
                }}
              />
            </AnimatePresence>

            <div className="dots" aria-hidden="true">
              {deck.map((c, i) => {
                const active = i === deckIndex % deck.length;
                return <div key={c.id} className={active ? "dot dotActive" : "dot"} />;
              })}
            </div>
          </div>
        </section>
      </motion.main>

      <motion.section
        className="card modesCard"
        initial={motionOff ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: motionOff ? 0.01 : 0.22, ease: "easeOut" }}
      >
        <div className="cardContent">
          <div className="cardTop">
            <div className="badge">Modes</div>
            <div className="cardText">
              <h2 className="cardTitle">AnimatePresence modes</h2>
              <p className="cardSubtitle">Compare sync / wait / popLayout behavior.</p>
            </div>
          </div>

          <div className="modesContainer">
            <ModeExample
              mode="sync"
              Icon={SyncIcon}
              state={modeState}
              motionOff={motionOff}
            />
            <ModeExample
              mode="wait"
              Icon={WaitIcon}
              state={modeState}
              motionOff={motionOff}
            />
            <ModeExample
              mode="popLayout"
              Icon={PopLayoutIcon}
              state={modeState}
              motionOff={motionOff}
            />
          </div>

          <div className="modesActions">
            <motion.button
              className="button"
              type="button"
              onClick={() => setModeState((v) => !v)}
              whileTap={motionOff ? undefined : { scale: 0.95 }}
            >
              Switch
            </motion.button>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="card parallaxCard"
        initial={motionOff ? false : { opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: motionOff ? 0.01 : 0.22, ease: "easeOut" }}
      >
        <div className="cardContent">
          <div className="cardTop">
            <div className="badge">Scroll</div>
            <div className="cardText">
              <h2 className="cardTitle">Parallax gallery</h2>
              <p className="cardSubtitle">
                Snap-scroll through panels — labels parallax based on scroll progress.
              </p>
            </div>
          </div>

          <div className="parallaxViewport" ref={parallaxContainerRef}>
            {[1, 2, 3, 4, 5].map((id) => (
              <ParallaxPanel
                key={id}
                id={id}
                containerRef={parallaxContainerRef}
                motionOff={motionOff}
              />
            ))}

            <motion.div
              className="parallaxProgress"
              aria-hidden="true"
              style={{ scaleX: galleryProgress }}
            />
          </div>
        </div>
      </motion.section>

      <WarpTunnelCard motionOff={motionOff} stiffness={stiffness} damping={damping} />

      <footer className="footer">Tip: move your cursor over the card, reorder chips, and throw the deck.</footer>
      </div>
    </MotionConfig>
  );
}

function ParallaxPanel({ id, containerRef, motionOff }) {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useParallax(scrollYProgress, 180);
  const labelY = motionOff ? 0 : y;

  return (
    <section className="parallaxPanel" ref={targetRef} aria-label={`Panel ${id}`}>
      <div className="parallaxFrame" data-id={id}>
        <div className="parallaxFrameInner" aria-hidden="true" />
        <img
          className="parallaxImage"
          src={`/photos/cityscape/${id}.svg`}
          alt={`Cityscape ${id}`}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>
      <motion.h2
        className="parallaxLabel"
        initial={motionOff ? false : { opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={VIEWPORT_ONCE}
        transition={{ duration: motionOff ? 0.01 : 0.2 }}
        style={{ y: labelY }}
      >
        {`#00${id}`}
      </motion.h2>
    </section>
  );
}

function WarpTunnelCard({ motionOff, stiffness, damping }) {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const progressSpring = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  const progress = motionOff ? scrollYProgress : progressSpring;

  const tunnelScale = useTransform(progress, [0, 1], [0.94, 1.08]);
  const tunnelRotate = useTransform(progress, [0, 1], [-10, 10]);
  const tunnelY = useTransform(progress, [0, 1], [36, -28]);
  const backdropOpacity = useTransform(progress, [0, 1], [0.6, 0.95]);

  const cursorX = useMotionValue(260);
  const cursorY = useMotionValue(150);

  const baseStiffness = Math.min(420, Math.max(120, stiffness));
  const baseDamping = Math.min(42, Math.max(16, damping));

  const headX = useSpring(cursorX, { stiffness: baseStiffness, damping: baseDamping });
  const headY = useSpring(cursorY, { stiffness: baseStiffness, damping: baseDamping });

  const midX = useSpring(cursorX, {
    stiffness: baseStiffness * 0.65,
    damping: baseDamping * 1.15,
  });
  const midY = useSpring(cursorY, {
    stiffness: baseStiffness * 0.65,
    damping: baseDamping * 1.15,
  });

  const tailX = useSpring(cursorX, {
    stiffness: baseStiffness * 0.42,
    damping: baseDamping * 1.25,
  });
  const tailY = useSpring(cursorY, {
    stiffness: baseStiffness * 0.42,
    damping: baseDamping * 1.25,
  });

  const spotlightX = useMotionTemplate`${headX}px`;
  const spotlightY = useMotionTemplate`${headY}px`;

  const spotlightBg = useMotionTemplate`
    radial-gradient(900px 520px at ${spotlightX} ${spotlightY}, var(--spotA), transparent 60%),
    radial-gradient(740px 480px at calc(${spotlightX} + 140px) calc(${spotlightY} + 90px), var(--spotB), transparent 62%),
    linear-gradient(180deg, var(--cardGradTop), var(--cardGradBot))
  `;

  const syncPointer = useCallback(
    (clientX, clientY) => {
      const node = viewportRef.current;
      if (!node) return;

      const rect = node.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      cursorX.set(x);
      cursorY.set(y);
    },
    [cursorX, cursorY]
  );

  const resetPointer = useCallback(() => {
    const node = viewportRef.current;
    if (!node) return;

    const rect = node.getBoundingClientRect();
    cursorX.set(rect.width * 0.5);
    cursorY.set(rect.height * 0.45);
  }, [cursorX, cursorY]);

  return (
    <motion.section
      ref={sectionRef}
      className="card warpCard"
      initial={motionOff ? false : { opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT_ONCE}
      transition={{ duration: motionOff ? 0.01 : 0.22, ease: "easeOut" }}
    >
      <div className="cardContent">
        <div className="cardTop">
          <div className="badge">Warp</div>
          <div className="cardText">
            <h2 className="cardTitle">Warp tunnel</h2>
            <p className="cardSubtitle">
              Scroll-linked 3D transforms + a cursor spring trail (tuned by your controls).
            </p>
          </div>
        </div>

        <div
          className="warpViewport"
          ref={viewportRef}
          onPointerMove={(e) => {
            if (motionOff) return;
            syncPointer(e.clientX, e.clientY);
          }}
          onPointerDown={(e) => {
            if (motionOff) return;
            syncPointer(e.clientX, e.clientY);
          }}
          onPointerLeave={() => {
            if (motionOff) return;
            resetPointer();
          }}
        >
          <motion.div
            className="warpBackdrop"
            aria-hidden="true"
            style={{ opacity: backdropOpacity, background: spotlightBg }}
          />

          <motion.div
            className="warpTunnel"
            aria-hidden="true"
            style={{ y: tunnelY, rotate: tunnelRotate, scale: tunnelScale }}
          >
            <div className="warpGrid" />

            <motion.div
              className="warpRing warpRingOuter"
              animate={
                motionOff
                  ? undefined
                  : { rotate: [0, 360], scale: [1, 1.05, 1], opacity: [0.55, 0.75, 0.55] }
              }
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="warpRing warpRingMid"
              animate={motionOff ? undefined : { rotate: [360, 0], scale: [1, 0.96, 1] }}
              transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="warpRing warpRingInner"
              animate={motionOff ? undefined : { rotate: [0, 360] }}
              transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
            />

            <div className="warpVignette" />
          </motion.div>

          <motion.div
            className="warpCursorDot warpCursorDotA"
            aria-hidden="true"
            style={{ x: headX, y: headY, opacity: motionOff ? 0 : 1 }}
          >
            <div className="warpCursorDotInner" />
          </motion.div>
          <motion.div
            className="warpCursorDot warpCursorDotB"
            aria-hidden="true"
            style={{ x: midX, y: midY, opacity: motionOff ? 0 : 1 }}
          >
            <div className="warpCursorDotInner" />
          </motion.div>
          <motion.div
            className="warpCursorDot warpCursorDotC"
            aria-hidden="true"
            style={{ x: tailX, y: tailY, opacity: motionOff ? 0 : 1 }}
          >
            <div className="warpCursorDotInner" />
          </motion.div>

          <div className="warpCaption" aria-hidden="true">
            <div className="warpCaptionLeft">
              <div className="warpCaptionTitle">Scroll → warp</div>
              <div className="warpCaptionSub">Move cursor → spring trail</div>
            </div>
            <div className="warpCaptionRight">stiffness {stiffness} · damping {damping}</div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

function ModeExample({ mode, Icon, state, motionOff }) {
  const defaultEase = [0.26, 0.02, 0.23, 0.94];
  const inEase = mode === "wait" ? [0.02, 0.35, 0.25, 0.99] : defaultEase;
  const outEase = mode === "wait" ? [0.46, 0.04, 0.97, 0.44] : defaultEase;

  return (
    <div className="modeSection">
      <div className="iconContainer">
        <AnimatePresence mode={mode}>
          <motion.div
            key={String(state)}
            className={state ? "baseCircle active" : "baseCircle inactive"}
            initial={motionOff ? false : { opacity: 0, scale: 0.6 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: motionOff ? { duration: 0.01 } : { duration: 0.3, ease: inEase },
            }}
            exit={{
              opacity: 0,
              scale: 0.8,
              transition: motionOff ? { duration: 0.01 } : { duration: 0.3, ease: outEase },
            }}
          >
            <Icon />
          </motion.div>
        </AnimatePresence>
      </div>
      <code className="modeTitle">{mode}</code>
    </div>
  );
}

function DeckCard({ card, dir, motionOff, transition, onThrow }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 0, 240], [-10, 0, 10]);
  const keepOpacity = useTransform(x, [20, 120], [0, 1]);
  const skipOpacity = useTransform(x, [-120, -20], [1, 0]);
  const glow = useTransform(x, [-240, 0, 240], [0.18, 0.08, 0.18]);

  const deckVariants = useMemo(
    () => ({
      initial: (dir) => ({
        opacity: 0,
        x: motionOff ? 0 : -dir * 160,
        rotate: motionOff ? 0 : -dir * 8,
        scale: 0.985,
      }),
      animate: {
        opacity: 1,
        x: 0,
        rotate: 0,
        scale: 1,
      },
      exit: (dir) => ({
        opacity: 0,
        x: motionOff ? 0 : dir * 240,
        rotate: motionOff ? 0 : dir * 10,
        scale: 0.96,
        transition: { duration: motionOff ? 0.01 : 0.18 },
      }),
    }),
    [motionOff]
  );

  return (
    <motion.div
      className="deckCard"
      custom={dir}
      drag={motionOff ? false : "x"}
      style={{ x: motionOff ? 0 : x, rotate: motionOff ? 0 : rotate }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.22}
      onDragEnd={(_, info) => {
        if (motionOff) return;
        const offset = info.offset.x;
        const velocity = info.velocity.x;
        const throwIt = Math.abs(offset) > 120 || Math.abs(velocity) > 600;

        if (!throwIt) return;

        const nextDir = offset !== 0 ? Math.sign(offset) : Math.sign(velocity);
        onThrow(nextDir || 1);
      }}
      variants={deckVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={transition}
      whileTap={motionOff ? undefined : { scale: 0.99 }}
    >
      <motion.div className="deckGlow" aria-hidden="true" style={{ opacity: glow }} />

      <div className="deckLabels" aria-hidden="true">
        <motion.div className="labelPill labelKeep" style={{ opacity: keepOpacity }}>
          KEEP
        </motion.div>
        <motion.div className="labelPill labelSkip" style={{ opacity: skipOpacity }}>
          SKIP
        </motion.div>
      </div>

      <div className="deckBody">
        <div className="deckTitle">{card.title}</div>
        <div className="deckSub">{card.subtitle}</div>
      </div>
    </motion.div>
  );
}

function SyncIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  );
}

function WaitIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="m16.2 7.8 2.9-2.9" />
      <path d="M18 12h4" />
      <path d="m16.2 16.2 2.9 2.9" />
      <path d="M12 18v4" />
      <path d="m4.9 19.1 2.9-2.9" />
      <path d="M2 12h4" />
      <path d="m4.9 4.9 2.9 2.9" />
    </svg>
  );
}

function PopLayoutIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
      <path d="m21 3-9 9" />
      <path d="M15 3h6v6" />
    </svg>
  );
}
