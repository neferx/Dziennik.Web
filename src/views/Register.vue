<template>
    <div class="p-d-flex p-jc-center">
        <div class="card">
            <StageOne v-if="!stageDone" />
            <!-- stage 2a -->
            <StageTwoA v-if="stageDone && selectedRole == 'Student'" />
            <!-- stage 2b -->
            <StageTwoB
                v-if="
                    stageDone &&
                    (selectedRole == 'Teacher' || selectedRole == 'Parent')
                "
            />
        </div>
    </div>
</template>

<script>
import StageOne from '../components/register/stageOne'
import StageTwoA from '../components/register/stageTwoA'
import StageTwoB from '../components/register/stageTwoB'

export default {
    name: 'Register',
    data() {
        return {}
    },

    components: {
        StageOne,
        StageTwoA,
        StageTwoB,
    },
    computed: {
        stageDone() {
            return this.$store.state.firstStageDone
        },
        selectedRole() {
            return this.$store.state.selectedRole
        },
    },
    methods: {},
}
</script>

<style lang="scss" scoped>
.card {
    width: 35%;
    min-width: 300px;
    height: 350px;
    margin: auto;

    form {
        margin-top: 2rem;
    }

    .p-field {
        margin-bottom: 1.5rem;
    }
}

.icon {
    width: 16px;
    height: 16px;
    fill: #6c757d;
}

.btn {
    margin-left: 7px;
    margin-right: 7px;
}
</style>
