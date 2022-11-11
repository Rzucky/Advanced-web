<template>
    <div v-if="msg.admin">
        <div class="message-right">
            <div class="message-time">
                <div class="message">
                    <p>{{ msg.msg }}</p>
                </div>
                <p class="time">{{ msg.timestamp }}</p>
            </div>
            <img src="../assets/images/avatar-05.png" class="avatar-img">
        </div>
    </div>
    <div v-else>
        <div class="message-left">
            <img src="../assets/images/avatar-01.png" class="avatar-img">
            <div class="message-time">
                <div class="message">
                    <p>{{ msg.msg }}</p>
                </div>
                <p class="time">{{ msg.timestamp }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ChatMsgWin',
    props: {
        msg: {
            type: Object,
            default()
            {
                return { msg: 'Msg error', timestamp: '-1' };
            },
        },
    }
};
</script>
