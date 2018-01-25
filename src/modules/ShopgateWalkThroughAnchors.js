export function shopgateWalkThroughAnchors (manipulateCallback) {
  const anchors = document.getElementsByTagName('A')

  for (let i = 0; i < anchors.length; i++) {
    manipulateCallback(anchors[i])
  }
}
