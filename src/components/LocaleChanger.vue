<template>
  <div class="language-switcher">
    <div
      class="flag-container"
      v-for="lang in languages"
      :key="lang.locale"
      @click="changeLanguage(lang.locale)"
      :class="{ active: currentLocale === lang.locale }"
    >
      <img
        :src="`/assets/flags/${lang.locale}.png`"
        :alt="`${lang.name}`"
        class="flag-icon"
      />
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
  name: "LanguageSwitcher",
  data() {
    return {
      languages: [
        { locale: "en", name: "English" },
        { locale: "ru", name: "Russian" },
      ],
    };
  },

  setup() {
    const { locale } = useI18n({ useScope: "global" });

    return {
      currentLocale: locale,
    };
  },

  methods: {
    changeLanguage(newLocale) {
      localStorage.setItem("lang", newLocale);
      location.reload();
    },
  },
};
</script>

<style scoped>
.flag-container {
  cursor: pointer;
  width: 32px; /* Регулируйте размер флага по вашему усмотрению */
  height: 32px;
  margin: 0 6px;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.2;
}

.flag-container.active {
  opacity: 1;
}

.flag-icon {
  width: 100%;
  height: 100%;
}
</style>
