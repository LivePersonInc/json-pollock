<img src="./docs/public/logo.png" width="120px"/>

# Json-Pollock

The **Json-Pollock** package renders live DOM elements out of JSON according to the [Structured Messaging Templates specification](https://developers.liveperson.com/structured-content-templates.html)

## Development

Install dependencies with `yarn`

To run the dev server with playground:

```sh
yarn dev
```

To run unit & integrated tests:

```sh
yarn test
```

To create a production bundle:

```sh
yarn build
```

To see stats & bundle analysis by build analyzer:
```sh
RSDOCTOR=1 yarn build
```
Then open generated report from `dist/.rsdoctor/rsdoctor-report.html`

## Docs

Browse [internal docs](./docs/guide/introduction.md) or navigate to hosted documentation website [Guide](https://livepersoninc.github.io/json-pollock/guide/)


## Playground

Run in dev mode or navigate to hosted documentation website [Playground](https://livepersoninc.github.io/json-pollock/playground/)
