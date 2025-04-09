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
                          <input type="text" class="form-control bg-light border-0" placeholder="Search Person Name" aria-describedby="search-team-member">
                          <button class="btn btn-light" type="button" id="search-team-member"><i class="ri-search-line text-muted"></i></button>
                        </div>
                        <div class="dropdown ms-2">
                          <button class="btn btn-light btn-wave waves-effect waves-light px-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
            <div class="col-xxl-4 col-xl-6 col-lg-6 col-md-6 col-sm-12" v-for="item in processedApiData" :key="item.id">
              <TeamsCardComponent 
                customCardClass="team-member-card" 
                coverSrcClass="card-img-top" 
                :card="item" 
                starIcon="ri-star-fill fs-16" 
                cardBodyClass="p-0" 
                :showDropdown="true" 
                cardFooterClass="border-block-start-dashed text-center" />
            </div>
            <nav aria-label="...">
              <ul class="pagination justify-content-end">
                <li class="page-item disabled"><span class="page-link">Previous</span></li>
                <li class="page-item"><a class="page-link" href="javascript:void(0);">1</a></li>
                <li class="page-item active" aria-current="page"><span class="page-link">2</span></li>
                <li class="page-item"><a class="page-link" href="javascript:void(0);">3</a></li>
                <li class="page-item"><a class="page-link" href="javascript:void(0);">Next</a></li>
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
                <input type="text" class="form-control" id="team-name3" placeholder="Enter Name">
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
                <input type="text" class="form-control" id="team-name1" placeholder="Enter Name">
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
                <input type="text" class="form-control" id="team-name2" placeholder="Enter Name">
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
    <!-- End:: add-members modals -->
      </div>
    </div>
    <!-- Modalele tale rămân neschimbate -->
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import TeamsCardComponent from '@/components/@spk/teams-cards.vue';
import cover1 from "/images/media/team-covers/1.jpg"; // Exemplu static
import face1 from "/images/faces/1.jpg"; // Exemplu static

// Middleware Nuxt
definePageMeta({
  middleware: ["auth"],
});

// Variabile reactive
const apiData = ref(null);
const processedApiData = ref([]);

// Social media static (pentru că nu e în API)
const defaultSocialMedia = [
  { name: "facebook", links: "", icon: "facebook", iconColor: "primary" },
  { name: "twitter", links: "", icon: "twitter-x", iconColor: "secondary" },
  { name: "instagram", links: "", icon: "instagram", iconColor: "warning" },
  { name: "github", links: "", icon: "github", iconColor: "success" },
  { name: "youtube", links: "", icon: "youtube", iconColor: "danger" },
];

// Funcție pentru a calcula "since" din created_at
const calculateSince = (createdAt) => {
  const now = new Date();
  const created = new Date(createdAt);
  const months = Math.floor((now - created) / (1000 * 60 * 60 * 24 * 30));
  return months > 12 ? `${Math.floor(months / 12)} Years` : `${months} Months`;
};

// Fetch și prelucrare date
onMounted(async () => {
  const apiUrl = 'https://67f6b48742d6c71cca6304c4.mockapi.io/api/v1/users/';
  try {
    const response = await axios.get(apiUrl);
    console.log('API Response:', response.data);
    apiData.value = response.data;

    // Prelucrăm datele pentru TeamsCardComponent
    processedApiData.value = response.data.map(user => ({
      id: user.id,
      color: user.roleId === 2 ? "fixed-white" : "warning", // Manager vs Member
      name: `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username,
      email: user.email || 'N/A',
      since: user.created_at ? calculateSince(user.created_at) : 'Unknown',
      projects: user.projects || 'N/A', // Dacă adaugi câmpul în MockAPI
      position: user.roleId === 2 ? 'Manager' : 'Member',
      coverImg: user.coverImg || cover1, // Static fallback
      src: user.avatar || face1, // Folosim avatar sau fallback
      socialMedia: user.socialMedia || defaultSocialMedia, // Static fallback
    }));
  } catch (error) {
    console.error('Eroare la fetch:', error);
  }
});
</script>

<style scoped></style>