<template>
  <q-card class="about-card q-pa-md q-mb-md">
    <div class="text-h6 q-mb-sm text-primary flex items-center">
      <q-icon name="domain" class="q-mr-sm" /> About TechCorp Inc.
    </div>

    <p class="text-body1 q-mb-md">
      TechCorp Inc. is a leading technology company that builds innovative
      software solutions for businesses worldwide. We're passionate about
      creating products that make a real difference in people’s lives.
    </p>

    <div class="row text-subtitle2 text-grey-8 q-gutter-md q-mt-sm">
      <div class="col-6 flex items-start">
        <q-icon name="people" class="q-mr-sm text-primary" />
        <div>
          <strong>Company Size</strong><br />
          500‑1000 employees
        </div>
      </div>
      <div class="col-6 flex items-start">
        <q-icon name="public" class="q-mr-sm text-primary" />
        <div>
          <strong>Industry</strong><br />
          Technology
        </div>
      </div>
    </div>

    <div class="q-mt-md flex justify-center">
      <q-btn
        flat
        :style="{ color: '#1565c0' }"
        icon="open_in_new"
        label="Visit Company Website"
      />
    </div>
  </q-card>
</template>

<style scoped>
.about-card {
  border-radius: 20px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  background-color: #fff;
}

.about-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  border-color: #cbd5e0;
}
</style>
