"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useBiodataStore } from "@/store/biodata-store";
import { getTemplate, getTemplateOrDefault } from "@/templates";
import { toast } from "../ui/toast";
import { EditorLayout } from "./EditorLayout";

export function CreatePage() {
  const params = useSearchParams();
  const requested = params.get("template");
  const hydrate = useBiodataStore((s) => s.hydrate);
  const hydrated = useBiodataStore((s) => s.hydrated);
  const templateId = useBiodataStore((s) => s.templateId);

  useEffect(() => {
    hydrate(requested);
    if (requested && !getTemplate(requested)) {
      toast.show({
        tone: "info",
        title: "That template was not found",
        description: `We opened ${getTemplateOrDefault(undefined).name} instead. You can change it any time.`,
      });
    }
  }, [hydrate, requested]);

  useEffect(() => {
    if (!hydrated) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("template") !== templateId) {
      url.searchParams.set("template", templateId);
      window.history.replaceState(window.history.state, "", url);
    }
  }, [hydrated, templateId]);

  return <EditorLayout />;
}
