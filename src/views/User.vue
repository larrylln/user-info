<template>
  <div class="container mt-7 v-cloak">
    <div class="row">
      <div class="col-12 text-center">
        <h2>{{ title }}</h2>
      </div>
      <div class="col-12 pb-4">
            <input type="text" v-model="search" placeholder="search user"/>
      </div>
      <div class="col-12">
        <table class="table table-hover">
          <thead>
            <th>Photo</th>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr v-for="(user, index) in filteredUsers" :key="index">
              <td>
                <img class="avatar" :src="user.avatar" />
              </td>
              <td>{{ user.id }}</td>
              <td>{{ user.first_name }}</td>
              <td>{{ user.last_name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button style="margin-right: 20px" @click="showModal">
                  Edit
                </button>
                <button @click="deleteUser(user)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <Modal 
          v-show="isModalVisible"
          @click="closeModal"
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
      search:'',
      isModalVisible: false,
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    getUsers() {
      RestAPI.getAllUsers()
        .then((res) => {
          console.log(res.data);
          this.users = res.data.data;
        })
        .catch((err) => {
          console.log("ERROR:", err);
        });
    },
    updateUser(seletedUser) {
      console.log(seletedUser);
      // const params = {

      // };
      // RestAPI.UpdateUser(seletedUser.id, params)
      // .then(res => {
      //     console.log(res.data);
      // })
      // .catch(err=> {
      //     console.log('UPDATE ERROR: ', err);
      // });
    },
    deleteUser(seletedUser) {
      console.log(seletedUser);
      // RestAPI.DeleteUser(seletedUser.id)
      // .then(res => {
      //     console.log(res.data);
      // })
      // .catch(err=> {
      //     console.log('DELETE ERROR: ', err);
      // });
    },
    showModal() {
        this.isModalVisible = true;
      },
      closeModal() {
        this.isModalVisible = false;
      }
  },
  computed: {
    filteredUsers(){
      return this.users.filter((user) => {
        return user.first_name.match(this.search);
      });
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
</style>
