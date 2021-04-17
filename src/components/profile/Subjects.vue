<template>
    <div>
        <Dialog
            class="dialog"
            position="center"
            header="Grades"
            v-model:visible="display"
            :style="{ width: '50vw' }"
        >
            <div>
                <h4>Teacher</h4>
                <h2>{{ teacherName + ' ' + teacherLastName }}</h2>
                <DataTable
                    :value="grades"
                    responsiveLayout="scroll"
                    :paginator="true"
                    :rows="5"
                    v-if="grades != 0"
                >
                    <Column field="gradeType" header="Type"></Column>
                    <Column field="grade" header="Grade"></Column>
                    <Column field="weight" header="Weight"></Column>
                </DataTable>
                <h1 v-else>Brak ocen</h1>
            </div>
        </Dialog>
        <DataTable
            :value="subjects"
            :paginator="true"
            :rows="8"
            v-model:selection="selectedSubject"
            selectionMode="single"
            dataKey="subjectName"
            responsiveLayout="scroll"
            @rowSelect="displaySwitch"
        >
            <Column field="subjectName" style="text-align: center"> </Column>

            <template #empty> No customers found. </template>
        </DataTable>
    </div>
</template>

<script>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Dialog from 'primevue/dialog'

export default {
    components: {
        DataTable,
        Column,
        Dialog,
    },
    data() {
        return {
            teacherName: '',
            teacherLastName: '',
            subjects: [],
            grades: [],
            selectedSubject: null,
            display: false,
            user: [],
        }
    },
    mounted() {
        this.subjects = JSON.parse(localStorage.getItem('subjects'))
        this.user = JSON.parse(localStorage.getItem('user'))
        console.log(this.subjects)
    },

    computed: {},
    methods: {
        displaySwitch() {
            if (this.display == false) {
                this.teacherName = ''
                this.teacherLastName = ''
                this.getGrades()
                this.display = true
                console.log(this.selectedSubject)
            } else {
                this.display = false
            }
        },
        getGrades() {
            this.grades = null
            fetch(
                `http://localhost:3000/v1/getAllStudentSubjectGrades/` +
                    this.user.id +
                    '/' +
                    this.selectedSubject.subjectID,
                {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                }
            )
                .then((Response) => {
                    if (Response.status == 401) {
                        throw new Error('Invalid credentials')
                    } else if (Response.status == 400) {
                        throw new Error('Invalid data')
                    }
                    return Response.json()
                })
                .then((Response) => {
                    if (Response.gradesList == null) {
                        console.log('Those are not grades?')
                    } else {
                        this.grades = Response.gradesList
                        this.teacherName = this.grades[0].teacherName
                        this.teacherLastName = this.grades[0].teacherLastName
                        console.log('Loaded grades')
                        console.log(this.grades)
                    }

                    return Response
                })
                .catch((error) => {
                    this.errorMessage = error.message
                    console.log(this.errorMessage)
                })
        },
    },
}
</script>

<style lang="scss" scoped>
#wrapper {
    height: 300px;
}
::v-deep(.p-datatable .p-datatable-tbody tr) {
    background-color: #fafafa;
    align-items: center;
}

::v-deep(.p-datatable .p-datatable-thead > tr > th) {
    padding: 0px;
}
::v-deep(.p-datatable .p-datatable-tbody > tr > td) {
    height: 60px;
}

::v-deep(.p-paginator) {
    background-color: #fafafa;
}

::v-deep(.p-dialog .p-dialog-header) {
    background: red;
    border-radius: 30px;
}

.field {
    height: 75px;
    padding-top: 30px;
}
</style>
