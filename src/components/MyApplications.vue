<template>
  <div class="q-pa-md">
    <div class="row justify-between items-center q-mb-md">
      <h4 class="q-mt-none q-mb-none">My Applications</h4>
      <div class="text-grey">
        <q-icon name="description" class="q-mr-xs" />
        <span>{{ applications.length }} applications</span>
      </div>
    </div>

    <q-card
      v-for="(app, index) in applications"
      :key="index"
      class="q-mb-md q-pa-md application-card"
      flat
      bordered
    >
      <div class="row justify-between items-start">
        <div class="col-10">
          <div class="text-subtitle1 text-bold">{{ app.position }}</div>
          <div class="row items-center q-gutter-sm q-mt-xs text-grey-7">
            <q-icon name="business" />
            <span>{{ app.company }}</span>

            <q-icon name="place" />
            <span>{{ app.location }}</span>

            <q-icon name="attach_money" />
            <span>{{ app.salary }}</span>
          </div>
          <div class="text-caption text-grey q-mt-xs">
            Applied on {{ app.date }}
          </div>
        </div>

        <div class="col-auto flex column items-end q-gutter-sm">
          <q-badge
            :label="app.status"
            :color="getStatusColor(app.status)"
            outline
            class="q-mb-xs"
          />
          <q-btn
            flat
            round
            icon="visibility"
            color="primary"
            size="sm"
            label="View"
            class="q-pa-xs"
          />
        </div>
      </div>
    </q-card>
  </div>
</template>

<script setup>
const applications = [
  {
    position: 'Senior Frontend Developer',
    company: 'TechCorp Inc.',
    location: 'San Francisco, CA',
    salary: '$120k - $150k',
    date: '1/15/2024',
    status: 'Under Review'
  },
  {
    position: 'Product Manager',
    company: 'StartupXYZ',
    location: 'Remote',
    salary: '$100k - $130k',
    date: '1/12/2024',
    status: 'Interview Scheduled'
  },
  {
    position: 'UX Designer',
    company: 'DesignStudio',
    location: 'New York, NY',
    salary: '$80k - $110k',
    date: '1/10/2024',
    status: 'Rejected'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Under Review':
      return 'orange';
    case 'Interview Scheduled':
      return 'blue';
    case 'Rejected':
      return 'red';
    default:
      return 'grey';
  }
};
</script>

<style scoped>
.text-bold {
  font-weight: 600;
}

.application-card {
  border-radius: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.06);
  transition: all 0.25s ease;
  cursor: pointer;
}

.application-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  border-color: #409eff; /* Light blue border on hover */
}
</style>
