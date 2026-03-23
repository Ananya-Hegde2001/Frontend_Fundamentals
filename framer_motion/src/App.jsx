import { useMemo, useState } from "react";
import {
  AnimatePresence,
  Reorder,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useReducedMotion,
  useSpring,
} from "motion/react";

const ambientTransition = {
  duration: 14,
  repeat: Infinity,
  ease: "easeInOut",
};

export default function App() {
  const systemReducedMotion = useReducedMotion();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [stiffness, setStiffness] = useState(260);
  const [damping, setDamping] = useState(24);
  const [reduceMotion, setReduceMotion] = useState(false);

  const [chips, setChips] = useState(() => ["Drag me", "Hover me", "Tap me"]);

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

  return (
    <div className="page">
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
        <h1 className="title">Motion Demo</h1>
        <p className="subtitle">
          A tiny playground using <code>motion/react</code>.
        </p>
      </header>

      <div className="controls">
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
      </div>

      <motion.main
        className="stage"
        initial={motionOff ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionOff ? 0.01 : 0.24, ease: "easeOut" }}
      >
        <motion.section
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
              values={chips}
              onReorder={setChips}
              as="ul"
              className="list"
            >
              {chips.map((label) => (
                <Reorder.Item
                  key={label}
                  value={label}
                  as="li"
                  className="listItem reorderItem"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.99 }}
                  transition={cardTransition}
                >
                  <span className="grip" aria-hidden="true" />
                  <span className="chipText">{label}</span>
                </Reorder.Item>
              ))}
            </Reorder.Group>
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
                onChange={(e) => setStiffness(Number(e.target.value))}
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
                onChange={(e) => setDamping(Number(e.target.value))}
              />
            </div>

            <div className="toggleRow">
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={reduceMotion}
                  onChange={(e) => setReduceMotion(e.target.checked)}
                />
                <span className="toggleText">Reduce motion</span>
              </label>
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
          <div className="deck">
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

      <footer className="footer">
        Tip: move your cursor over the card, reorder chips, and throw the deck.
      </footer>
    </div>
  );
}

function DeckCard({ card, dir, motionOff, transition, onThrow }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 0, 240], [-10, 0, 10]);
  const keepOpacity = useTransform(x, [20, 120], [0, 1]);
  const skipOpacity = useTransform(x, [-120, -20], [1, 0]);
  const glow = useTransform(x, [-240, 0, 240], [0.18, 0.08, 0.18]);

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
      variants={{
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
      }}
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
