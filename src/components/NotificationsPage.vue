<template>
  <q-card class="notification-card q-pa-lg q-mb-md" flat bordered>
    <div class="row items-center justify-between q-mb-md">
      <div class="row items-center q-gutter-md">
        <q-icon name="notifications" size="36px" color="primary" />
        <div class="text-h5 text-primary text-weight-bold">Notifications</div>
        <q-badge
          v-if="notifications.length"
          :label="notifications.length"
          color="red-7"
          rounded
          floating
          class="q-ml-sm text-subtitle1 badge-adjust"
        />
      </div>
      <q-btn
        flat
        round
        icon="delete_sweep"
        size="md"
        @click="clearAllNotifications"
        aria-label="Clear all notifications"
        v-if="notifications.length > 0"
        class="clear-btn"
      >
        <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
          Clear All
        </q-tooltip>
      </q-btn>
    </div>

    <q-separator inset />

    <div class="q-mt-lg" v-if="notifications.length > 0">
      <q-list bordered class="rounded-borders notification-list">
        <transition-group name="fade" tag="div">
          <q-item
            v-for="(notification, index) in notifications"
            :key="notification.timestamp"
            class="notification-item"
            clickable
            @click="dismissNotification(index)"
          >
            <q-item-section avatar>
              <q-icon :name="getNotificationIcon(notification.type)" :color="getNotificationColor(notification.type)" size="28px" />
            </q-item-section>
            <q-item-section>
              <q-item-label class="notification-message">
                {{ notification.message }}
              </q-item-label>
              <q-item-label caption class="notification-timestamp">
                {{ notification.timestamp }}
              </q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-btn
                flat
                round
                icon="close"
                size="sm"
                @click.stop="dismissNotification(index)"
                class="close-btn"
              >
                <q-tooltip anchor="top middle" self="bottom middle" :offset="[10, 10]">
                  Dismiss
                </q-tooltip>
              </q-btn>
            </q-item-section>
          </q-item>
        </transition-group>
      </q-list>
    </div>

    <div v-else class="no-notifications text-center text-grey-6 q-py-xl">
      <q-icon name="notifications_off" size="64px" color="grey-4" class="q-mb-md" />
      <div class="text-h6 text-grey-7">You're all caught up!</div>
      <div class="text-body1 text-grey-6">No new notifications to display.</div>
    </div>
  </q-card>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref([
  { message: 'Profile updated successfully!', timestamp: '10:20 PM IST, Aug 02, 2025', type: 'success' },
  { message: 'New message received from Admin.', timestamp: '09:45 PM IST, Aug 02, 2025', type: 'info' },
  { message: 'Your subscription is expiring soon!', timestamp: '08:00 PM IST, Aug 02, 2025', type: 'warning' },
  { message: 'Failed to process payment.', timestamp: '07:30 PM IST, Aug 02, 2025', type: 'error' }
])

const dismissNotification = (index) => {
  notifications.value.splice(index, 1)
}

const clearAllNotifications = () => {
  notifications.value = []
}

const getNotificationIcon = (type) => {
  switch (type) {
    case 'success': return 'check_circle'
    case 'info': return 'info'
    case 'warning': return 'warning'
    case 'error': return 'error'
    default: return 'notifications'
  }
}

const getNotificationColor = (type) => {
  switch (type) {
    case 'success': return 'green-7'
    case 'info': return 'blue-7'
    case 'warning': return 'orange-7'
    case 'error': return 'red-7'
    default: return 'primary'
  }
}
</script>

<style scoped>
.notification-card {
  border-radius: 20px; /* Even more rounded */
  background: linear-gradient(to bottom right, #ffffff, #f0f4f8); /* Lighter, more subtle gradient */
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.12); /* More pronounced shadow */
  max-width: 800px; /* Increased max-width */
  margin: 0 auto;
  padding: 30px; /* Increased padding */
  overflow: hidden;
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.notification-card:hover {
  transform: translateY(-8px); /* More pronounced lift */
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.15); /* Stronger shadow on hover */
}

.notification-list {
  border-radius: 12px;
  overflow: hidden; /* Ensures rounded corners for inner items */
}

.notification-item {
  padding: 18px 24px; /* More padding for items */
  border-bottom: 1px solid #e5e5e5; /* Lighter border */
  transition: background-color 0.3s ease, transform 0.2s ease;
  align-items: center; /* Vertically align content */
}

.notification-item:hover {
  background-color: #eaf3ff; /* Lighter hover color */
  transform: translateX(5px); /* Subtle slide effect */
}

.notification-item:last-child {
  border-bottom: none;
}

.notification-message {
  font-size: 18px; /* Larger font size */
  font-weight: 600;
  color: #34495e; /* Slightly darker for better contrast */
  line-height: 1.5;
}

.notification-timestamp {
  font-size: 14px; /* Slightly larger timestamp */
  color: #7f8c8d; /* Muted timestamp color */
  margin-top: 4px;
}

.close-btn {
  color: #aeb6bf; /* More subtle default color */
  transition: color 0.3s ease, transform 0.2s ease;
}

.close-btn:hover {
  color: #e74c3c; /* Red on hover */
  transform: scale(1.3); /* More pronounced scale */
}

.clear-btn {
  color: #95a5a6; /* Muted color */
  transition: color 0.3s ease, transform 0.2s ease;
}

.clear-btn:hover {
  color: #1976d2; /* Primary blue on hover */
  transform: rotate(5deg) scale(1.1); /* Slight rotate and scale */
}

.no-notifications {
  opacity: 0.8;
  padding: 60px 20px; /* More vertical padding for empty state */
}

/* Transition styles for fade effect */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
.fade-leave-active {
  position: absolute; /* Prevents jumping when an item is removed */
  width: 100%;
}

@media (max-width: 768px) {
  .notification-card {
    max-width: 100%;
    padding: 20px; /* Adjusted padding for smaller screens */
    border-radius: 16px;
  }

  .notification-item {
    padding: 14px 18px;
  }

  .notification-message {
    font-size: 16px;
  }

  .notification-timestamp {
    font-size: 13px;
  }

  .q-icon[name="notifications"] {
    font-size: 32px !important;
  }

  .text-h5 {
    font-size: 1.3rem; /* Adjust header size for mobile */
  }

  .q-badge {
    font-size: 0.8rem !important;
  }

  .no-notifications {
    padding: 40px 10px;
  }

  .no-notifications .q-icon {
    font-size: 48px !important;
  }
}

.badge-adjust {
  transform: translateX(-20px); /* Nudges it slightly left */
}

</style>
