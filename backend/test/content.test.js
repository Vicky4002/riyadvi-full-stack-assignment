import test from 'node:test';
import assert from 'node:assert/strict';
import { services, cases, posts, jobs } from '../src/content.js';

test('six required service routes are available and unique',()=>{
  assert.deepEqual(services.map(s=>s.slug),['web-development','app-development','digital-marketing','ar-vr','3d-modeling','ui-ux-design']);
  assert.equal(new Set(services.map(s=>s.slug)).size,services.length);
});
test('case studies have the required detail structure',()=>{
  assert.ok(cases.length>=3);
  for(const item of cases){assert.ok(item.slug);assert.ok(item.challenge);assert.ok(item.solution);assert.ok(Array.isArray(item.technologies));assert.ok(Array.isArray(item.relatedServices));}
});
test('blog articles and job pages have unique slugs',()=>{
  assert.ok(posts.length>=3);assert.equal(new Set(posts.map(p=>p.slug)).size,posts.length);
  assert.ok(jobs.length>=2);assert.equal(new Set(jobs.map(j=>j.slug)).size,jobs.length);
});
