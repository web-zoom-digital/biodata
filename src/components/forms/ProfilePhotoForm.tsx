"use client";

import { Camera, Crop, Trash2, Upload } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { BLESSINGS } from "@/data/form-options";
import type { BiodataData } from "@/types/biodata";
import { Button } from "../ui/Button";
import { toast } from "../ui/toast";
import { TextField } from "./fields";
import { PhotoCropDialog } from "./PhotoCropDialog";

const ACCEPTED = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 12 * 1024 * 1024;

export function ProfilePhotoForm() {
  const { setValue, watch } = useFormContext<BiodataData>();
  const photo = watch("profile.photo");
  const inputRef = useRef<HTMLInputElement>(null);
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  // Original kept in memory for this session only, so "Adjust" can re-crop without another upload.
  const [original, setOriginal] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (original) URL.revokeObjectURL(original);
    };
  }, [original]);

  const onFile = (file: File | undefined) => {
    if (!file) return;
    if (!ACCEPTED.includes(file.type)) {
      toast.show({ tone: "error", title: "That file type is not supported", description: "Upload a JPG, PNG or WebP image." });
      return;
    }
    if (file.size > MAX_BYTES) {
      toast.show({ tone: "error", title: "The image is too large", description: "Choose a photo under 12 MB." });
      return;
    }
    const url = URL.createObjectURL(file);
    const probe = new Image();
    probe.onload = () => {
      setOriginal(url);
      setCropSrc(url);
    };
    probe.onerror = () => {
      URL.revokeObjectURL(url);
      toast.show({ tone: "error", title: "This image could not be read", description: "Try another photo or save it as JPG first." });
    };
    probe.src = url;
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-4">
        <div className="grid h-28 w-[5.5rem] shrink-0 place-items-center overflow-hidden rounded-xl border border-dashed border-ink/25 bg-mist">
          {photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={photo} alt="Your uploaded profile photo" className="size-full object-cover" />
          ) : (
            <Camera className="size-7 text-ink/35" aria-hidden="true" />
          )}
        </div>
        <div className="flex min-w-0 flex-col items-start gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            className="sr-only"
            id="profile-photo-input"
            onChange={(e) => {
              onFile(e.target.files?.[0]);
              e.target.value = "";
            }}
          />
          <Button variant="outline" size="sm" onClick={() => inputRef.current?.click()}>
            <Upload className="size-4" aria-hidden="true" /> {photo ? "Replace photo" : "Upload photo"}
          </Button>
          <div className="flex flex-wrap gap-2">
            {photo && original ? (
              <Button variant="ghost" size="sm" onClick={() => setCropSrc(original)}>
                <Crop className="size-4" aria-hidden="true" /> Adjust
              </Button>
            ) : null}
            {photo ? (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-700 hover:bg-red-50"
                onClick={() => {
                  setValue("profile.photo", undefined, { shouldDirty: true });
                  setOriginal(null);
                }}
              >
                <Trash2 className="size-4" aria-hidden="true" /> Remove
              </Button>
            ) : null}
          </div>
          <p className="text-xs text-ink/55">JPG, PNG or WebP. Stays on your device.</p>
        </div>
      </div>

      <TextField
        name="profile.blessing"
        label="Blessing line at the top (optional)"
        options={BLESSINGS}
        placeholder="Pick a suggestion or type your own"
        hint="Leave empty to skip it."
      />

      <PhotoCropDialog
        src={cropSrc}
        onCancel={() => setCropSrc(null)}
        onConfirm={(dataUrl) => {
          setValue("profile.photo", dataUrl, { shouldDirty: true });
          setCropSrc(null);
        }}
      />
    </div>
  );
}
