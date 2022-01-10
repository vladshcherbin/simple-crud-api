export default function pathToRegex(path) {
  const namedGroupsPath = path.replaceAll(/:([a-z]+)/g, '(?<$1>[^/#?]+?)')

  return new RegExp(`^${namedGroupsPath}[/#?]?$`)
}
