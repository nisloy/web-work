<template>
  <div v-if="goal">
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-6">
      <div>
        <div class="flex items-center">
          <router-link to="/goals"
            class="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 mr-2">
            <chevron-left-icon class="h-5 w-5" />
          </router-link>
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">{{ goal.name }}</h1>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Created on {{ formatDate(goal.createdAt) }}
        </p>
      </div>

      <div class="mt-4 md:mt-0 flex space-x-3">
        <button @click="showContributionModal = true"
          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          <plus-icon class="h-4 w-4 mr-1" />
          Add Contribution
        </button>
        <button @click="editGoal"
          class="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
          <edit-icon class="h-4 w-4 mr-1" />
          Edit Goal
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- Progress Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Progress</h2>
        <div class="flex justify-center mb-4">
          <div class="relative w-40 h-40">
            <svg class="w-full h-full" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#E5E7EB" stroke-width="10"
                class="dark:stroke-gray-700" />
              <!-- Progress circle -->
              <circle cx="50" cy="50" r="45" fill="none" stroke="#10B981" stroke-width="10" stroke-dasharray="282.7"
                :stroke-dashoffset="282.7 - (282.7 * goalProgress / 100)" stroke-linecap="round"
                transform="rotate(-90 50 50)" />
            </svg>
            <div class="absolute inset-0 flex flex-col items-center justify-center">
              <span class="text-3xl font-bold text-gray-900 dark:text-white">{{ goalProgress }}%</span>
              <span class="text-sm text-gray-500 dark:text-gray-400">Complete</span>
            </div>
          </div>
        </div>
        <div class="text-center">
          <p class="text-sm text-gray-500 dark:text-gray-400">
            {{ goal.currentAmount }} RWF of {{ goal.targetAmount }} RWF
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ goal.targetAmount - goal.currentAmount }} RWF remaining
          </p>
        </div>
      </div>

      <!-- Details Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Details</h2>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Category</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ goal.category }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Target Amount</span>
            <span
              class="text-sm font-medium text-gray-900 dark:text-white">{{ goal.targetAmount }} RWF</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Current Amount</span>
            <span
              class="text-sm font-medium text-gray-900 dark:text-white">{{ goal.currentAmount }} RWF</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Monthly Contribution</span>
            <span
              class="text-sm font-medium text-gray-900 dark:text-white">{{ goal.monthlyContribution }} RWF</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Target Date</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ formatDate(goal.deadline) }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Time Remaining</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ timeRemaining }}</span>
          </div>
        </div>
      </div>

      <!-- Projection Card -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700">
        <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Projection</h2>
        <div class="space-y-3">
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Estimated Completion</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ estimatedCompletionDate }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">Months to Goal</span>
            <span class="text-sm font-medium text-gray-900 dark:text-white">{{ monthsToGoal }}</span>
          </div>
          <div class="flex justify-between">
            <span class="text-sm text-gray-500 dark:text-gray-400">On Track?</span>
            <span class="text-sm font-medium"
              :class="isOnTrack ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">
              {{ isOnTrack ? 'Yes' : 'No' }}
            </span>
          </div>
        </div>
        <div class="mt-4 p-3 rounded-md"
          :class="isOnTrack ? 'bg-green-50 dark:bg-green-900/10' : 'bg-red-50 dark:bg-red-900/10'">
          <p class="text-sm"
            :class="isOnTrack ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'">
            <template v-if="isOnTrack">
              You're on track to reach your goal by {{ formatDate(goal.deadline) }}.
            </template>
            <template v-else>
              At your current rate, you'll reach your goal {{ monthsToGoal - monthsUntilDeadline }} months
              {{ monthsToGoal > monthsUntilDeadline ? 'after' : 'before' }} your target date.
            </template>
          </p>
        </div>
      </div>
    </div>

    <!-- Transactions History -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow p-6 border border-gray-200 dark:border-gray-700 mb-8">
      <h2 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Contribution History</h2>

      <div v-if="goalTransactions.length > 0" class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-900/50">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Date</th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Description</th>
              <th
                class="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Amount</th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="transaction in goalTransactions" :key="transaction.id">
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ formatDate(transaction.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {{ transaction.description }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-right text-red-600 dark:text-red-400">
                {{ Math.abs(transaction.amount) }} RWF
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">
        No contributions yet. Add your first contribution to start tracking progress.
      </div>
    </div>
    <div v-if="showContributionModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-900 dark:text-white">Add Contribution</h2>
          <button @click="showContributionModal = false"
            class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
            <x-icon class="h-5 w-5" />
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label for="contributionAmount" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Amount *
            </label>
            <div class="relative">
              
              <input id="contributionAmount" v-model="contributionAmount" type="number" min="1" required
                class="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                placeholder="0.00" />
            </div>
            <p v-if="contributionError" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ contributionError }}</p>
          </div>

          <div class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md">
            <p class="text-sm text-gray-600 dark:text-gray-300">
              This will add a contribution to your goal and update your progress.
            </p>
          </div>
        </div>

        <div class="flex justify-end space-x-3 mt-6">
          <button @click="showContributionModal = false"
            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            Cancel
          </button>
          <button @click="addContribution"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
            Add Contribution
          </button>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="text-center py-12">
    <p class="text-gray-500 dark:text-gray-400">Goal not found.</p>
    <router-link to="/goals"
      class="inline-flex items-center mt-4 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
      <chevron-left-icon class="h-4 w-4 mr-1" />
      Back to Goals
    </router-link>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useFinanceStore } from '../stores/financeStore';
import {
  ChevronLeftIcon, PlusIcon, EditIcon, XIcon, ChevronRightIcon
} from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const store = useFinanceStore();

// Get goal ID from route params
const goalId = computed(() => route.params.id);

// Get goal data
const goal = computed(() => store.goalById(goalId.value));
const goalProgress = computed(() => store.goalProgress(goalId.value));
const goalTransactions = computed(() => store.transactionsByGoal(goalId.value));

// Contribution modal
const showContributionModal = ref(false);
const contributionAmount = ref('');
const contributionError = ref('');

// Format currency based on settings
const formatCurrency = (value) => {
  return new Intl.NumberFormat(store.settings.locale, {
    style: 'currency',
    currency: store.settings.currency
  }).format(value);
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString(store.settings.locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// Calculate time remaining
const timeRemaining = computed(() => {
  if (!goal.value) return '';

  const deadline = new Date(goal.value.deadline);
  const now = new Date();

  const diffTime = deadline - now;
  if (diffTime <= 0) return 'Past deadline';

  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const months = Math.floor(diffDays / 30);
  const days = diffDays % 30;

  if (months > 0 && days > 0) {
    return `${months} month${months > 1 ? 's' : ''} and ${days} day${days > 1 ? 's' : ''}`;
  } else if (months > 0) {
    return `${months} month${months > 1 ? 's' : ''}`;
  } else {
    return `${days} day${days > 1 ? 's' : ''}`;
  }
});

// Calculate months until deadline
const monthsUntilDeadline = computed(() => {
  if (!goal.value) return 0;

  const deadline = new Date(goal.value.deadline);
  const now = new Date();

  const diffTime = deadline - now;
  const diffDays = diffTime / (1000 * 60 * 60 * 24);
  return Math.ceil(diffDays / 30);
});

// Calculate months to goal based on current progress and monthly contribution
const monthsToGoal = computed(() => {
  if (!goal.value) return 0;

  const remaining = goal.value.targetAmount - goal.value.currentAmount;
  if (remaining <= 0) return 0;

  return Math.ceil(remaining / goal.value.monthlyContribution);
});

// Check if on track
const isOnTrack = computed(() => {
  if (!goal.value) return false;
  return monthsToGoal.value <= monthsUntilDeadline.value;
});

// Calculate estimated completion date
const estimatedCompletionDate = computed(() => {
  if (!goal.value) return '';

  const now = new Date();
  now.setMonth(now.getMonth() + monthsToGoal.value);

  return formatDate(now.toISOString().split('T')[0]);
});

// Edit goal
const editGoal = () => {
  router.push('/goals');
  // We'll handle the edit in the Goals component
};

// Add contribution
const addContribution = () => {
  if (!contributionAmount.value || parseFloat(contributionAmount.value) <= 0) {
    contributionError.value = 'Please enter a valid amount';
    return;
  }

  store.addContribution(parseInt(goalId.value), parseFloat(contributionAmount.value));
  showContributionModal.value = false;
  contributionAmount.value = '';
  contributionError.value = '';
};

// Check if goal exists
onMounted(() => {
  if (!goal.value) {
    router.push('/goals');
  }
});
</script>