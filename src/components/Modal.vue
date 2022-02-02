<template>
  <div v-if="isModalVisible">
    <transition name="model">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h4 class="modal-title">Update User</h4>
                            <button type="button" class="close" @click="close"><span aria-hidden="true">&times;</span></button>
                            
                        </div>
                        <div class="modal-body">
                            <div v-if="previewImage">
                                <div>
                                    <img class="preview my-3" :src="previewImage" alt="" />
                                </div>
                            </div>
                            <div class="col-8">
                                <label class="btn btn-default p-0">
                                    <input
                                            type="file"
                                            accept="image/*"
                                            ref="file"
                                            @change="selectImage"
                                    />
                                </label>
                            </div>
                            <div class="form-group id">
                                <label>ID</label>
                                <input type="text" class="form-control" v-model="ID" />
                            </div>
                            <div class="form-group fname">
                                <label>First Name</label>
                                <input type="text" class="form-control" v-model="First_name" />
                            </div>
                            <div class="form-group lname">
                                <label>Last Name</label>
                                <input type="text" class="form-control" v-model="Last_name" />
                            </div>
                            <div class="form-group email">
                                <label>Email</label>
                                <input type="text" class="form-control" v-model="Last_name" />
                            </div>
                            <div class="btn-update">
                                <button type="button" class="update" @click="Update" ><span>Update</span></button>
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
  export default {
    name: 'Modal',
    data() {
        return {
            isModalVisible: true
        }
    },
    methods: {
      close() {
        this.$emit('close');
      },
    },
  };
</script>


<style>
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
  .close {
      border-color: azure;
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
      float: right;
      
  }
  .update {
      background-color: green;
      border-radius: 5px;
      border-color: azure;
  }
  .close {
      background-color: red;
      color: aliceblue;
  }
  span {
      color: aliceblue;
  }
  * {
      font-family: 'Times New Roman', Times, serif;
  }
</style>
