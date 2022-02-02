<template>
  <div>
    <transition name="model">
      <div class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h4 class="modal-title">Update Your Information</h4>
              </div>
              <div class="modal-body">
                <div v-if="avatar">
                  <div>
                    <img :src="m_avatar" alt="" class="preview my-3"/>
                  </div>
                </div>
                <fa v-else class="fa-6x" icon="image"/>
                <div class="form-group id">
                  <label>ID</label>
                  <input v-model="m_id" class="form-control" readonly type="text"/>
                </div>
                <div class="form-group fname">
                  <label>First Name</label>
                  <input v-model="m_firstname" class="form-control" type="text"/>
                </div>
                <div class="form-group lname">
                  <label>Last Name</label>
                  <input v-model="m_lastname" class="form-control" type="text"/>
                </div>
                <div class="form-group email">
                  <label>Email</label>
                  <input v-model="m_email" class="form-control" type="text"/>
                </div>
                <div class="btn-update">
                  <button class="cancel" type="button" @click="close"><span><fa class="fa-1x"
                                                                                icon="times"/> Cancel</span></button>
                  <button class="update" type="button" @click="saveInfo"><span><fa class="fa-1x"
                                                                                   icon="save"/> Save</span></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import RestAPI from "../plugins/RestAPI";

export default {
  name: 'Modal',
  data() {
    return {
      m_id: null,
      m_firstname: null,
      m_lastname: null,
      m_email: null,
      m_avatar: null
    }
  },
  props: {
    id: Number,
    firstname: String,
    lastname: String,
    email: String,
    avatar: String
  },
  mounted() {
    this.m_id = this.id;
    this.m_firstname = this.firstname;
    this.m_lastname = this.lastname;
    this.m_email = this.email;
    this.m_avatar = this.avatar;
  },
  methods: {
    close() {
      this.$emit('close');
    },
    saveInfo() {
      console.log('test')
      if (!this.m_id) {
        this.$swal({
          title: "Warning",
          text: "Your User ID is required",
          icon: "warning",
          timer: 3000
        });
        return;
      }
      if (!this.firstname) {
        this.$swal({
          title: "Warning",
          text: "Your First Name is required",
          icon: "warning",
          timer: 3000
        });
        return;
      }
      if (!this.lastname) {
        this.$swal({
          title: "Warning",
          text: "Your Last Name is required",
          icon: "warning",
          timer: 3000
        });
        return;
      }
      if (!this.email) {
        this.$swal({
          title: "Warning",
          text: "Your Email is required",
          icon: "warning",
          timer: 3000
        });
        return;
      }

      const params = {
        first_name: this.m_firstname,
        last_name: this.m_lastname,
        email: this.m_email
      }

      const loader = this.$loading.show();
      RestAPI.UpdateUser(this.m_id, params)
          .then(res => {
            loader.hide();
            console.log(res.data);
            this.$swal({
              title: "UPDATE INFORMATION OF USER ID: " + this.m_id + " Successfully.",
              icon: 'success',
              timer: 3000
            });
            this.close();
          })
          .catch(err => {
            loader.hide();
            console.log("UPDATE ERROR: ", err);
            this.$swal({
              title: "Update Error",
              text: "Failed To save your changes, please try again",
              icon: "error"
            });
          });
    }
  },
};
</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-header {
  display: flex;
  justify-content: center;
  justify-items: center;
  align-self: center;
}

.modal-title {
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
}

label {
  float: left;
  padding: 4px;
}

.id {
  margin-top: 40px;
}

.btn-update {
  margin-top: 10px;
  align-self: center;

}


.cancel {
  font-weight: bold;
  width: 7vw;
  background-color: #f00428;
  padding: 8px;
  border-radius: 2px;
  border-color: azure;
  margin: 10px;
}

.cancel:hover {
  background-color: #b10520;
}

.update {
  font-weight: bold;
  width: 7vw;
  background-color: #18b751;
  padding: 8px;
  border-radius: 5px;
  border-color: azure;
  margin: 10px;
}

.update:hover {
  background-color: #058633;
}

span {
  color: aliceblue;
}

* {
  font-family: 'Times New Roman', Times, serif;
}

img {
  border-radius: 10%;
}

</style>
