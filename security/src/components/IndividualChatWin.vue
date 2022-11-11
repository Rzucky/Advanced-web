<template>
    <div class="col-md-8">
        <div class="chat-open-container">
            <div class="chat-header">
                <img src="../assets/images/avatar-01.png" class="avatar-img">
                <div class="name-mail">
                    <h3>{{ chat.nameLastName }}</h3>
                    <h4>{{ chat.email }}</h4>
                </div>
            </div>
            <div class="top">
                <div class="chat-active-inside">
                    <!--eslint-disable-next-line vue/no-v-for-template-key -->
                    <template v-for="(msg, msgIndex) of chat.messages" :key="msgIndex">
                        <ChatMsgWin :msg="msg" />
                    </template>
                </div>

                <div class="bottom">
                    <div class="chat-input">
                        <form>
                            <input placeholder="Upišite svoju poruku..." v-model="message" />
                            <button class="button-send" ><img src="../assets/images/icon-send.svg"></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ChatMsgWin from '@/components/ChatMsgWin.vue';

export default {
    name: 'IndividualChatWin',
    // Mixins ???
    props: {
        chat: {
            type: Object,
            default()
            {
                return {
                    chatId: 0,
                    nameLastName: '',
                    email: '',
                    messages: ['Msg error'],
                    time: '-1',
                };
            },
        },
    },
    data()
    {
        return {
            message: '',
        };
    },
    components: {
        ChatMsgWin,
    },
};
</script>
