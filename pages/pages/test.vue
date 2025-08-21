<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import PageHeader from '@/components/common/pageheader.vue';
import ProfileCardComponent from '@/components/@spk/pages/profile-cards.vue';
import Activities from '@/components/@spk/activities.vue';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import { userAPI } from '~/utils/api';

// Importuri imagini
import face1 from '/images/faces/1.jpg';
import face2 from '/images/faces/2.jpg';
import face3 from '/images/faces/3.jpg';
import face6 from '/images/faces/6.jpg';
import face7 from '/images/faces/7.jpg';
import face11 from '/images/faces/11.jpg';
import face12 from '/images/faces/12.jpg';
import face13 from '/images/faces/13.jpg';
import face15 from '/images/faces/15.jpg';
import media39 from '/images/media/media-39.jpg';
import media17 from '/images/media/media-17.jpg';
import media18 from '/images/media/media-18.jpg';
import media75 from '/images/media/media-75.jpg';
import media56 from '/images/media/media-56.jpg';
import media59 from '/images/media/media-59.jpg';
import media54 from '/images/media/media-54.jpg';
import media61 from '/images/media/media-61.jpg';
import media52 from '/images/media/media-52.jpg';
import media29 from '/images/media/media-29.jpg';
import media64 from '/images/media/media-64.jpg';
import media40 from '/images/media/media-40.jpg';
import media41 from '/images/media/media-41.jpg';
import media42 from '/images/media/media-42.jpg';
import media43 from '/images/media/media-43.jpg';
import media44 from '/images/media/media-44.jpg';
import media45 from '/images/media/media-45.jpg';
import media46 from '/images/media/media-46.jpg';
import media60 from '/images/media/media-60.jpg';
import media26 from '/images/media/media-26.jpg';
import media32 from '/images/media/media-32.jpg';
import media30 from '/images/media/media-30.jpg';
import media31 from '/images/media/media-31.jpg';
import filemanager3 from '/images/media/file-manager/3.png';

// Middleware autentificare
definePageMeta({
  middleware: ['auth'],
});

// Date statice (ca fallback)
const profileDetails = ref({
  bio: `I am <b class="text-default">Sonya Taylor,</b> here by conclude that, I am the founder and managing director of the prestigious company name laugh at all and acts as the chief executive officer of the company.`,
  contactInformation: [
    { icon: 'mail', title: 'sonyataylor2531@gmail.com' },
    { icon: 'phone', title: '+(555) 555-1234' },
    { icon: 'map-pin', title: 'MIG-1-11, Monroe Street, Georgetown, Washington D.C, USA, 20071' },
  ],
  links: [
    { name: 'https://www.spruko.com/', links: 'https://www.spruko.com/' },
    { name: 'https://themeforest.net/user/spruko/portfolio', links: 'https://themeforest.net/user/spruko/portfolio' },
  ],
  socialMedia: [
    { name: 'facebook', links: '', icon: 'facebook', iconColor: 'primary' },
    { name: 'twitter', links: '', icon: 'twitter-x', iconColor: 'secondary' },
    { name: 'instagram', links: '', icon: 'instagram', iconColor: 'warning' },
    { name: 'github', links: '', icon: 'github', iconColor: 'success' },
    { name: 'youtube', links: '', icon: 'youtube', iconColor: 'danger' },
  ],
  followers: [
    { name: 'Alicia Sierra', email: 'aliciasierra389@gmail.com', avatar: face1 },
    { name: 'Samantha Mery', email: 'samanthamery@gmail.com', avatar: face3 },
    { name: 'Juliana Pena', email: 'juliapena555@gmail.com', avatar: face6 },
    { name: 'Adam Smith', email: 'adamsmith99@gmail.com', avatar: face15 },
    { name: 'Farhaan Amhed', email: 'farhaanahmed989@gmail.com', avatar: face13 },
  ],
  skills: [
    'Cloud computing',
    'Data analysis',
    'DevOps',
    'Machine learning',
    'Programming',
    'Security',
    'Python',
    'JavaScript',
    'Ruby',
    'PowerShell',
    'Statistics',
    'SQL',
  ],
});

// Date statice pentru galeria de imagini
const images = ref([
  { src: media40, w: 600, h: 400, thumbnail: media40, alt: 'alt' },
  { src: media41, w: 600, h: 400, thumbnail: media41, alt: 'alt' },
  { src: media42, w: 600, h: 400, thumbnail: media42, alt: 'alt' },
  { src: media43, w: 600, h: 400, thumbnail: media43, alt: 'alt' },
  { src: media44, w: 600, h: 400, thumbnail: media44, alt: 'alt' },
  { src: media45, w: 600, h: 400, thumbnail: media45, alt: 'alt' },
  { src: media46, w: 600, h: 400, thumbnail: media46, alt: 'alt' },
  { src: media60, w: 600, h: 400, thumbnail: media60, alt: 'alt' },
  { src: media26, w: 600, h: 400, thumbnail: media26, alt: 'alt' },
  { src: media32, w: 600, h: 400, thumbnail: media32, alt: 'alt' },
  { src: media30, w: 600, h: 400, thumbnail: media30, alt: 'alt' },
  { src: media31, w: 600, h: 400, thumbnail: media31, alt: 'alt' },
]);

// Date statice pentru membrii echipei
const profileTeam = ref([
  { id: 1, name: 'Samantha May', email: 'samanthamay2912@gmail.com', role: 'Team Member', imgSrc: face2, color: 'info' },
  { id: 2, name: 'Andrew Garfield', email: 'andrewgarfield98@gmail.com', role: 'Team Lead', imgSrc: face15, color: 'success' },
  { id: 3, name: 'Jessica Cashew', email: 'jessicacashew143@gmail.com', role: 'Team Member', imgSrc: face13, color: 'info' },
  { id: 4, name: 'Simon Cowan', email: 'jessicacashew143@gmail.com', role: 'Team Manager', imgSrc: face11, color: 'warning' },
  { id: 5, name: 'Amanda Nunes', email: 'amandanunes45@gmail.com', role: 'Team Member', imgSrc: face7, color: 'info' },
  { id: 6, name: 'Mahira Hose', email: 'mahirahose9456@gmail.com', role: 'Team Member', imgSrc: face12, color: 'info' },
]);

// Date statice pentru postări recente
const recentPosts = ref([
  { id: 1, img: media39, size: 'md', title: 'Animals', description: 'There are many variations of passages of Lorem Ipsum available' },
  { id: 2, img: media56, size: 'md', title: 'Travel', description: 'Latin words, combined with a handful of model sentence' },
  { id: 3, img: media54, size: 'md', title: 'Interior', description: 'Contrary to popular belief, Lorem Ipsum is not simply random' },
  { id: 4, img: media64, size: 'md', title: 'Nature', description: 'It was popularised in the 1960s with the release of Letraset sheets containing' },
]);

// Date statice pentru activități
const activitys = ref([
  {
    id: 1,
    avatar: 'E',
    img: '',
    avatarColor: 'primary',
    description: `<p class='mb-2'><b>You</b> Commented on <b>alexander taylor</b> post <a class='text-secondary' href='javascript:void(0);'><u>#beautiful day</u></a>.<span class='float-end fs-11 text-muted'>24,Dec 2022 - 14:34</span></p>`,
    media: [
      { img: media17, name: media17 },
      { img: media18, name: media18 },
    ],
    avatarList: [],
  },
  // ... alte activități (păstrează-le ca în codul original)
]);

// Date statice pentru postări
const posts = ref([
  {
    id: 1,
    avatar: '',
    img: face2,
    username: 'sonya taylor',
    date: '24, Dec - 04:32PM',
    message: `<p class='fs-12 text-muted mb-0'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p><p class='fs-12 text-muted mb-3'>As opposed to using 'Content here &#128076;</p>`,
    media: [],
    type: 'Fashion',
    typeBg: 'primary',
    avatarList: [],
  },
  // ... alte postări (păstrează-le ca în codul original)
]);

// Date dinamice din API
const profile = ref(null);
const error = ref<string | null>(null);

// Încărcare profil din API
onMounted(async () => {
  try {
    const response = await userAPI.getProfile();
    profile.value = response.data;
    // Dacă API-ul returnează doar name, despărțim în firstName și lastName
    if (response.data.name && !response.data.firstName && !response.data.lastName) {
      const [firstName, ...lastNameParts] = response.data.name.split(' ');
      profile.value = {
        ...response.data,
        firstName,
        lastName: lastNameParts.join(' '),
      };
    }
  } catch (err) {
    error.value = 'Nu s-a putut încărca profilul';
    console.error(err);
  }

  // Inițializare PhotoSwipeLightbox
  const lightbox = new PhotoSwipeLightbox({
    gallery: '#RandomUniqueId',
    children: 'a',
    pswpModule: () => import('photoswipe'),
    bgOpacity: 0.8,
    wheelToZoom: true,
    zoomTitle: 'Zoom',
  });
  lightbox.init();

  // Curățare la demontare
  onUnmounted(() => {
    lightbox.destroy();
  });
});

// Date pentru PageHeader
const dataToPass = ref({
  current: 'Profile',
  list: ['Pages', 'Profile'],
});
</script>

<template>
  <div v-if="profile">
    <h2>{{ profile.firstName }} {{ profile.lastName }}</h2>
    <p>Email: {{ profile.email }}</p>
    <p>Rol: {{ profile.role }}</p>
    <p>Telefon: {{ profile.phone }}</p>
    <p>Gen: {{ profile.gender }}</p>
    <p>Adresă: {{ profile.address }}</p>
    <p>Vârstă: {{ profile.age }}</p>
  </div>
  <div v-else-if="error">{{ error }}</div>
  <div v-else>Se încarcă...</div>
</template>

