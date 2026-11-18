import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { setImmediate as settle } from "node:timers/promises";
import { createContext, runInContext } from "node:vm";

class Timers {
  now = 0;
  sequence = 0;
  pending = new Map<number, { callback(): void; due: number; delay: number }>();
  add = (callback: () => void, delay: number): number => {
    this.pending.set(++this.sequence, {
      callback,
      due: this.now + delay,
      delay,
    });
    return this.sequence;
  };
  clear = (id: number): void => {
    this.pending.delete(id);
  };
  advance(ms: number): void {
    const end = this.now + ms;
    while (true) {
      const next = [...this.pending].sort((a, b) => a[1].due - b[1].due)[0];
      if (!next || next[1].due > end) break;
      this.now = next[1].due;
      this.pending.delete(next[0]);
      next[1].callback();
    }
    this.now = end;
  }
}

class Element extends EventTarget {
  id = "";
  className = "";
  title = "";
  allow = "";
  referrerPolicy = "";
  tabIndex = 0;
  src = "";
  isConnected = true;
  removed = false;
  classList = { add() {}, remove() {}, toggle() {} };
  querySelector(): null {
    return null;
  }
  remove(): void {
    this.isConnected = false;
    this.removed = true;
  }
}

interface Events {
  onReady(event: { target: Player }): void;
  onStateChange(event: { target: Player; data: number }): void;
  onError(event: { target: Player; data: number }): void;
}

class Player {
  ready = false;
  plays = 0;
  premature = 0;
  destroyed = 0;
  muted = 0;
  captions: string[] = [];
  readonly events: Events;
  constructor(events: Events) {
    this.events = events;
  }
  mute(): void {
    this.muted++;
  }
  unMute(): void {}
  setVolume(): void {}
  seekTo(): void {}
  pauseVideo(): void {}
  unloadModule(name: string): void {
    this.captions.push(name);
  }
  playVideo(): void {
    if (this.ready) this.plays++;
    else this.premature++;
  }
  destroy(): void {
    this.destroyed++;
  }
  signalReady(): void {
    this.ready = true;
    this.events.onReady({ target: this });
  }
}

interface YouTubeApi {
  Player: new (frame: Element | string, options: { events: Events }) => Player;
  PlayerState: { PLAYING: number };
}

interface Slideshow {
  STATE: {
    slideshow: {
      currentSlideIndex: number;
      itemIds: string[];
      totalItems: number;
      loadedItems: Record<string, { Id: string; Type: string }>;
      createdSlides: Record<string, boolean>;
      slideVideoIds: Record<string, string | null> & { test?: string | null };
      isPaused: boolean;
      isMuted: boolean;
      isVideoPlaying: boolean;
      players: Record<string, Player> & { test?: Player };
      ytPromise: Promise<YouTubeApi | null>;
    };
  };
  SlideUtils: { getOrCreateSlidesContainer(): Element };
  ApiUtils: { getSkipSegments(): Promise<number> };
  SlideCreator: {
    createSlideElement(): {
      slide: Element;
      videoId: string;
      hasLocalTrailer: boolean;
      trailerContainer: Element;
    };
    createSlideForItemId(id: string): Promise<Element>;
  };
  SlideshowManager: {
    startTrailer(index: number, id: string, resume: () => void): Promise<void>;
    clearSlideTimers(): void;
    togglePause(): void;
    setProgressRunning(): void;
    resumeAfterTrailer(): void;
  };
  VisibilityObserver: { wasVisible: boolean };
  PageBackdrop: { clear(): void };
  reset(): void;
}

function deferred<T>(): { promise: Promise<T>; resolve(value: T): void } {
  let resolve = (_value: T): void => {
    throw new Error("Promise resolver not initialized");
  };
  const promise = new Promise<T>((done) => {
    resolve = done;
  });
  return { promise, resolve };
}

function harness(
  options: {
    api?: "pending" | "missing";
    start?: "pending";
    throwPlayer?: boolean;
  } = {},
) {
  const timers = new Timers();
  const frames: Element[] = [];
  const players: Player[] = [];
  const warnings: string[] = [];
  const observers: { callback(): void; connected: boolean }[] = [];
  const apiReady = deferred<YouTubeApi | null>();
  const startTime = deferred<number>();
  let resumes = 0;
  const slide = new Element();
  const trailer = new Element();
  const host = Object.assign(new Element(), {
    id: "yt-player-test",
    className: "video-player",
    replaceWith(frame: Element) {
      assert.equal(frame.id, host.id);
    },
  });
  const container = Object.assign(new Element(), {
    appendChild() {},
    remove() {
      slide.remove();
      notifyRemoval();
    },
  });
  function notifyRemoval(): void {
    for (const observer of observers)
      if (observer.connected) observer.callback();
  }
  const yt: YouTubeApi = {
    Player: class extends Player {
      constructor(_frame: Element | string, opts: { events: Events }) {
        super(opts.events);
        if (options.throwPlayer) throw new Error("player-construction-failed");
        players.push(this);
      }
    },
    PlayerState: { PLAYING: 1 },
  };
  const document = {
    documentElement: {},
    hidden: false,
    createElement(kind: string) {
      assert.equal(kind, "iframe");
      const frame = new Element();
      frames.push(frame);
      return frame;
    },
    querySelector(selector: string) {
      return selector === '.slide[data-item-id="test"]' && slide.isConnected
        ? slide
        : null;
    },
    getElementById(id: string) {
      if (id === "slides-container") return container;
      if (!slide.isConnected) return null;
      if (id === "yt-player-test") return host;
      if (id === "trailer-test") return trailer;
      return null;
    },
  };
  const window = {
    location: { origin: "https://example.org", hash: "#/home", search: "" },
    YT: yt,
    slideshowPure: undefined as Slideshow | undefined,
  };
  const context = createContext({
    window,
    document,
    URLSearchParams,
    location: window.location,
    localStorage: { getItem: () => null },
    setTimeout: timers.add,
    clearTimeout: timers.clear,
    MutationObserver: class {
      entry: { callback(): void; connected: boolean };
      constructor(callback: () => void) {
        this.entry = { callback, connected: false };
        observers.push(this.entry);
      }
      observe(): void {
        this.entry.connected = true;
      }
      disconnect(): void {
        this.entry.connected = false;
      }
    },
    console: {
      warn: (message: string) => warnings.push(message),
      error: (message: string) => warnings.push(message),
      log() {},
    },
  });
  const source = readFileSync(
    new URL("../slideshowpure.js", import.meta.url),
    "utf8",
  );
  // Disable only automatic page startup; exercise the real exposed slide/player methods.
  assert.equal(source.split("\nbootstrap();\n").length, 2);
  runInContext(source.replace("\nbootstrap();\n", "\n"), context);
  const api = window.slideshowPure;
  assert.ok(api);
  const state = api.STATE.slideshow;
  state.itemIds = ["test"];
  state.totalItems = 1;
  state.loadedItems = { test: { Id: "test", Type: "Movie" } };
  state.ytPromise =
    options.api === "pending"
      ? apiReady.promise
      : Promise.resolve(options.api === "missing" ? null : yt);
  api.ApiUtils.getSkipSegments = () =>
    options.start === "pending" ? startTime.promise : Promise.resolve(7);
  api.SlideUtils.getOrCreateSlidesContainer = () => container;
  api.SlideCreator.createSlideElement = () => ({
    slide,
    videoId: "M7lc1UVf-VE",
    hasLocalTrailer: false,
    trailerContainer: trailer,
  });
  api.VisibilityObserver.wasVisible = true;
  api.PageBackdrop.clear = () => {};
  api.SlideshowManager.setProgressRunning = () => {};
  api.SlideshowManager.resumeAfterTrailer = () => {
    resumes++;
  };
  return {
    api,
    yt,
    state,
    document,
    timers,
    frames,
    players,
    warnings,
    apiReady,
    startTime,
    create: () => api.SlideCreator.createSlideForItemId("test"),
    start: () =>
      api.SlideshowManager.startTrailer(0, "test", () => {
        resumes++;
      }),
    resumes: () => resumes,
    remove() {
      slide.remove();
      notifyRemoval();
    },
  };
}

test("waits for iframe load and onReady before playback, including a five-second embed delay", async () => {
  const h = harness();
  await h.create();
  await settle();
  assert.equal(
    h.players.length,
    0,
    "YT.Player must not target the parent's inherited origin",
  );
  const frame = h.frames[0];
  assert.ok(frame);
  assert.equal(frame.referrerPolicy, "strict-origin-when-cross-origin");
  const url = new URL(frame.src);
  assert.equal(url.origin, "https://www.youtube.com");
  assert.equal(url.searchParams.get("origin"), "https://example.org");
  assert.equal(url.searchParams.get("enablejsapi"), "1");
  assert.equal(url.searchParams.get("mute"), "1");
  assert.equal(url.searchParams.get("start"), "7");
  const pending = h.start();
  h.timers.advance(5000);
  assert.equal(h.players.length, 0);
  assert.equal(h.resumes(), 0);
  frame.dispatchEvent(new Event("load"));
  const player = h.players[0];
  assert.ok(player);
  await settle();
  assert.equal(player.plays, 0);
  assert.equal(player.premature, 0);
  player.signalReady();
  await pending;
  assert.equal(player.plays, 1);
  assert.ok(player.muted > 0);
  assert.ok(player.captions.includes("captions"));
  assert.equal([...h.timers.pending.values()][0]?.delay, 4000);
  assert.deepEqual(h.warnings, []);
});

test("initialization stays bounded while waiting for the API, start offset, frame or onReady", async () => {
  for (const stage of ["api", "start", "frame", "ready"]) {
    const h = harness(
      stage === "api"
        ? { api: "pending" }
        : stage === "start"
          ? { start: "pending" }
          : {},
    );
    await h.create();
    await settle();
    if (stage === "ready") h.frames[0]?.dispatchEvent(new Event("load"));
    const pending = h.start();
    h.timers.advance(8000);
    await pending;
    assert.ok(
      h.warnings.some((message) => message.includes("initialization-timeout")),
      stage,
    );
    assert.equal(h.state.slideVideoIds.test, null);
    assert.equal(h.timers.pending.size, 0);
    for (const frame of h.frames) assert.equal(frame.removed, true);
    for (const player of h.players) assert.equal(player.destroyed, 1);
  }
});

test("removing a slide cancels API, frame and readiness work without resurrecting it", async () => {
  for (const stage of ["api", "frame", "ready"]) {
    const h = harness(stage === "api" ? { api: "pending" } : {});
    await h.create();
    await settle();
    if (stage === "ready") h.frames[0]?.dispatchEvent(new Event("load"));
    const pending = h.start();
    h.remove();
    h.apiReady.resolve(h.yt);
    h.frames[0]?.dispatchEvent(new Event("load"));
    h.players[0]?.signalReady();
    await pending;
    await settle();
    assert.equal(h.state.players.test, undefined);
    assert.equal(h.timers.pending.size, 0);
    assert.ok(h.players.every((player) => player.plays === 0));
    assert.deepEqual(h.warnings, []);
  }
});

test("navigation away and back invalidates an earlier pending start", async () => {
  const h = harness();
  await h.create();
  await settle();
  h.frames[0]?.dispatchEvent(new Event("load"));
  const pending = h.start();
  h.api.SlideshowManager.clearSlideTimers();
  h.players[0]?.signalReady();
  await pending;
  assert.equal(h.players[0]?.plays, 0);
  assert.equal(h.timers.pending.size, 0);
});

test("pause, changed index/item and hidden pages reject stale readiness", async () => {
  for (const reason of ["pause", "index", "item", "hidden", "invisible"]) {
    const h = harness();
    await h.create();
    await settle();
    h.frames[0]?.dispatchEvent(new Event("load"));
    const pending = h.start();
    if (reason === "pause") h.api.SlideshowManager.togglePause();
    if (reason === "index") h.state.currentSlideIndex = 1;
    if (reason === "item") h.state.itemIds = ["other"];
    if (reason === "hidden") h.document.hidden = true;
    if (reason === "invisible") h.api.VisibilityObserver.wasVisible = false;
    h.players[0]?.signalReady();
    await pending;
    assert.equal(h.players[0]?.plays, 0, reason);
    assert.equal(h.timers.pending.size, 0, reason);
  }
});

test("teardown invalidates pending starts and releases initialization resources", async () => {
  const h = harness();
  await h.create();
  await settle();
  h.frames[0]?.dispatchEvent(new Event("load"));
  const pending = h.start();
  h.api.reset();
  h.players[0]?.signalReady();
  await pending;
  assert.equal(h.players[0]?.plays, 0);
  assert.equal(Object.keys(h.state.players).length, 0);
  assert.equal(h.timers.pending.size, 0);
});

test("genuine YouTube errors remain visible and release a pending start", async () => {
  const h = harness();
  await h.create();
  await settle();
  h.frames[0]?.dispatchEvent(new Event("load"));
  const player = h.players[0];
  assert.ok(player);
  const pending = h.start();
  player.events.onError({ target: player, data: 101 });
  await pending;
  assert.ok(
    h.warnings.some((message) => message.includes("YouTube error 101")),
  );
  assert.equal(player.destroyed, 1);
  assert.equal(h.timers.pending.size, 0);
});

test("a player constructor failure is reported and releases the frame", async () => {
  const h = harness({ throwPlayer: true });
  await h.create();
  await settle();
  const pending = h.start();
  h.frames[0]?.dispatchEvent(new Event("load"));
  await pending;
  assert.ok(
    h.warnings.some((message) =>
      message.includes("player-construction-failed"),
    ),
  );
  assert.equal(h.frames[0]?.removed, true);
  assert.equal(h.timers.pending.size, 0);
});

test("the original 4000ms watchdog still reports a ready player that never plays", async () => {
  const h = harness();
  await h.create();
  await settle();
  h.frames[0]?.dispatchEvent(new Event("load"));
  h.players[0]?.signalReady();
  await h.start();
  h.timers.advance(3999);
  assert.equal(h.warnings.length, 0);
  h.timers.advance(1);
  assert.ok(
    h.warnings.some((message) =>
      message.includes("did not start within 4000ms"),
    ),
  );
  assert.equal(h.resumes(), 1);
});

test("advancing playback avoids the watchdog warning; local ready players still start", async () => {
  const h = harness();
  const player = new Player({ onReady() {}, onStateChange() {}, onError() {} });
  player.ready = true;
  h.state.players.test = player;
  await h.start();
  assert.equal(player.plays, 1);
  h.state.isVideoPlaying = true;
  h.timers.advance(4000);
  assert.deepEqual(h.warnings, []);
  assert.equal(h.resumes(), 0);
});

test("a missing API resumes the slideshow without leaving an initialization timer", async () => {
  const h = harness({ api: "missing" });
  await h.create();
  await settle();
  await h.start();
  assert.equal(h.resumes(), 1);
  assert.equal(h.players.length, 0);
  assert.equal(h.timers.pending.size, 0);
});
