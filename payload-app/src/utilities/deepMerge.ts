// @ts-nocheck

/**
 * Vérifie si un élément est un objet simple.
 * @param item
 * @returns {boolean}
 */

export function isObject(item: unknown): boolean {
    // Retourne vrai si l'élément est un objet (non null) et non un tableau.

  return item && typeof item === 'object' && !Array.isArray(item)
}

/**
 * Fusionne profondément deux objets.
 * @param target
 * @param ...sources
 */
export default function deepMerge<T, R>(target: T, source: R): T {
  const output = { ...target }
  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, { [key]: source[key] })
        } else {
          output[key] = deepMerge(target[key], source[key])
        }
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }

  return output
}
