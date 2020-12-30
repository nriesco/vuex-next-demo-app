<template>
  <button @click="createNew">Create new</button>

  Existing:

  <table>
    <tr v-for="item in items" v-bind:key="item">
      <td @click="edit(item._id)"><button>Edit this item</button></td>
      <td>{{ item.text }}</td>
      <td>{{ item.createdAt }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Container',
  props: {
    msg: String
  },
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
    edit (id) {
      this.$router.push({ path: '/demo/' + id })
    },
    async createNew () {
      console.log('>>> this is new')
      const res = await this.$store.dispatch('demo/create', { text: 'hi there' })
      return res
    },
    async loadItems () {
      try {
        this.loading = true
        const query = {}
        const result = await this.$store.dispatch('demo/find', { query })
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
