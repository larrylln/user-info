<template>
  <div class="container mt-7 v-cloak">
    <div class="row">
      <div class="col-12 text-center">
        <h2>{{ title }}</h2>
      </div>
      <div class="col-12 pb-4">
        <input v-model="search" placeholder="search user" type="text"/>
      </div>
      <div class="col-12">
        <table class="table table-hover">
          <thead>
          <tr>
            <th>Profile</th>
            <th @click="sortData('id')">ID</th>
            <th @click="sortData('first_name')">First Name</th>
            <th @click="sortData('last_name')">Last Name</th>
            <th @click="sortData('email')">Email</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(user, index) in sortedUsers" :key="index">
            <td>
              <img :src="user.avatar" class="avatar"/>
            </td>
            <td>{{ user.id }}</td>
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button style="margin-right: 20px" @click="updateUser(user)">
                Edit
              </button>
              <button @click="deleteUser(user)">Delete</button>
            </td>
          </tr>
          </tbody>
        </table>
        <Modal
            v-if="isModalVisible"
            :id="selectedUser.id"
            :avatar="selectedUser.avatar"
            :email="selectedUser.email"
            :firstname="selectedUser.first_name"
            :lastname="selectedUser.last_name"
            @close="close"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RestAPI from "@/plugins/RestAPI";
import Modal from '../components/Modal.vue';

export default {
  name: "User",
  components: {
    Modal
  },
  data() {
    return {
      title: "User Information",
      users: [],
      search: '',
      isModalVisible: false,
      selectedUser: null,
      currentSortKey: 'id',
      currentSortDirection: 'asc'
    };
  },
  computed: {
    sortedUsers() {
      if (this.search !== '') {
        return this.users.filter((user) => {
          return (user.first_name).toLowerCase().match(this.search.toLowerCase()) || (user.last_name).toLowerCase().match(this.search.toLowerCase()) || (user.email).toLowerCase().match(this.search.toLowerCase());
        });
      } else {
        return this.users.slice().sort((a, b) => {
          let modifier = 1;
          if (this.currentSortDirection === 'desc') modifier = -1;
          if (a[this.currentSortKey] < b[this.currentSortKey]) return -1 * modifier;
          if (a[this.currentSortKey] > b[this.currentSortKey]) return modifier;
          return 0;
        });
      }
    },
  },
  // computed: {
  //   sortedUsers() {
  //     console.log('test')
  //     return this.users.sort((a,b) => {
  //       let modifier = 1;
  //       if(this.currentSortDirection === 'desc') modifier = -1;
  //       if(a[this.currentSortKey] < b[this.currentSortKey]) return -1 * modifier;
  //       if(a[this.currentSortKey] > b[this.currentSortKey]) return 1 * modifier;
  //       return 0;
  //     });
  //   }
  // },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      const loader = this.$loading.show();
      RestAPI.getAllUsers()
          .then((res) => {
            loader.hide();
            console.log(res.data);
            this.users = res.data.data;
          })
          .catch((err) => {
            loader.hide();
            console.log("ERROR:", err);
            this.$swal({
              title: "Error",
              text: "Unable to get users, please try once again",
              icon: "error"
            });
          });
    },
    updateUser(userData) {
      if (!userData) {
        this.$swal({
          title: 'Warning',
          text: 'Selected User is required',
          icon: 'warning'
        });
        return;
      }

      this.selectedUser = Object.assign({}, userData);
      this.isModalVisible = true;
    },
    deleteUser(userDt) {
      if (!userDt) {
        this.$swal({
          title: 'Warning',
          text: 'Selected User is required',
          icon: 'warning'
        });
        return;
      }
      if (!userDt.id) {
        this.$swal({
          title: 'Warning',
          text: 'User ID is required',
          icon: 'warning'
        });
        return;
      }

      const loader = this.$loading.show();
      RestAPI.DeleteUser(userDt.id)
          .then(res => {
            loader.hide();
            console.log(res.data);
            this.$swal({
              title: "DELETED USER ID: " + userDt.id + " Successfully.",
              icon: 'success',
              timer: 4000
            });
            this.getUsers();
          })
          .catch(err => {
            loader.hide();
            console.log('DELETE ERROR: ', err);
            this.$swal({
              title: "Error",
              text: "Unable to delete the user, please try once again",
              icon: "error"
            });
          });
    },
    close() {
      this.isModalVisible = false;
      this.selectedUser = null;
    },
    sortData(searchKey) {
      if (searchKey === this.currentSortKey) {
        this.currentSortDirection = this.currentSortDirection === 'asc' ? 'desc' : 'asc';
      }
      this.currentSortKey = searchKey;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  margin: 0 0 40px;
  font-family: 'Times New Roman', Times, serif;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

tr > td.avatar {
  display: flex;
  width: 300px;
  height: auto;
}

input {
  width: 80%;
}

* {
  font-family: 'Times New Roman', Times, serif;
}

tr {
  width: 100%;
  text-align: center
}

tr:hover {
  background-color: #0df8ec;
}

td {
  text-align: center;
  padding: 25px;
}

img {
  width: 8vw;
  height: 12vh;
  border-radius: 10%;
  object-fit: cover;
}
</style>
