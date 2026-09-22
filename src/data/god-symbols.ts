export interface GodSymbolItem {
  id: string;
  name: string;
  src: string;
  defaultBlessing: string;
}

export function formatSymbolName(filename: string): string {
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, "");
  const cleaned = nameWithoutExt
    .replace(/_/g, " ")
    .replace(/[!)]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return cleaned
    .split(" ")
    .map((word) => {
      if (/^\d+$/.test(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

export function getDefaultBlessingForSymbol(filename: string): string {
  const f = filename.toLowerCase();

  if (f.includes("ganesha")) return "|| Shree Ganeshaya Namah ||";
  if (f.includes("om_symbol")) return "|| Om ||";
  if (f.includes("shree_image")) return "|| Shree ||";
  if (f.includes("swastik")) return "|| Shree ||";
  if (f.includes("dattatreya")) return "|| Shree Dattatreyaya Namah ||";
  if (f.includes("khandoba")) return "|| Jai Malhar ||";
  if (f.includes("renuka")) return "|| Shree Renuka Devi Prasanna ||";
  if (f.includes("hanuman")) return "|| Jai Bajrangbali ||";
  if (f.includes("krishan")) return "|| Shree Krishna Sharanam Mamah ||";
  if (f.includes("ram_image")) return "|| Jai Shree Ram ||";
  if (f.includes("shiv_image")) return "|| Om Namah Shivaya ||";
  if (f.includes("venkateswara")) return "|| Om Namo Venkateshaya ||";
  if (f.includes("vithoba")) return "|| Jai Hari Vitthal ||";
  if (f.includes("sai_baba")) return "|| Om Sai Ram ||";
  if (f.includes("swami_samarth")) return "|| Shri Swami Samarth ||";
  if (f.includes("saint")) return "|| Shree ||";
  if (f.includes("maratha") || f.includes("shivaji") || f.includes("royal_seal")) return "|| Jai Bhavani Jai Shivaji ||";
  if (f.includes("buddha")) return "|| Namo Buddhaya ||";
  if (f.includes("bhimrao")) return "|| Jai Bhim ||";
  if (f.includes("jain") || f.includes("mahavira")) return "|| ॐ नमः सिद्धेभ्यः ||";
  if (f.includes("islamic") || f.includes("masjid")) return "|| Bismillah-ir-Rahman-ir-Rahim ||";
  if (f.includes("cross") || f.includes("jesus")) return "|| Praise the Lord ||";

  return "|| Shree ||";
}

const GOD_SYMBOL_FILENAMES: string[] = [
  "ganesha_image_1.png",
  "ganesha_image_2.png",
  "ganesha_image_3.png",
  "ganesha_image_4.png",
  "ganesha_image_5.png",
  "ganesha_image_6.png",
  "om_symbol_image_1.png",
  "om_symbol_image_2.png",
  "shree_image)1.png",
  "shree_image_2.png",
  "Swastik_image_!.png",
  "Swastik_image_2.png",
  "Lord_dattatreya_image.png",
  "Lord_khandoba_image.png",
  "Lord _khandoba_image.png",
  "goddess_renuka_devi_image.png",
  "hanuman_image.png",
  "krishan_image.png",
  "ram_image.png",
  "shiv_image.png",
  "lord_venkateswara_image.png",
  "lord_venkateswara_image_2.png",
  "lord_vithoba_image.png",
  "sai_baba_image.png",
  "shri_swami_samarth_maharaj_image.png",
  "shri_swami_samarth_maharaj_image_2.png",
  "shri_swami_samarth_maharaj_image_3.png",
  "maharashtrian_saint_image.png",
  "maratha_era_warrior_image.png",
  "royal_seal_chhatrapati_shivaji_maharaj_image.png",
  "loard_buddha_image.png",
  "loard_buddha_image_!.png",
  "loard_buddha_image_2.png",
  "dr_bhimrao_image.png",
  "dr_bhimrao_image_2.png",
  "jain_prateek_chihna_image.png",
  "lord_mahavira_image.png",
  "Islamic_crescent_star_image.png",
  "Masjid_symbol_image.png",
  "Masjid_symbol_image_2.png",
  "cross_image.png",
  "jesus_christ_image.png",
];

export const GOD_SYMBOLS: GodSymbolItem[] = GOD_SYMBOL_FILENAMES.map((filename) => ({
  id: filename,
  name: "",
  src: `/god_symbol/${filename}`,
  defaultBlessing: getDefaultBlessingForSymbol(filename),
}));

export const DEFAULT_GOD_SYMBOL_OBJECT = GOD_SYMBOLS[0];

