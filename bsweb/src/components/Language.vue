<template>
  <div>
    <button class="btn-lang center" @click="changeLanguage()">   
      <span>{{ btn }}</span>
    </button>
  </div>
</template>

<script>
import { i18n } from '../main.js';

export default {
  data() {
    return {
      pt: true,
      btn: 'en',
    };
      
  },
  methods: {
    changeLanguage() {
      if(this.pt) {
        i18n.locale = 'en';
        this.btn = 'pt-br';
      } else {
        i18n.locale = 'pt-br';
        this.btn = 'en';
      }
      this.pt = !this.pt;
      localStorage.pt_br = this.pt;
    },
  },  
};
</script>

<style>
  .dropdown.is-mobile-modal > .dropdown-menu {
    z-index: 500 !important;
  }

  .dropdown-menu {
    z-index: 500 !important;
  }

  .btn-lang {
    height: 20px;
    cursor: pointer;
    background-color: #fff;
    font-size: 10px;
    border: 1px solid #167df0;
    color: #167df0;
    border-radius: 12px;
  }
  .btn-lang:hover {
    background-color: #eee;
  }
  .btn-lang:active {
    border-color: red;
  }
</style>