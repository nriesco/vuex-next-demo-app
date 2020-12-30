<template>
  <h4>Editor</h4>

  <div v-if="loading">loading ...</div>
  <table class="table table-darkQQQ table-striped table-primary">
    <tr v-for="item in items" v-bind:key="item">
      <td @click="saveItem(item)"><button class="btn btn-primary">Save changes</button></td>
      <td class=""><input class="form-control" v-model="item.text"></td>
      <td>{{ item.createdAt }}</td>
    </tr>
  </table>
</template>

<script>
export default {
  name: 'Editor',
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
    async saveItem (instance) {
      // await this.$store.dispatch('demo/patch', [instance._id, instance])

      // this won't work, save is not a function
      instance.save()
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
