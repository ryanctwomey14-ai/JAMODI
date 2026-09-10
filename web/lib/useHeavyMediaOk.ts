"use client";

import { useEffect, useState } from "react";

/* Should this client download a multi-megabyte decorative video?
   ---------------------------------------------------------------------------
   Three reasons to say no, and they are all real on a phone:

     · Small screen. The hero footage is scenery behind text. On a 390px band
       it is barely legible as a building, and it costs ~1.9MB — frequently on
       a metered cellular connection. The poster frame carries the same image
       at ~90KB.
     · Save-Data. The user has explicitly asked every site to send less.
     · prefers-reduced-motion. Auto-playing footage is exactly what that
       setting exists to stop; handled by the caller alongside this.

   Starts false so the server-rendered markup and the first client paint agree
   (no hydration mismatch) and the poster is what everyone sees first. Desktop
   upgrades to video after mount, which costs nothing visible because the
   poster is already painted underneath. */
export function useHeavyMediaOk(minWidth = 768) {
  const [ok, setOk] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (conn?.saveData) return;

    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const sync = () => setOk(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [minWidth]);

  return ok;
}
