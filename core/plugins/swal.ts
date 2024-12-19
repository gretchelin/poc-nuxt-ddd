import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
};

const $swal = {
  install: (Vue, options) => {
    Vue.provide('$swal', Swal.mixin(options));
  },
};
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use($swal, options);
});
