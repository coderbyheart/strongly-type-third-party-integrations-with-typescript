---
title: "Strongly type third-party integrations with TypeScript"
theme: white
slideNumber: true
header-includes: |
  <link href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;500&display=swap" rel="stylesheet">
  <style>
  :root {
    --r-heading1-size: 1.5em;
  }
   .reveal h1, .reveal h2, .reveal h3, .reveal h4, .reveal h5, .reveal h6 {
      font-weight: 300;
      text-transform: none;
      font-family: var(--heading-font);
      color: #e00073;
   } 
   .reveal {
        font-size: var(--main-font-size);
        font-family: var(--main-font); 
        font-weight: 400;
        font-size: 32px;
        height: calc(100% - 60px);
   }
   .reveal strong {
        font-weight: 500;
   }
   .reveal a {
      color: #0069CC;
   }
   .reveal a:hover, .reveal a:active {
      color: #007EF5;
   }
   .reveal u {
      text-decoration-color: #e00073;
   }
   .reveal ul {
     list-style-type: square;
     list-style-color: #e00073;
   }
   .reveal li::marker {
     color: #e00073;
   }
   .reveal li {
     margin-bottom: 0.75rem;
   }
   :root {
        --main-font: 'Work Sans', sans-serif;
       --heading-font: 'Work Sans', sans-serif;
   }
   .reveal-viewport {
     background-color: #fff;
   }
   .reveal-viewport::after {
      content: "@coderbyheart | CC-BY-NC-SA-4.0";
      position: absolute;
      bottom: 0; 
      left: 0;
      width: 100%; 
      height: 60px;
      background-color: #191919;
      color: white;
      font-family: var(--main-font);
      font-size: 22px;
      font-weight: 500;
      line-height: 60px;
      padding-left: 10vw;
   }
   #markus-tacker img {
      border-radius: 100%;
    }
    #markus-tacker ul {
      font-size: 80%;
      margin-top: 6rem;
    }
    #markus-tacker div.column:first-child {
      text-align: center;
    }
    #title-slide h1 {
      color: #e00073;
      font-weight: 500;
      font-size: 60px;
    }
    #title-slide h1:after {
      content: "BartJS Trondheim";
      display: block;
      color: #222;
      padding: 1rem;
      margin-top: 2rem;
      font-weight: 300;
      font-size: 32px;
    }
    #title-slide:after {
      content: "November 2024";
      font-size: 22px;
      color: #191919;
      font-style: italic;
    }
    figcaption {
      display: none;
    }
    div.column {
      text-align: left;
      width: calc(50% - 1rem); 
      margin-right: 1rem;
    }
    div.column + div.column {
      margin-left: 1rem;
      margin-right: 0;
    }
    .slide p {
      text-align: left;
    }
    div.text-center p {
      text-align: center;
    }
    .reveal pre {
      box-shadow: none;
    }
    .reveal .slide-number {
      bottom: initial;
      top: 8px;
      color: #333;
      background-color: transparent;
      font-size: 36px;
    }
  </style>
---

# Markus Tacker

:::::::::::::: {.columns}

::: {.column width=40%}

![Markus Tacker](./markus.webp){width=50%}

:::

::: {.column width=48%}

<small>Pronouns: he/him</small>

Principal R&D Engineer  
Nordic Semiconductor  
Trondheim, Norway

[coderbyheart.com/socials](https://coderbyheart.com/socials)

:::

::::::::::::::

# Book club: REST in Practice

<https://restinpractice.com/>

<https://coderbyheart.com/rest-in-practice-reading-guide>

# Needs

- Validate incoming data
- Validate outgoing data
- TypeScript

# Why JSON schema

# Alternatives?

# Solution: `@sinclair/typebox`

- JSON Schema based
- In-memory validation
- Fast `TypeCompiler` (~2x faster than AJV)

# Validation basics

Code demo

- Writing validations
- Reading errors

# Best practices

- Re-use and compose
- Add titles, descriptions
- Keep schema open (allow additional properties)

# `validatedFetch()`

<https://github.com/hello-nrfcloud/nrfcloud-api-helpers/blob/91fb1df46b50b3a1d85421ebd7a60f92c5e67707/src/api/validatedFetch.ts#L41>

# In a frontend project

<https://github.com/hello-nrfcloud/web/blob/926fb672bdb5fbad5fe1a04f244355d50e3cb5ee/src/utils/validatingFetch.ts#L42>

# Mocking backends for frontends

<https://github.com/hello-nrfcloud/web/blob/926fb672bdb5fbad5fe1a04f244355d50e3cb5ee/e2e-tests/lib/mock-backend/mock-backend.ts>

# Bonus: type mock messages

# Thank you

<div class="text-center">

Please share your feedback!

<small>[coderbyheart.com/socials](https://coderbyheart.com/socials)</small>

<small>Latest version:  
[`coderbyheart.com/talks`](https://coderbyheart.com/talks)</small>

</div>
