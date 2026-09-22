"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  BookOpenText,
  Briefcase,
  Camera,
  GraduationCap,
  HeartHandshake,
  ListPlus,
  Phone,
  Smile,
  Sparkle,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import { useEffect } from "react";
import { FormProvider, useForm, type Resolver } from "react-hook-form";
import { normalizeBiodata } from "@/lib/biodata";
import { biodataSchema } from "@/lib/schema";
import { useBiodataStore } from "@/store/biodata-store";
import type { BiodataData } from "@/types/biodata";
import { AboutForm } from "../forms/AboutForm";
import { AstrologyForm } from "../forms/AstrologyForm";
import { ContactForm } from "../forms/ContactForm";
import { CustomFieldsForm } from "../forms/CustomFieldsForm";
import { EducationForm } from "../forms/EducationForm";
import { FamilyDetailsForm } from "../forms/FamilyDetailsForm";
import { GodSymbolForm } from "../forms/GodSymbolForm";
import { LifestyleForm } from "../forms/LifestyleForm";
import { PartnerExpectationForm } from "../forms/PartnerExpectationForm";
import { PersonalDetailsForm } from "../forms/PersonalDetailsForm";
import { ProfessionalForm } from "../forms/ProfessionalForm";
import { ProfilePhotoForm } from "../forms/ProfilePhotoForm";
import { EditorSection } from "./EditorSection";
import { useFormRegistry } from "./form-registry";

/**
 * Owns the react-hook-form instance. The form is the editing surface; the Zustand store is the single
 * source of truth that the preview, templates and exports read from. Edits flow form -> store, and
 * external changes (sample data, clear draft, restored draft) flow store -> form via `revision`.
 */
export function EditorSidebar() {
  const setData = useBiodataStore((s) => s.setData);
  const revision = useBiodataStore((s) => s.revision);
  const hydrated = useBiodataStore((s) => s.hydrated);
  const registerForm = useFormRegistry((s) => s.register);

  const form = useForm<BiodataData>({
    resolver: zodResolver(biodataSchema) as unknown as Resolver<BiodataData>,
    defaultValues: useBiodataStore.getState().data,
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  useEffect(() => {
    registerForm(form);
    return () => registerForm(null);
  }, [form, registerForm]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/incompatible-library
    const sub = form.watch((values) => setData(normalizeBiodata(values as BiodataData)));
    return () => sub.unsubscribe();
  }, [form, setData]);

  useEffect(() => {
    if (!hydrated) return;
    form.reset(normalizeBiodata(useBiodataStore.getState().data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [revision, hydrated]);

  return (
    <FormProvider {...form}>
      <form noValidate onSubmit={(e) => e.preventDefault()} className="space-y-3" aria-label="Biodata details">
        <EditorSection panel="photo" title="Profile photo" icon={Camera}>
          <ProfilePhotoForm />
        </EditorSection>
        <EditorSection panel="godSymbol" title="God / Religious Symbol" icon={Sparkle}>
          <GodSymbolForm />
        </EditorSection>
        <EditorSection panel="personal" title="Personal details" icon={UserRound}>
          <PersonalDetailsForm />
        </EditorSection>
        <EditorSection panel="education" title="Education" icon={GraduationCap} toggleable="education">
          <EducationForm />
        </EditorSection>
        <EditorSection panel="profession" title="Professional details" icon={Briefcase} toggleable="profession">
          <ProfessionalForm />
        </EditorSection>
        <EditorSection panel="family" title="Family details" icon={Users} toggleable="family">
          <FamilyDetailsForm />
        </EditorSection>
        <EditorSection panel="contact" title="Contact details" icon={Phone} toggleable="contact">
          <ContactForm />
        </EditorSection>
        <EditorSection panel="astrology" title="Religion and astrology" icon={Sparkles} toggleable="astrology">
          <AstrologyForm />
        </EditorSection>
        <EditorSection panel="lifestyle" title="Lifestyle" icon={Smile} toggleable="lifestyle">
          <LifestyleForm />
        </EditorSection>
        <EditorSection panel="about" title="About me" icon={BookOpenText} toggleable="about">
          <AboutForm />
        </EditorSection>
        <EditorSection panel="expectations" title="Partner expectations" icon={HeartHandshake} toggleable="expectations">
          <PartnerExpectationForm />
        </EditorSection>
        <EditorSection panel="custom" title="Additional information" icon={ListPlus} toggleable="custom">
          <CustomFieldsForm />
        </EditorSection>
      </form>
    </FormProvider>
  );
}
