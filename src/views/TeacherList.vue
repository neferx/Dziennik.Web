<template>
  <el-container>
    <h1>Lista nauczycieli:</h1>
    </el-container>
    <!-- {{ teacherList.teacherList }} -->

     <el-table id="table"
    :data="teacherList.teacherList"
    stripe
    style="width: 50%">
    <el-table-column
      prop="name"
      label="Name"
      >
    </el-table-column>
    <el-table-column
      prop="lastname"
      label="Last name"
      >
    </el-table-column>
    <el-table-column
      prop="subjects"
      label="Subject"
      >
    </el-table-column>
    <el-table-column
      prop="telephoneNumber"
      label="Telephone number">
    </el-table-column>
    <el-table-column
      prop="email"
      label="Email">
    </el-table-column>
  </el-table>
</template>

<script>
//import { ref, computed } from "vue";

export default {
    data() {
        return {
            teacherList: [],
            
        }
    },
    methods: {
        getAllTeachers() {
            fetch(`http://localhost:3000/v1/getAllTeachersWithAssignedSubject`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(),
            })
                .then((Response) => {
                    if (Response.status == 400) {
                        throw new Error('Invalid credentials')
                    }
                    return Response.json()
                })
                .then((Response) => {
                    this.teacherList = Response
                    console.log(this.teacherList.teacherList)
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    // this.$router.push({ path: "/" });
                })
        },
    },
    mounted() {
        this.getAllTeachers()
    },
}
</script>

<style lang="scss" scoped>
h1{
  margin:auto;
}
#table{
  margin:auto;
}
</style>