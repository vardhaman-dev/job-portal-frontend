// src/boot/particles.js

import { boot } from 'quasar/wrappers';
import Particles from '@tsparticles/vue3';      // Use the new package name
import { loadFull } from '@tsparticles/engine'; // Use the new package name

export default boot(async ({ app }) => {
  app.use(Particles, {
    init: async engine => {
      // initialize the tsParticles engine
      await loadFull(engine);
    },
  });
});