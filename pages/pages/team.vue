<template>
  <div>
    <div class="row">
      <div class="col-xl-12">
        <div class="team-members" id="team-members">
          <div class="row">
            <div class="col-xl-12">
              <div class="card custom-card">
                <div class="card-body">
                  <div class="team-header d-flex flex-wrap align-items-center justify-content-between">
                    <div class="h5 fw-semibold mb-0">Team</div>
                    <div class="d-flex align-items-center">
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control bg-light border-0"
                          placeholder="Search Person Name"
                          v-model="searchQuery"
                          @input="handleSearch"
                        />
                        <button class="btn btn-light" type="button">
                          <i class="ri-search-line text-muted"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Loading state -->
                  <div v-if="loading" class="text-center py-5">
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                    <p class="mt-2">Loading team members...</p>
                  </div>

                  <!-- Error state -->
                  <div v-else-if="error" class="alert alert-danger mt-3">
                    <i class="ri-error-warning-line me-2"></i>
                    {{ error }}
                    <button @click="fetchUsers" class="btn btn-sm btn-danger ms-2">
                      <i class="ri-refresh-line me-1"></i>Retry
                    </button>
                  </div>

                  <!-- Users grid -->
                  <div v-else class="row mt-4">
                    <div
                      class="col-xxl-3 col-xl-6 col-lg-6 col-md-6 col-sm-12"
                      v-for="user in paginatedUsers"
                      :key="user.id"
                    >
                      <TeamsCardComponent
                        :card="user"
                        customCardClass="team-member-card"
                        coverSrcClass="card-img-top"
                        starIcon="ri-star-fill fs-16"
                        cardBodyClass="p-0"
                        :showDropdown="true"
                        cardFooterClass="border-block-start-dashed text-center"
                      />
                    </div>

                    <!-- No results -->
                    <div v-if="!paginatedUsers.length && !loading" class="col-12">
                      <div class="text-center py-5">
                        <i class="ri-user-unfollow-line fs-1 text-muted"></i>
                        <p class="mt-3 text-muted">No team members found</p>
                      </div>
                    </div>
                  </div>

                  <!-- Pagination -->
                  <nav v-if="totalPages > 1" aria-label="Page navigation" class="mt-3">
                    <ul class="pagination justify-content-end">
                      <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="previousPage">Previous</a>
                      </li>
                      <li
                        class="page-item"
                        v-for="page in displayedPages"
                        :key="page"
                        :class="{ active: currentPage === page }"
                      >
                        <a class="page-link" href="#" @click.prevent="goToPage(page)">{{ page }}</a>
                      </li>
                      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                        <a class="page-link" href="#" @click.prevent="nextPage">Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { userAPI } from '~/utils/api'
import TeamsCardComponent from '@/components/@spk/teams-cards.vue'
import { useAuthStore } from '~/stores/auth'

const authStore = useAuthStore()

// Default images
import cover1 from '/images/media/team-covers/1.jpg'
import face1 from '/images/faces/1.jpg'

// Types
interface User {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  role?: string
  avatar?: string
  coverImg?: string
  createdAt?: string
  socialMedia?: any[]
}

// Reactive data
const users = ref<User[]>([])
const searchQuery = ref('')
const currentPage = ref(1)
const loading = ref(false)
const error = ref<string | null>(null)

// Configuration
const itemsPerPage = 8

// Default social media links
const defaultSocialMedia = [
  { name: 'facebook', links: '', icon: 'facebook', iconColor: 'primary' },
  { name: 'twitter', links: '', icon: 'twitter-x', iconColor: 'secondary' },
  { name: 'instagram', links: '', icon: 'instagram', iconColor: 'warning' },
  { name: 'github', links: '', icon: 'github', iconColor: 'success' },
]

// Calculate time since user joined
const calculateSince = (createdAt: string) => {
  if (!createdAt) return 'Recently joined'
  
  const now = new Date()
  const created = new Date(createdAt)
  const diffTime = Math.abs(now.getTime() - created.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  
  if (diffDays < 30) return `${diffDays} days`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months`
  return `${Math.floor(diffDays / 365)} years`
}

// Process users for display
const processedUsers = computed(() =>
  users.value.map(user => ({
    id: user.id,
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'Unknown User',
    email: user.email || 'No email',
    since: calculateSince(user.createdAt || ''),
    position: user.role || 'Team Member',
    coverImg: user.coverImg || cover1,
    src: user.avatar || face1,
    socialMedia: user.socialMedia || defaultSocialMedia,
  }))
)

// Filter users based on search
const filteredUsers = computed(() => {
  if (!searchQuery.value) return processedUsers.value
  
  const query = searchQuery.value.toLowerCase()
  return processedUsers.value.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query) ||
    user.position.toLowerCase().includes(query)
  )
})

// Pagination calculations
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))

const displayedPages = computed(() => {
  const pages = []
  const maxPages = 5 // Maximum number of page buttons to show
  
  if (totalPages.value <= maxPages) {
    for (let i = 1; i <= totalPages.value; i++) {
      pages.push(i)
    }
  } else {
    // Show pages around current page
    let start = Math.max(1, currentPage.value - 2)
    let end = Math.min(totalPages.value, start + maxPages - 1)
    
    if (end - start < maxPages - 1) {
      start = Math.max(1, end - maxPages + 1)
    }
    
    for (let i = start; i <= end; i++) {
      pages.push(i)
    }
  }
  
  return pages
})

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredUsers.value.slice(start, start + itemsPerPage)
})

const fetchUsers = async () => {
  loading.value = true
  error.value = null
  
  try {
    // Log the token being sent
    const token = useCookie('token').value
    console.log('Token exists:', !!token)
    console.log('Token value:', token?.substring(0, 20) + '...') // Show first 20 chars
    
    const response = await userAPI.getAll({})
    
    users.value = response.data
    console.log(`Loaded ${users.value.length} users`)
  } catch (err: any) {
    console.error('Error fetching users:', err)
    console.error('Error response:', err.response)  // Add this
    
    if (err.response?.status === 401) {
      error.value = 'Authentication failed. Please login again.'
    } else if (err.response?.status === 403) {
      error.value = 'You do not have permission to view users. Required roles: USER, ADMIN, or SUPER_ADMIN'
    } else {
      error.value = err.response?.data?.message || 'Failed to load team members.'
    }
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  // Reset to first page when searching
  currentPage.value = 1
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    // Scroll to top of the card
    document.getElementById('team-members')?.scrollIntoView({ behavior: 'smooth' })
  }
}

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

// Lifecycle
onMounted(() => {
   console.log('Current user:', authStore.user)
  console.log('User roles:', authStore.userRoles)
  console.log('Has USER role:', authStore.hasRole('USER'))
  console.log('Has ADMIN role:', authStore.hasRole('ADMIN'))
  fetchUsers()
})

</script>