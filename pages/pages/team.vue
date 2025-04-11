<template>
  <div>
    <div class="row mt-4">
      <div class="col-xl-9">
        <div class="team-members" id="team-members">
          <div class="row">
            <div class="col-xl-12">
              <div class="card custom-card">
                <div class="card-body">
                  <div class="team-header">
                    <div class="d-flex flex-wrap align-items-center justify-content-between">
                      <div class="h5 fw-semibold mb-0">Team</div>
                      <div class="d-flex align-items-center">
                        <div class="input-group">
                          <input
                            type="text"
                            class="form-control bg-light border-0"
                            placeholder="Search Person Name"
                            aria-describedby="search-team-member"
                            v-model="searchQuery"
                          />
                          <button class="btn btn-light" type="button" id="search-team-member">
                            <i class="ri-search-line text-muted"></i>
                          </button>
                        </div>
                        <div class="dropdown ms-2">
                          <button
                            class="btn btn-light btn-wave waves-effect waves-light px-2"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <i class="ti ti-dots-vertical fs-18"></i>
                          </button>
                          <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="javascript:void(0);">Delete Team</a></li>
                            <li><a class="dropdown-item" href="javascript:void(0);">Edit</a></li>
                            <li><a class="dropdown-item" href="javascript:void(0);">Add Member</a></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Afișăm cardurile din paginatedTeamData -->
            <div
              class="col-xxl-4 col-xl-6 col-lg-6 col-md-6 col-sm-12"
              v-for="item in paginatedTeamData"
              :key="item.id"
            >
              <TeamsCardComponent
                customCardClass="team-member-card"
                coverSrcClass="card-img-top"
                :card="item"
                starIcon="ri-star-fill fs-16"
                cardBodyClass="p-0"
                :showDropdown="true"
                cardFooterClass="border-block-start-dashed text-center"
              />
            </div>
            <!-- Paginare -->
            <nav aria-label="Page navigation">
              <ul class="pagination justify-content-end">
                <li class="page-item" :class="{ disabled: currentPage === 1 }">
                  <a class="page-link" href="javascript:void(0);" @click="previousPage">Previous</a>
                </li>
                <li
                  class="page-item"
                  v-for="page in totalPages"
                  :key="page"
                  :class="{ active: currentPage === page }"
                >
                  <a class="page-link" href="javascript:void(0);" @click="goToPage(page)">{{ page }}</a>
                </li>
                <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                  <a class="page-link" href="javascript:void(0);" @click="nextPage">Next</a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <div class="col-xl-3">
        <!-- Start:: add-members modals -->
        <div class="modal fade" id="create-teamui-mem" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title" id="create-teamuiLabel">Add Member</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body px-4">
                <div class="row">
                  <div class="col-xl-12">
                    <label for="team-name3" class="form-label">Name</label>
                    <input type="text" class="form-control" id="team-name3" placeholder="Enter Name" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-sm btn-primary">Add</button>
              </div>
            </div>
          </div>
        </div>
        <!-- End:: team ui modal -->

        <!-- Start:: team react modal -->
        <div class="modal fade" id="create-teamreact-mem" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title" id="create-teamreactLabel">Add Member</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body px-4">
                <div class="row">
                  <div class="col-xl-12">
                    <label for="team-name1" class="form-label">Name</label>
                    <input type="text" class="form-control" id="team-name1" placeholder="Enter Name" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-sm btn-primary">Add</button>
              </div>
            </div>
          </div>
        </div>
        <!-- End:: team react modal -->

        <!-- Start:: team testing modal -->
        <div class="modal fade" id="create-teamtesting-mem" tabindex="-1">
          <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
              <div class="modal-header">
                <h6 class="modal-title" id="create-teamtestingLabel">Add Member</h6>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body px-4">
                <div class="row">
                  <div class="col-xl-12">
                    <label for="team-name2" class="form-label">Name</label>
                    <input type="text" class="form-control" id="team-name2" placeholder="Enter Name" />
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-sm btn-light" data-bs-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-sm btn-primary">Add</button>
              </div>
            </div>
          </div>
        </div>
        <!-- End:: team testing modal -->
        <div class="team-groups">
          <div class="card custom-card">
            <div class="card-header d-flex align-items-center justify-content-between">
              <h6 class="fw-semibold mb-0">All Teams</h6>
              <div>
                <button
                  class="btn btn-sm btn-primary-light"
                  data-bs-toggle="modal"
                  data-bs-target="#create-team"
                >
                  Create Team<i class="ri-add-line ms-1 align-middle"></i>
                </button>
                <div class="modal fade" id="create-team" tabindex="-1">
                  <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h6 class="modal-title" id="create-teamLabel">Create Team</h6>
                        <button
                          type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div class="modal-body px-4">
                        <div class="row gy-3">
                          <div class="col-xl-12">
                            <label for="team-name" class="form-label">Team Name</label>
                            <input
                              type="text"
                              class="form-control"
                              id="team-name"
                              placeholder="Enter Name"
                            />
                          </div>
                          <div class="col-xl-12">
                            <label class="form-label">Maximum Team Limit</label>
                            <VueMultiselect
                              :searchable="false"
                              :show-labels="false"
                              v-model="teamLimitValue"
                              :options="teamLimitOptions"
                              :multiple="false"
                              placeholder="Choose Limit"
                            ></VueMultiselect>
                          </div>
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-sm btn-light" data-bs-dismiss="modal">
                          Cancel
                        </button>
                        <button type="button" class="btn btn-sm btn-primary">Create</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-body p-0">
              <PerfectScrollbar>
                <div class="teams-nav" id="teams-nav">
                  <ul class="list-unstyled mb-0 mt-2">
                    <li v-for="(team, index) in teamMembers" :key="index">
                      <div
                        v-if="team.menuTitle"
                        class="d-flex justify-content-between align-items-center"
                      >
                        <div class="fs-10 fw-semibold mb-2 text-muted">{{ team.menuTitle }}</div>
                        <div>
                          <v-tooltip activator="parent" location="top">Add Member</v-tooltip>
                          <button
                            class="btn btn-icon btn-sm btn-success-light btn-wave"
                            data-bs-toggle="modal"
                            :data-bs-target="`#create-team${team.menuTitle.toLowerCase().replace(' ', '')}-mem`"
                          >
                            <i class="ri-add-line"></i>
                          </button>
                        </div>
                      </div>
                      <a v-else href="javascript:void(0);">
                        <div class="d-flex align-items-center">
                          <div class="me-2 d-flex align-items-center">
                            <span class="avatar avatar-sm avatar-rounded online">
                              <img :src="team.img" alt="" />
                            </span>
                          </div>
                          <div class="flex-fill">
                            <span>{{ team.name }}</span>
                          </div>
                          <div>
                            <span class="fs-10 fw-semibold text-muted">
                              {{ team.status }}
                            </span>
                          </div>
                        </div>
                      </a>
                    </li>
                  </ul>
                </div>
              </PerfectScrollbar>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';
import TeamsCardComponent from '@/components/@spk/teams-cards.vue';
import VueMultiselect from 'vue-multiselect';
import cover1 from '/images/media/team-covers/1.jpg';
import face1 from '/images/faces/1.jpg';
import face2 from '/images/faces/2.jpg';
import face3 from '/images/faces/3.jpg';
import face4 from '/images/faces/4.jpg';
import face5 from '/images/faces/5.jpg';
import face6 from '/images/faces/6.jpg';
import face7 from '/images/faces/7.jpg';
import face8 from '/images/faces/8.jpg';
import face9 from '/images/faces/9.jpg';
import face10 from '/images/faces/10.jpg';
import face11 from '/images/faces/11.jpg';
import face12 from '/images/faces/12.jpg';
import face13 from '/images/faces/13.jpg';
import face14 from '/images/faces/14.jpg';
import face15 from '/images/faces/15.jpg';
import face16 from '/images/faces/16.jpg';

// Middleware Nuxt
definePageMeta({
  middleware: ['auth'],
});

// Interfață pentru tipizarea utilizatorilor din lista principală
interface TeamMember {
  id: number;
  color: string;
  name: string;
  email: string;
  since: string;
  projects: string;
  position: string;
  coverImg: string;
  src: string;
  socialMedia: { name: string; links: string; icon: string; iconColor: string }[];
}

// Interfață pentru tipizarea membrilor din sidebar
interface SidebarTeamMember {
  menuTitle?: string;
  name?: string;
  img?: string;
  status?: string;
}

// Variabile reactive
const apiData = ref<any>(null);
const processedApiData = ref<TeamMember[]>([]);
const teamMembers = ref<SidebarTeamMember[]>([]); // Datele pentru sidebar
const teamLimitValue = ref<number | null>(null);
const teamLimitOptions = [10, 20, 30];
const searchQuery = ref<string>(''); // Adăugăm căutarea
const currentPage = ref<number>(1); // Pagina curentă
const itemsPerPage = 9; // Număr de elemente pe pagină

const defaultSocialMedia = [
  { name: 'facebook', links: '', icon: 'facebook', iconColor: 'primary' },
  { name: 'twitter', links: '', icon: 'twitter-x', iconColor: 'secondary' },
  { name: 'instagram', links: '', icon: 'instagram', iconColor: 'warning' },
  { name: 'github', links: '', icon: 'github', iconColor: 'success' },
  { name: 'youtube', links: '', icon: 'youtube', iconColor: 'danger' },
];

// Date statice din array-ul `teams` (rămân neschimbate)
const staticTeams: TeamMember[] = [
  {
    id: 1,
    color: 'warning',
    name: 'Alexander Smith',
    email: 'alexandersmith2135@gmail.com',
    since: '16 Months',
    projects: '45',
    position: 'Member',
    coverImg: cover1,
    src: face11,
    socialMedia: defaultSocialMedia,
  },
  {
    id: 2,
    color: 'fixed-white',
    name: 'Alicia Sierra',
    email: 'aliciasierra1645@gmail.com',
    since: '2 Years',
    projects: '78',
    position: 'Associate',
    coverImg: cover1,
    src: face2,
    socialMedia: defaultSocialMedia,
  },
  {
    id: 3,
    color: 'fixed-white',
    name: 'Angelica Hose',
    email: 'angelica143@gmail.com',
    since: '12 Months',
    projects: '35',
    position: 'Member',
    coverImg: cover1,
    src: face4,
    socialMedia: defaultSocialMedia,
  },
  {
    id: 4,
    color: 'fixed-white',
    name: 'Jhope Joseph',
    email: 'jhope.joseph@gmail.com',
    since: '3 Years',
    projects: '126',
    position: 'Team Lead',
    coverImg: cover1,
    src: face10,
    socialMedia: defaultSocialMedia,
  },
  {
    id: 5,
    color: 'warning',
    name: 'King Martin',
    email: 'martinking1998@gmail.com',
    since: '28 Months',
    projects: '114',
    position: 'Member',
    coverImg: cover1,
    src: face13,
    socialMedia: defaultSocialMedia,
  },
  {
    id: 6,
    color: 'fixed-white',
    name: 'Susan Sane',
    email: 'susanasane@gmail.com',
    since: '18 Months',
    projects: '74',
    position: 'Member',
    coverImg: cover1,
    src: face5,
    socialMedia: defaultSocialMedia,
  },
  {
    id: 7,
    color: 'fixed-white',
    name: 'Brenda Hops',
    email: 'brrendahops245@gmail.com',
    since: '16 Months',
    projects: '64',
    position: 'Member',
    coverImg: cover1,
    src: face8,
    socialMedia: defaultSocialMedia,
  },
  {
    id: 8,
    color: 'fixed-white',
    name: 'Paul Rudd',
    email: 'paulrudd143@gmail.com',
    since: '7 Months',
    projects: '17',
    position: 'Member',
    coverImg: cover1,
    src: face15,
    socialMedia: defaultSocialMedia,
  },
  {
    id: 9,
    color: 'fixed-white',
    name: 'Elisha Jin',
    email: 'elishajin@gmail.com',
    since: '4 Years',
    projects: '321',
    position: 'Manager',
    coverImg: cover1,
    src: face15,
    socialMedia: defaultSocialMedia,
  },
];

// Computed property pentru combinarea datelor
const combinedTeamData = computed(() => {
  return [...processedApiData.value, ...staticTeams];
});

// Computed property pentru filtrarea datelor după căutare
const filteredTeamData = computed(() => {
  if (!searchQuery.value) return combinedTeamData.value;
  return combinedTeamData.value.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

// Computed property pentru paginarea datelor
const paginatedTeamData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredTeamData.value.slice(start, end);
});

// Calcularea numărului total de pagini
const totalPages = computed(() => {
  return Math.ceil(filteredTeamData.value.length / itemsPerPage);
});

// Funcții pentru navigarea între pagini
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

// Funcție pentru a calcula "since"
const calculateSince = (createdAt: string) => {
  const now = new Date();
  const created = new Date(createdAt);
  const months = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24 * 30));
  return months > 12 ? `${Math.floor(months / 12)} Years` : `${months} Months`;
};

// Funcție pentru a calcula "status" (timpul de la ultima activitate)
const calculateStatus = (lastActive?: string) => {
  if (!lastActive) return '';
  const now = new Date();
  const last = new Date(lastActive);
  const minutes = Math.floor((now.getTime() - last.getTime()) / (1000 * 60));
  if (minutes < 60) return `${minutes} mins`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hr${hours > 1 ? 's' : ''}`;
};

// Procesarea datelor din API pentru sidebar
const processTeamMembers = (users: any[]) => {
  const teams = [
    { menuTitle: 'TEAM UI', members: [] as SidebarTeamMember[] },
    { menuTitle: 'TEAM REACT', members: [] as SidebarTeamMember[] },
    { menuTitle: 'TEAM TESTING', members: [] as SidebarTeamMember[] },
  ];

  users.forEach((user, index) => {
    const teamIndex = index % 3; // Grupăm utilizatorii în mod arbitrar în cele 3 echipe
    const member: SidebarTeamMember = {
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
      img: user.avatar || face1, // Folosim avatarul din API sau o imagine implicită
      status: calculateStatus(user.last_active), // Presupunem că API-ul are un câmp last_active
    };
    teams[teamIndex].members.push(member);
  });

  // Construim lista finală pentru sidebar
  teamMembers.value = teams.flatMap((team) => [
    { menuTitle: team.menuTitle },
    ...team.members,
  ]);
};

// Fetch date din API
onMounted(async () => {
  const apiUrl = 'https://67f6b48742d6c71cca6304c4.mockapi.io/api/v1/users/';
  try {
    const response = await axios.get(apiUrl);
    apiData.value = response.data;

    // Procesăm datele pentru lista principală
    processedApiData.value = response.data.map((user: any) => ({
      id: user.id,
      color: user.roleId === 2 ? 'fixed-white' : 'warning',
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
      email: user.email || 'N/A',
      since: user.created_at ? calculateSince(user.created_at) : 'Unknown',
      projects: user.projects || 'N/A',
      position: user.roleId === 2 ? 'Manager' : 'Member',
      coverImg: user.coverImg || cover1,
      src: user.avatar || face1,
      socialMedia: user.socialMedia || defaultSocialMedia,
    }));

    // Procesăm datele pentru sidebar
    processTeamMembers(response.data);
  } catch (error) {
    console.error('Eroare la fetch:', error);
  }
});
</script>