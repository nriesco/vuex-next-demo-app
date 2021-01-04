<template>
  <div v-for="d in data" v-bind:key="d._id">- {{d.address}} / {{d.number}}</div>
</template>

<script>
export default {
  name: 'EditorDetails',
  props: ['data'],
  data () {
    return {
      items: [],
      loading: false
    }
  },
  mounted () {
    this.loadItems()
  },
  methods: {
    async saveItem (instance) {
      await this.$store.dispatch('demo/patch', [instance._id, instance])
      this.$router.push({ path: '/' })
    },
    async loadItems () {
      try {
        this.loading = true
        // const query = {}
        // const result = await this.$store.dispatch('demo/find', { query })
        const result = await this.$store.dispatch('demo/find', { query: { _id: this.$route.params.id } })
        if (result.data && result.data.length && Array.isArray(result.data)) {
          this.items = result.data
        } else {
          this.items = []
        }
        this.loading = false
      } catch (e) {
        console.log('>>> error 1', e)
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
