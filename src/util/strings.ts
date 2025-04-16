export function slugify(v: string): string {
  return String(v)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export function capitalize(v: string, ignorePreposition?: boolean): string {
  if (!v) return ""

  if (!ignorePreposition) {
    return v.charAt(0).toUpperCase().concat(v.slice(1))
  }

  const prepositions = ["de", "da", "do", "dos", "das", "e", "ou", "a"]

  return v
    .split(" ")
    .map((word, index, array) => {
      const isPreposition = prepositions.includes(word.toLowerCase())
      const isFirstOrLastWord = index === 0 || index === array.length - 1

      if (isPreposition && !isFirstOrLastWord) {
        return word.toLowerCase()
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    })
    .join(" ")
}

export function shortName(str: string): string {
  const name = str.split(" ")
  const firstName = name[0]

  const surname =
    name.length > 2
      ? name[name.length - 1]
      : name[name.length - 1].replace(/(da|de|do|das|des|dos)/, "")

  return `${capitalize(firstName)} ${surname.charAt(0).toUpperCase()}.`
}

export function truncate(v: string, max: number): string {
  if (v.length <= max) {
    return v
  }
  return v.slice(0, max).concat("...")
}
