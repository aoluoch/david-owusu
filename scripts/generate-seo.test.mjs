import test from 'node:test';
import assert from 'node:assert/strict';

import { shouldAbortSeoGeneration } from './generate-seo.mjs';

test('readonly Appwrite errors should not abort SEO generation', () => {
  const error = new Error('This project is in readonly mode. Please contact the organization admin for details.');

  assert.equal(
    shouldAbortSeoGeneration(error, { NODE_ENV: 'production', APPWRITE_PROJECT_ID: 'project-id' }),
    false,
  );
});
