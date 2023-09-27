import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'
import * as matchers from '@testing-library/jest-dom/matchers'

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

// import { afterEach } from "vitest"
// import { cleanup } from "@testing-library/react"
// import "@testing-library/jest-dom/vitest"
// // runs a cleanup after each test case (e.g. clearing jsdom)
// afterEach(() => {
//   cleanup()
// })

// import RefreshRuntime from "http://localhost:3000/@react-refresh"
// RefreshRuntime.injectIntoGlobalHook(window)
// window.$RefreshReg$ = () => {}
// window.$RefreshSig$ = () => (type) => type
// window.__vite_plugin_react_preamble_installed__ = true

// import { beforeAll } from 'vitest'
// beforeAll(() => {
//   const refresh = import('/@react-refresh')
//   console.log(refresh)
//   refresh.injectIntoGlobalHook(window)
//   window.$RefreshReg$ = () => {}
//   window.$RefreshSig$ = () => (type) => type
//   window.__vite_plugin_react_preamble_installed__ = true
// })
