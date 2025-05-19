<template>
    <div>
        <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900 dark:text-white">Financial Goals</h1>
            <button @click="showAddGoalForm = true"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                <plus-icon class="h-4 w-4 mr-1" />
                Add Goal
            </button>
        </div>
        <div v-if="goals.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="goal in goals" :key="goal.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-shadow">
                <div class="p-6">
                    <div class="flex justify-between items-start mb-4">
                        <h3 class="text-lg font-medium text-gray-900 dark:text-white">{{ goal.name }}</h3>
                        <div class="flex space-x-1">
                            <button @click="editGoal(goal)"
                                class="p-1 rounded-md text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                                <edit-icon class="h-4 w-4" />
                            </button>
                            <button @click="confirmDeleteGoal(goal.id)"
                                class="p-1 rounded-md text-gray-400 hover:text-red-500 dark:hover:text-red-400">
                                <trash-icon class="h-4 w-4" />
                            </button>
                        </div>
                    </div>

                    <div class="space-y-4">
                        <div>
                            <div class="flex justify-between text-sm mb-1">
                                <span class="font-medium text-gray-500 dark:text-gray-400">Progress</span>
                                <span
                                    class="font-medium text-gray-900 dark:text-white">{{ goalProgress(goal.id) }}%</span>
                            </div>
                            <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                                <div class="bg-emerald-500 h-2.5 rounded-full"
                                    :style="{ width: `${goalProgress(goal.id)}%` }"></div>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p class="text-gray-500 dark:text-gray-400">Target</p>
                                <p class="font-medium text-gray-900 dark:text-white">
                                    {{ goal.targetAmount }}    RWF</p>
                            </div>
                            <div>
                                <p class="text-gray-500 dark:text-gray-400">Current</p>
                                <p class="font-medium text-gray-900 dark:text-white">
                                    {{ goal.currentAmount }}    RWF</p>
                            </div>
                            <div>
                                <p class="text-gray-500 dark:text-gray-400">Monthly</p>
                                <p class="font-medium text-gray-900 dark:text-white">
                                    {{ goal.monthlyContribution }}     RWF</p>
                            </div>
                            <div>
                                <p class="text-gray-500 dark:text-gray-400">Deadline</p>
                                <p class="font-medium text-gray-900 dark:text-white">{{ formatDate(goal.deadline) }}</p>
                            </div>
                        </div>

                        <div class="pt-2">
                            <router-link :to="`/goals/${goal.id}`"
                                class="inline-flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300">
                                View Details
                                <chevron-right-icon class="h-4 w-4 ml-1" />
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-else
            class="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center border border-gray-200 dark:border-gray-700">
            <target-icon class="h-12 w-12 mx-auto text-gray-400 dark:text-gray-500 mb-4" />
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">No goals yet</h3>
            <p class="text-gray-500 dark:text-gray-400 mb-4">Create your first financial goal to start tracking your
                progress.</p>
            <button @click="showAddGoalForm = true"
                class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                <plus-icon class="h-4 w-4 mr-1" />
                Add Goal
            </button>
        </div>
        <div v-if="showAddGoalForm"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                <div class="p-6">
                    <div class="flex justify-between items-center mb-4">
                        <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                            {{ editingGoal ? 'Edit Goal' : 'Add New Goal' }}
                        </h2>
                        <button @click="closeGoalForm"
                            class="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                            <x-icon class="h-5 w-5" />
                        </button>
                    </div>
                    <div class="mb-6">
                        <div class="flex items-center justify-between">
                            <div v-for="(step, index) in wizardSteps" :key="index" class="flex flex-col items-center">
                                <div class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                                    :class="[
                                        currentStep > index
                                            ? 'bg-emerald-500 text-white'
                                            : currentStep === index
                                                ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 ring-2 ring-emerald-500'
                                                : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
                                    ]">
                                    {{ index + 1 }}
                                </div>
                                <span class="text-xs mt-1 text-gray-500 dark:text-gray-400">{{ step }}</span>
                            </div>
                        </div>
                        <div class="relative mt-2">
                            <div class="absolute top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-700"></div>
                            <div class="absolute top-0 left-0 h-1 bg-emerald-500 transition-all duration-300"
                                :style="{ width: `${(currentStep / (wizardSteps.length - 1)) * 100}%` }"></div>
                        </div>
                    </div>
                    <div v-if="currentStep === 0">
                        <div class="space-y-4">
                            <div>
                                <label for="goalName"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Goal Name *
                                </label>
                                <input id="goalName" v-model="newGoal.name" type="text" required
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                    placeholder="e.g. Emergency Fund" />
                                <p v-if="errors.name" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {{ errors.name }}</p>
                            </div>

                            <div>
                                <label for="goalCategory"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Category *
                                </label>
                                <select id="goalCategory" v-model="newGoal.category" required
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white">
                                    <option value="">Select a category</option>
                                    <option value="Savings">Savings</option>
                                    <option value="Purchase">Purchase</option>
                                    <option value="Travel">Travel</option>
                                    <option value="Education">Education</option>
                                    <option value="Other">Other</option>
                                </select>
                                <p v-if="errors.category" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {{ errors.category }}</p>
                            </div>
                        </div>
                    </div>
                    <div v-if="currentStep === 1">
                        <div class="space-y-4">
                            <div>
                                <label for="targetAmount"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Target Amount *
                                </label>
                                <div class="relative">
                                    
                                    <input id="targetAmount" v-model="newGoal.targetAmount" type="number" min="1"
                                        required
                                        class="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="0.00" />
                                </div>
                                <p v-if="errors.targetAmount" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {{ errors.targetAmount }}</p>
                            </div>

                            <div>
                                <label for="monthlyContribution"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Monthly Contribution *
                                </label>
                                <div class="relative">
                                    
                                    <input id="monthlyContribution" v-model="newGoal.monthlyContribution" type="number"
                                        min="1" required
                                        class="w-full pl-7 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white"
                                        placeholder="0.00" />
                                </div>
                                <p v-if="errors.monthlyContribution"
                                    class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.monthlyContribution }}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div v-if="currentStep === 2">
                        <div class="space-y-4">
                            <div>
                                <label for="deadline"
                                    class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Target Date *
                                </label>
                                <input id="deadline" v-model="newGoal.deadline" type="date" required :min="today"
                                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 dark:bg-gray-700 dark:text-white" />
                                <p v-if="errors.deadline" class="mt-1 text-sm text-red-600 dark:text-red-400">
                                    {{ errors.deadline }}</p>
                            </div>

                            <div v-if="estimatedMonths > 0"
                                class="mt-4 p-4 bg-emerald-50 dark:bg-emerald-900/10 rounded-md">
                                <h4 class="text-sm font-medium text-emerald-800 dark:text-emerald-400 mb-2">Goal Summary
                                </h4>
                                <p class="text-sm text-gray-600 dark:text-gray-300">
                                    With a monthly contribution of {{ newGoal.monthlyContribution}}     RWF,
                                    you'll reach your goal of {{ newGoal.targetAmount }}     RWF
                                    in approximately <span class="font-medium">{{ estimatedMonths }} months</span>.
                                </p>
                                <p class="text-sm text-gray-600 dark:text-gray-300 mt-2">
                                    Your target date is <span
                                        class="font-medium">{{ formatDate(newGoal.deadline) }}</span>,
                                    which is {{ monthsUntilDeadline }} months from now.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-between mt-6">
                        <button v-if="currentStep > 0" @click="currentStep--"
                            class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                            Back
                        </button>
                        <div v-else></div>

                        <button v-if="currentStep < wizardSteps.length - 1" @click="nextStep"
                            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                            Next
                        </button>
                        <button v-else @click="saveGoal"
                            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                            {{ editingGoal ? 'Update Goal' : 'Create Goal' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showDeleteConfirm"
            class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
                <p class="text-gray-500 dark:text-gray-400 mb-6">
                    Are you sure you want to delete this goal? This action cannot be undone.
                </p>
                <div class="flex justify-end space-x-3">
                    <button @click="showDeleteConfirm = false"
                        class="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500">
                        Cancel
                    </button>
                    <button @click="deleteGoal"
                        class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useFinanceStore } from '../stores/financeStore';
import { PlusIcon, EditIcon, TrashIcon, XIcon, TargetIcon, ChevronRightIcon } from 'lucide-vue-next';

const store = useFinanceStore();
const goals = computed(() => store.goals);
const goalProgress = (id) => store.goalProgress(id);

const wizardSteps = ['Basic Info', 'Financial Details', 'Timeline'];
const currentStep = ref(0);

const showAddGoalForm = ref(false);
const editingGoal = ref(false);
const showDeleteConfirm = ref(false);
const goalToDeleteId = ref(null);

const newGoal = reactive({
    name: '',
    category: '',
    targetAmount: '',
    monthlyContribution: '',
    deadline: ''
});

const errors = reactive({
    name: '',
    category: '',
    targetAmount: '',
    monthlyContribution: '',
    deadline: ''
});

const today = new Date().toISOString().split('T')[0];

const estimatedMonths = computed(() => {
    if (!newGoal.targetAmount || !newGoal.monthlyContribution || newGoal.monthlyContribution <= 0) {
        return 0;
    }
    return Math.ceil(newGoal.targetAmount / newGoal.monthlyContribution);
});

const monthsUntilDeadline = computed(() => {
    if (!newGoal.deadline) return 0;

    const deadline = new Date(newGoal.deadline);
    const now = new Date();

    const diffTime = deadline - now;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return Math.ceil(diffDays / 30);
});

const formatCurrency = (value) => {
    return new Intl.NumberFormat(store.settings.locale, {
        style: 'currency',
        currency: store.settings.currency
    }).format(value);
};

const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(store.settings.locale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const validateCurrentStep = () => {
    let isValid = true;

    Object.keys(errors).forEach(key => errors[key] = '');

    if (currentStep.value === 0) {
        if (!newGoal.name.trim()) {
            errors.name = 'Goal name is required';
            isValid = false;
        }

        if (!newGoal.category) {
            errors.category = 'Please select a category';
            isValid = false;
        }
    }

    else if (currentStep.value === 1) {
        if (!newGoal.targetAmount || newGoal.targetAmount <= 0) {
            errors.targetAmount = 'Please enter a valid target amount';
            isValid = false;
        }

        if (!newGoal.monthlyContribution || newGoal.monthlyContribution <= 0) {
            errors.monthlyContribution = 'Please enter a valid monthly contribution';
            isValid = false;
        }
    }

    else if (currentStep.value === 2) {
        if (!newGoal.deadline) {
            errors.deadline = 'Please select a target date';
            isValid = false;
        } else {
            const deadlineDate = new Date(newGoal.deadline);
            const today = new Date();

            if (deadlineDate <= today) {
                errors.deadline = 'Target date must be in the future';
                isValid = false;
            }
        }
    }

    return isValid;
};

const nextStep = () => {
    if (validateCurrentStep()) {
        currentStep.value++;
    }
};

const editGoal = (goal) => {
    editingGoal.value = true;
    Object.assign(newGoal, {
        id: goal.id,
        name: goal.name,
        category: goal.category,
        targetAmount: goal.targetAmount,
        monthlyContribution: goal.monthlyContribution,
        deadline: goal.deadline,
        currentAmount: goal.currentAmount
    });
    showAddGoalForm.value = true;
    currentStep.value = 0;
};

const saveGoal = () => {
    if (!validateCurrentStep()) return;

    if (editingGoal.value) {
        store.updateGoal(newGoal);
    } else {
        store.addGoal(newGoal);
    }

    closeGoalForm();
};

const closeGoalForm = () => {
    showAddGoalForm.value = false;
    currentStep.value = 0;
    editingGoal.value = false;

    Object.assign(newGoal, {
        name: '',
        category: '',
        targetAmount: '',
        monthlyContribution: '',
        deadline: ''
    });

    Object.keys(errors).forEach(key => errors[key] = '');
};

const confirmDeleteGoal = (id) => {
    goalToDeleteId.value = id;
    showDeleteConfirm.value = true;
};

const deleteGoal = () => {
    if (goalToDeleteId.value) {
        store.deleteGoal(goalToDeleteId.value);
        showDeleteConfirm.value = false;
        goalToDeleteId.value = null;
    }
};
</script>