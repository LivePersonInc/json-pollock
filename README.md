# A [playground](https://livepersoninc.github.io/json-pollock/editor/) for Json-Pollock

### How to add new content to the playground

1. Import the dependency from `node_modules/json-pollock/js/schema` into `JSONEditor.vue`. (`src/components/JSONEditor.vue`)
2. Add the reference to `schemaRefs`. Follow the exising examples.
3. Rebuld the project with `yarn build`.
4. Commit, push to the repo, and merge your changes into `gh-pages`.
5. If the build passes this will update the playground. You should see changes within 5 minutes.
