"use client";

import { useEditorUi } from "@/store/editor-ui-store";
import { LivePreview } from "../preview/LivePreview";
import { Modal } from "../ui/Modal";

export function PreviewModal() {
  const open = useEditorUi((s) => s.previewModalOpen);
  const setOpen = useEditorUi((s) => s.setPreviewModal);
  return (
    <Modal open={open} onClose={() => setOpen(false)} variant="full" title="Preview" description="This is exactly what your downloaded file will look like.">
      {open ? <LivePreview className="h-full" /> : null}
    </Modal>
  );
}
