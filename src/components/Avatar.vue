<template>
    <div class="avatar">
        <img class="avatar-image" src="../assets/avatar.png" />
        <p class="avatar-fullname">
            {{ name + ' ' + lastname }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'avatar',
    props: ['name', 'lastname'],
}
</script>

<style lang="scss" scoped>
.avatar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &-image {
        width: 200px;
        height: 200px;
        border-radius: 100px;
        object-fit: cover;
        object-position: top;
    }
    &-fullname {
        font-size: 25px;
        font-weight: bold;
        color: var(--text-color-1);
    }
}
</style>
