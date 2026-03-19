<template>
  <div class="w-full">
    <template v-for="(group, title) in groupTokens" :key="title">
      <h3 class="mb-8" :class="{ 'mt-48': title !== 'basic' }">{{ title }}</h3>

      <ul class="list-preview">
        <li v-for="(value, name) in group" :key="name">
          <div class="box" :class="`bg-${name.replace('--color-', '')}`"></div>

          <div class="info">
            <p class="h5 mb-0">
              {{ name }}
            </p>
            <p class="color-secondary-900">{{ value }}</p>
          </div>

          <div class="code">
            <p class="small">
              <button>
                bg-{{ name }}
                <Icon :type="'Copy'" />
              </button>
            </p>
            <p class="small">
              <button>
                text-{{ name }}
                <Icon :type="'Copy'" />
              </button>
            </p>
            <p class="small">
              <button>
                border-{{ name }}
                <Icon :type="'Copy'" />
              </button>
            </p>
          </div>
        </li>
      </ul>
    </template>
  </div>
</template>

<script setup lang="ts">
import { flattenTokens } from '@/assets/build/flattenToToken'
import color from '@/assets/tokens/color.json'
import Icon from '@/components/Icon.vue'

const tokens = flattenTokens(color)
const groupTokens = titleTokens(tokens)

function titleTokens(tokens: Record<string, string>) {
  const groups: Record<string, Record<string, string>> = {}

  Object.entries(tokens).forEach(([name, value]) => {
    const shortName = name.replace('--color-', '')
    const parts = shortName.split('-')
    const groupName = parts.length === 1 ? 'basic' : (parts[0] ?? 'basic')

    const group = groups[groupName] ?? (groups[groupName] = {})
    group[shortName] = value
  })

  return groups
}
</script>

<style lang="scss" scoped>
h3 {
  text-transform: capitalize;
}

.list-preview {
  display: flex;
  align-items: center;
  gap: var(--spacing-16);

  > li {
    padding: var(--spacing-16);
    display: flex;
    border: 1px solid var(--color-secondary-500);
    border-radius: var(--radius-normal);
    overflow: hidden;
    align-items: center;
    gap: var(--spacing-16);
    flex-basis: 30%;

    .box {
      width: 6rem;
      height: 6rem;
      border: 1px solid var(--color-secondary-900);
      border-radius: var(--radius-normal);
    }

    .info {
      margin-right: auto;
    }

    .code {
      text-align: right;
      > *:not(:first-child) {
        margin-top: var(--spacing-4);
      }
    }
  }
}
</style>
