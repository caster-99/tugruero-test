export const parseKi = (value: string): number => {
  if (!value) return 0;

  const cleaned = value.replace(/\./g, "").toLowerCase();

  if (cleaned.includes("septillion")) {
    return Number(cleaned.replace(" septillion", "")) * 1e24;
  }

  if (cleaned.includes("billion")) {
    return Number(cleaned.replace(" billion", "")) * 1e9;
  }

  return Number(cleaned);
};
