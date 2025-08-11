<template>
  <div>
    <div class="row ">
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
                          @input="goToPage(1)"
                        />
                        <button class="btn btn-light" type="button">
                          <i class="ri-search-line text-muted"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div class="row mt-4">
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
                  </div>

                  <!-- Paginare -->
                  <nav aria-label="Page navigation" class="mt-3">
                    <ul class="pagination justify-content-end">
                      <li class="page-item" :class="{ disabled: currentPage === 1 }">
                        <a class="page-link" href="#" @click.prevent="previousPage">Previous</a>
                      </li>
                      <li
                        class="page-item"
                        v-for="page in totalPages"
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
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import TeamsCardComponent from '@/components/@spk/teams-cards.vue';
import cover1 from '/images/media/team-covers/1.jpg';
import face1 from '/images/faces/1.jpg';

const apiUrl = 'http://localhost:8080/api/users'; // API-ul tău

const token = localStorage.getItem('jwt_token'); // tokenul salvat după login

// Reactive data
const users = ref<any[]>([]);
const searchQuery = ref('');
const currentPage = ref(1);
const itemsPerPage = 9;

const defaultSocialMedia = [
  { name: 'facebook', links: '', icon: 'facebook', iconColor: 'primary' },
  { name: 'twitter', links: '', icon: 'twitter-x', iconColor: 'secondary' },
  { name: 'instagram', links: '', icon: 'instagram', iconColor: 'warning' },
  { name: 'github', links: '', icon: 'github', iconColor: 'success' },
  { name: 'youtube', links: '', icon: 'youtube', iconColor: 'danger' },
];

// Funcție care calculează "since" în luni sau ani, ca să afișăm de când e userul în echipă
const calculateSince = (createdAt: string) => {
  const now = new Date();
  const created = new Date(createdAt);
  const months = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 30));
  return months > 12 ? `${Math.floor(months / 12)} Years` : `${months} Months`;
};

// Prelucrăm datele din API pentru afișare
const processedUsers = computed(() =>
  users.value.map(user => ({
    id: user.id,
    name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username || 'N/A',
    email: user.email || 'N/A',
    since: user.createdAt ? calculateSince(user.createdAt) : 'Unknown',
    position: user.role || 'Member',
    coverImg: user.coverImg || cover1,
    src: user.avatar || face1,
    socialMedia: user.socialMedia || defaultSocialMedia,
  }))
);

// Filtrare după search
const filteredUsers = computed(() => {
  if (!searchQuery.value) return processedUsers.value;
  return processedUsers.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Paginare
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage));

const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return filteredUsers.value.slice(start, start + itemsPerPage);
});

// Navigare pagini
function goToPage(page: number) {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
}
function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}
function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

// Fetch users din API
onMounted(async () => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    users.value = response.data; // asigură-te că API-ul răspunde cu array de users direct
  } catch (error) {
    console.error('Eroare la fetch users:', error);
  }
});
</script>
