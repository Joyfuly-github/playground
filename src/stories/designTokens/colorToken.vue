<template>
	<div>
		{{ groupTokens }}
		<ul class="grid-layout">
			<li v-for="(name, value) in tokens" :key="name">
				<p>{{ name }}</p>
				<p>{{ value }}</p>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { flattenTokens } from '@/assets/build/flattenToToken';
import color from '@/assets/tokens/color.json'

const tokens = flattenTokens(color)
const groupTokens = groupColorTokens(tokens);

function groupColorTokens(tokens: Record<string,string>) {

  const groups: Record<string, Record<string,string>> = {}

  Object.entries(tokens).forEach(([name,value]) => {

    const key = name.replace('--color-','')
    const parts = key.split('-')

    let groupName = parts[0]

    if(parts.length === 1){
      groupName = 'basic'
    }

    if(!groups[groupName]){
      groups[groupName] = {}
    }

    groups[groupName][name] = value

  })

  return groups
}
</script>

<style lang="scss" scoped>
.grid-layout {
	display: grid;
	grid-template-columns: 3fr auto;
}
</style>