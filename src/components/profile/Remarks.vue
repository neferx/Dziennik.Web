<template>
    <div class="list">
        <ul id="example">
            <li v-for="(record, index) of displayedRecords" :key="index">
                <div class="dymek">
                    <p id="body">{{ record.remark }}</p>
                    <p id="header">
                        {{
                            '~' +
                            record.teachername +
                            ' ' +
                            record.teacherlastname
                        }}
                    </p>
                </div>
            </li>
        </ul>
    </div>
    <Paginator v-model:first="first" :rows="rows" :totalRecords="totalRecords">
    </Paginator>
</template>
<script>
import Paginator from 'primevue/paginator'

export default {
    components: {
        Paginator,
    },
    data() {
        return {
            user: [],
            remarks: [],
            first: 0,
            rows: 3, //ile wpisów na stronę
            totalRecords: 0,
        }
    },
    async mounted() {
        this.user = JSON.parse(localStorage.getItem('user'))
        await this.getRemarks()
    },
    computed: {
        displayedRecords() {
            const startIndex = 1 * this.first
            const endIndex = startIndex + this.rows
            return this.remarks.slice(startIndex, endIndex)
        },
    },
    methods: {
        cons() {
            console.log(this.first)
        },
        async getRemarks() {
            await fetch(
                `http://localhost:3000/v1/getAllRemarksByStudentID/` +
                    this.user.id,
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
                    if (Response.remarkList == null) {
                        console.log('There are not remarks?')
                    } else {
                        this.remarks = Response.remarkList
                        this.totalRecords = this.remarks.length
                        console.log('Loaded remarks')
                        console.log(this.remarks)
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
.dymek {
    width: 100%;
    height: 120px;
    color: var(--text-color-1);
    background: white;
    border: 2px solid var(--warning-color);
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;
    border-top-left-radius: 5px;
    border-bottom-right-radius: 20px;
    display: flex;
    flex-direction: column;
}
#example {
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: white;
    padding: 10px;
}
#header {
    color: var(--text-color-1);
    text-align: right;
    padding-right: 20px;
}
#body {
    padding-top: 10px;
    color: var(--warning-color);
    //color: white;
}

.p-paginator {
    background-color: #fafafa;
}
</style>
