<!--
  alery → modal alert 으로 교체
-->
<template>
  <div class="w-full">
    <template v-for="(group, title) in groupTokens" :key="title">
      <h3 class="mb-8" :class="{ 'mt-48': title !== 'basic' }">{{ title }}</h3>

      <ul class="list-preview">
        <li v-for="(value, name) in group" :key="name">
          <div class="box" :class="`bg-${name}`"></div>

          <div class="info">
            <p class="font-h5 mb-0">
              {{ name }}
            </p>
            <p class="color-secondary-900">{{ value }}</p>
          </div>

          <div class="code">
            <p class="small">
              <Button variant="link" size="sm" class="font-normal" @click="copyText(`bg-${name}`)">
                bg-{{ name }}
                <Icon :type="'Copy'" />
              </Button>
            </p>
            <p class="small">
              <Button variant="link" size="sm" class="font-normal" @click="copyText(`text-${name}`)">
                text-{{ name }}
                <Icon :type="'Copy'" />
              </Button>
            </p>
            <p class="small">
              <Button variant="link" size="sm" class="font-normal" @click="copyText(`border-${name}`) ">
                border-{{ name }}
                <Icon :type="'Copy'" />
              </Button>
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


function copyText(text: string) {
  navigator.clipboard.writeText(text);
  alert(`Copied: ${text}`);
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
    flex-wrap:wrap;

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
      width:100%;
      > *:not(:first-child) {
        margin-top: var(--spacing-4);
      }
    }
  }
}
</style>
