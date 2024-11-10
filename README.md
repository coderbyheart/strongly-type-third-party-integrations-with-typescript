# Strongly type third-party integrations with TypeScript

[![Publish](https://github.com/coderbyheart/strongly-type-third-party-integrations-with-typescript/actions/workflows/publish.yaml/badge.svg)](https://github.com/coderbyheart/strongly-type-third-party-integrations-with-typescript/actions/workflows/publish.yaml)

Slides for my talk

- [Markdown](./slides.md)
- [Interactive](https://coderbyheart.github.io/strongly-type-third-party-integrations-with-typescript/index.html)

## Abstract

Many of us have to integrate third-party APIs, and we cannot trust their
documentation. We also need to track when their data format changes. The same is
true for integrating our own (or other teams’) microservices. I will show how we
do this in an effective and flexible way using TypeScript.

In this talk, I will present my approach to doing this safely with TypeScript
and how this enables end-to-end contract testing which I have been using for
many years and consider one of the robust best practices we apply basically in
all of our web application projects.

This is a very practical, hands-on talk with many concrete examples that will
give the audience a clear guide on how to build robust, well documented system
integrations.

We leverage NPM modules to version our API definition and create a clear source
of truth for all your integrations, be it a REST API, WebSocket or CoAP
messages-the same principle applies.

## The three main takeaways are:

1. learn about [TypeBox](https://github.com/sinclairzx81/typebox) and how I use
   it to make integrations of third-party APIs type-safe
1. see a code-example where a frontend-application runs against a mock-API using
   these types
1. get to know techniques to discover breaking API changes through monitoring

## Viewing

An up-to-date version is published to
[GitHub pages](https://coderbyheart.github.io/strongly-type-third-party-integrations-with-typescript/index.html).

Press `s` to show the speaker notes.

### Locally

Open the project using
[Dev Container](https://code.visualstudio.com/docs/remote/containers).

Open two shells:

1. `npm run watch`
2. `npm start`

You can now view the slides at <http://127.0.0.1:8000>.

## Building

Render to reveal.js:

    make build

Render to PowerPoint (useful for copying to a PowerPoint template):

    make public/slides.pptx
