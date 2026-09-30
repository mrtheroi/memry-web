/**
 * Link attributes by destination: external URLs open in a new tab without
 * giving it access to this page; in-page anchors stay in the same tab.
 */
export function linkProps(href) {
  if (!/^https?:\/\//.test(href)) return { href }
  return { href, target: '_blank', rel: 'noopener noreferrer' }
}
