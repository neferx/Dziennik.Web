<template>
    <Button label="Primary" class="p-button-raised p-button-rounded"
        >Test</Button
    >
    <DataTable
        id="table"
        :value="teacherList.teacherList"
        v-model:selection="selectedTeacher1"
        selectionMode="single"
        dataKey="idTeacher"
        responsiveLayout="scroll"
    >
        <Column field="name" header="Name"></Column>
        <Column field="lastname" header="Last name"></Column>
        <Column field="subjects" header="Subjects"></Column>
        <Column field="email" header="Email address"></Column>
        <Column field="telephoneNumber" header="Telephone number"></Column>
    </DataTable>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Button from 'primevue/button'

export default {
    components: {
        DataTable,
        Column,
        Button,
    },
    data() {
        return {
            teacherList: [],
            selectedTeacher1: null,
        }
    },
    methods: {
        getAllTeachers() {
            fetch(
                `http://localhost:3000/v1/getAllTeachersWithAssignedSubject`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(),
                }
            )
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
h1 {
    margin: auto;
}
#table {
    margin: auto;
    width: 50%;
}
</style>
