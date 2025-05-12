import { defineConfig } from 'vitest/config'

import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: 'src',
    workspace: [
      {
        extends: true,
        test: {
          name: 'unit',
          dir: 'src/core/use-cases',
        },
      },
      {
        extends: true,
        test: {
          name: 'e2e',
          dir: 'src/http/controllers',
          environment:
            './prisma/vitest-enviroment-prisma/prisma-test-enviroment.ts',
        },
      },
    ],
  },
})
