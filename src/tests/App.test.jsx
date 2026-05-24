import { describe, test, expect } from 'vitest'
describe('MediBook setup', () => {
  test('vitest works', () => { expect(1 + 1).toBe(2) })
  test('project name', () => { expect('MediBook Hospital').toContain('MediBook') })
  test('math works', () => { expect(10 * 2).toBe(20) })
})
