<template>
  <h4>Elements</h4>
  <button @click="createNew" class="btn btn-success">Create new</button>
  <br>
  <br>
  <table class="table table-darkQQQ table-striped table-primary">
    <tr v-for="item in items" v-bind:key="item">
      <td @click="edit(item._id)"><button class="btn btn-primary">Edit this item</button></td>
      <td class="">{{ item.text }}</td>
      <td>{{ item.createdAt }}</td>
      <td @click="deleteItem(item)"><button class="btn btn-danger">DELETE THIS ITEM</button></td>
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
    async deleteItem (instance) {
      if (confirm('Are you sure you want to delete me?')) {
        await this.$store.dispatch('demo/remove', instance._id)
        this.loadItems()
      }
    },
    edit (id) {
      this.$router.push({ path: '/demo/' + id })
    },
    async createNew () {
      console.log('>>> this is new')
      await this.$store.dispatch('demo/create', { text: 'Hello World!' })
      this.loadItems()
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
