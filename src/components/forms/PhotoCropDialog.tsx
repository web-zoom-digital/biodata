"use client";

import { useRef, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";

const VIEW_W = 264;
const VIEW_H = 330; // 4:5 portrait
const OUT_W = 640;
const OUT_H = 800;

interface Props {
  src: string | null;
  onCancel: () => void;
  onConfirm: (dataUrl: string) => void;
}

/** Mounts the cropper only while a photo is selected, so every new photo starts with fresh zoom/position state. */
export function PhotoCropDialog({ src, onCancel, onConfirm }: Props) {
  return src ? <Cropper key={src} src={src} onCancel={onCancel} onConfirm={onConfirm} /> : null;
}

const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));

/** Drag to reposition, slide to zoom. Produces a 4:5 JPEG that is stored with the biodata. */
function Cropper({ src, onCancel, onConfirm }: Props & { src: string }) {
  const imgRef = useRef<HTMLImageElement>(null);
  const drag = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const base = natural ? Math.max(VIEW_W / natural.w, VIEW_H / natural.h) : 1;
  const limits = (z: number) => {
    if (!natural) return { x: 0, y: 0 };
    const s = base * z;
    return { x: Math.max(0, (natural.w * s - VIEW_W) / 2), y: Math.max(0, (natural.h * s - VIEW_H) / 2) };
  };
  const bounded = (o: { x: number; y: number }, z = zoom) => {
    const l = limits(z);
    return { x: clamp(o.x, -l.x, l.x), y: clamp(o.y, -l.y, l.y) };
  };

  const changeZoom = (z: number) => {
    const next = clamp(z, 1, 4);
    setZoom(next);
    setOffset((o) => bounded(o, next));
  };

  const confirm = () => {
    const img = imgRef.current;
    if (!img || !natural) return;
    const canvas = document.createElement("canvas");
    canvas.width = OUT_W;
    canvas.height = OUT_H;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const r = OUT_W / VIEW_W;
    const s = base * zoom;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, OUT_W, OUT_H);
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(img, (VIEW_W / 2 + offset.x - (natural.w * s) / 2) * r, (VIEW_H / 2 + offset.y - (natural.h * s) / 2) * r, natural.w * s * r, natural.h * s * r);
    onConfirm(canvas.toDataURL("image/jpeg", 0.88));
  };

  const nudge = (dx: number, dy: number) => setOffset((o) => bounded({ x: o.x + dx, y: o.y + dy }));

  return (
    <Modal
      open
      onClose={onCancel}
      title="Adjust your photo"
      description="Drag the photo to reposition it and use the slider to zoom."
      footer={
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={confirm} disabled={!natural}>
            Use this photo
          </Button>
        </div>
      }
    >
      <div className="flex flex-col items-center gap-5 px-5 py-5">
        <div
          tabIndex={0}
          role="application"
          aria-label="Photo crop area. Use arrow keys to move the photo."
          className="relative touch-none overflow-hidden rounded-xl bg-mist outline-offset-4 focus-visible:outline-2 focus-visible:outline-brand"
          style={{ width: VIEW_W, height: VIEW_H, cursor: "grab" }}
          onPointerDown={(e) => {
            e.currentTarget.setPointerCapture(e.pointerId);
            drag.current = { x: e.clientX, y: e.clientY, ox: offset.x, oy: offset.y };
          }}
          onPointerMove={(e) => {
            if (!drag.current) return;
            setOffset(bounded({ x: drag.current.ox + e.clientX - drag.current.x, y: drag.current.oy + e.clientY - drag.current.y }));
          }}
          onPointerUp={() => (drag.current = null)}
          onPointerCancel={() => (drag.current = null)}
          onKeyDown={(e) => {
            const step = e.shiftKey ? 24 : 8;
            if (e.key === "ArrowLeft") nudge(-step, 0);
            else if (e.key === "ArrowRight") nudge(step, 0);
            else if (e.key === "ArrowUp") nudge(0, -step);
            else if (e.key === "ArrowDown") nudge(0, step);
            else return;
            e.preventDefault();
          }}
        >
          {
            // eslint-disable-next-line @next/next/no-img-element
            <img
              ref={imgRef}
              src={src}
              alt="Photo being cropped"
              draggable={false}
              onLoad={(e) => setNatural({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
              className="pointer-events-none absolute left-1/2 top-1/2 max-w-none select-none"
              style={
                natural
                  ? { width: natural.w * base * zoom, height: natural.h * base * zoom, transform: `translate(calc(-50% + ${offset.x}px), calc(-50% + ${offset.y}px))` }
                  : { opacity: 0 }
              }
            />
          }
          <div className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-inset ring-white/70" aria-hidden="true" />
        </div>

        <div className="flex w-full max-w-xs items-center gap-3">
          <button type="button" onClick={() => changeZoom(zoom - 0.25)} aria-label="Zoom out" className="grid size-10 place-items-center rounded-full border border-ink/15 hover:bg-mist">
            <Minus className="size-4" aria-hidden="true" />
          </button>
          <input
            type="range"
            min={1}
            max={4}
            step={0.01}
            value={zoom}
            onChange={(e) => changeZoom(Number(e.target.value))}
            aria-label="Zoom"
            className="h-2 w-full accent-brand-dark"
          />
          <button type="button" onClick={() => changeZoom(zoom + 0.25)} aria-label="Zoom in" className="grid size-10 place-items-center rounded-full border border-ink/15 hover:bg-mist">
            <Plus className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </Modal>
  );
}
